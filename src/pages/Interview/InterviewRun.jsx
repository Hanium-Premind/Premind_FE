import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/sass/interviewrun.scss";

const InterviewRun = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState(15);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [report, setReport] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [subtitleOn, setSubtitleOn] = useState(true);
  const [answerTime, setAnswerTime] = useState(0);

  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });

  // ✅ 세션에서 첫 번째 질문 불러오기
  useEffect(() => {
    const saved = sessionStorage.getItem("interviewData");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("✅ 세션스토리지 interviewData:", parsed);

      setMeta({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
        total_question_num: parsed.total_question_num,
      });

      setQuestions([parsed.question]); // 첫 질문 저장
    }
  }, []);

  // ✅ 타이머 동작
  useEffect(() => {
    if (time > 0 && !report && !isFinished) {
      const timer = setTimeout(() => {
        setTime((t) => t - 1);
        setAnswerTime((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, report, isFinished]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ✅ 답변 제출 (form-data + 토큰)
  const handleSubmitAnswer = async () => {
    console.log("🟢 handleSubmitAnswer 실행됨");
    if (!meta.interview_record_id || !meta.job_id) {
      console.error("⚠️ meta 정보 없음:", meta);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      console.log("📌 token:", token);

      const formData = new FormData();
      formData.append("job_id", meta.job_id);
      formData.append(
        "file",
        new Blob([], { type: "video/webm" }),
        "answer.webm"
      ); // 🔥 추후 녹화 데이터 교체
      formData.append("answer_time", answerTime);

      console.log("📤 FormData 내용:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(
        `http://52.78.218.243:8080/interviews/practice/submit/${meta.interview_record_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ 서버 응답:", res.data);

      const result = res.data.data;

      // 🔥 short_feedback 리포트에 표시
      setReport({
        short_feedback: result.short_feedback,
      });

      // 🔥 다음 질문 저장
      if (result.next_question) {
        setQuestions((prev) => [...prev, result.next_question]);
      }

      if (result.finished) {
        setIsFinished(true);
      }
    } catch (err) {
      console.error("❌ 제출 실패:", err.response?.data || err.message);
    }
  };

  // ✅ 리포트 확인 후 다음 질문으로 이동
  const handleNextQuestion = () => {
    setReport(null); // 리포트 닫기
    setAnswerTime(0); // 진행시간 초기화
    setQuestionIndex((prev) => prev + 1);
    setTime(90);
  };

  return (
    <div className="interview-container">
      {report ? (
        <div className="report-section">
          <h2>📊 질문 {questionIndex + 1} 리포트</h2>
          <p>{report.short_feedback || "리포트가 생성되지 않았습니다."}</p>
          <div className="answer-time">답변 진행시간: {answerTime}초</div>
          <button className="next-btn" onClick={handleNextQuestion}>
            {questionIndex < meta.total_question_num - 1
              ? "다음 면접 진행하기"
              : "면접 종료"}
          </button>
        </div>
      ) : !isFinished ? (
        <>
          {/* 질문 */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">
                {String(questionIndex + 1).padStart(2, "0")}.
              </div>
              {subtitleOn && (
                <div className="question-text">
                  {questions[questionIndex] || "질문 불러오는 중..."}
                </div>
              )}
            </div>
            <button
              className="subtitle-btn"
              onClick={() => setSubtitleOn((prev) => !prev)}
            >
              {subtitleOn ? "자막 OFF" : "자막 ON"}
            </button>
          </div>

          {/* 답변 섹션 */}
          <div className="answer-section">
            <div className="timer">{formatTime(time)}</div>
            <div className="answer-info">
              15초 이후 또는 시간이 끝나면 답변을 마무리할 수 있습니다.
            </div>
          </div>

          {/* 답변 마무리 버튼 (15초 남았을 때만) */}
          {time <= 15 && (
            <div className="button-section">
              <button className="finish-btn" onClick={handleSubmitAnswer}>
                답변 마무리 하기
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="report-section">
          <h2>면접 종료</h2>
          <p>최종 리포트가 생성되었습니다.</p>
          <button onClick={() => navigate("/interviews/result")}>
            면접 결과 보러가기
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewRun;
