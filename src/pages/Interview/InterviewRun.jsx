import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/sass/interviewrun.scss";

const InterviewRun = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState(15);
  const [answerTime, setAnswerTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [report, setReport] = useState(null);        // 개별 질문 피드백
  const [finalReport, setFinalReport] = useState(null); // 최종 리포트
  const [isFinished, setIsFinished] = useState(false);
  const [subtitleOn, setSubtitleOn] = useState(true);

  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });

  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  // 🔥 MediaRecorder 세팅 함수
  const startRecording = (s) => {
    const recorder = new MediaRecorder(s, {
      mimeType: "video/webm;codecs=vp8,opus",
    });

    let localChunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        localChunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      setChunks(localChunks); // stop 시점에 저장
    };

    recorder.start();
    setMediaRecorder(recorder);
    setChunks([]); // 새 질문마다 초기화
    console.log("▶️ MediaRecorder 녹화 시작");
  };

  // ✅ 세션에서 첫 질문 불러오기
  useEffect(() => {
    const saved = sessionStorage.getItem("interviewData");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("✅ 세션 interviewData:", parsed);

      setMeta({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
        total_question_num: parsed.total_question_num,
      });

      setQuestions([parsed.question]);
    }
  }, []);

  // ✅ 카메라/마이크 시작
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((s) => {
        setStream(s);
        startRecording(s); // 첫 질문 시작 시 바로 녹화
      })
      .catch((err) => console.error("❌ 카메라/마이크 접근 실패:", err));

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ✅ 타이머
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

  // ✅ 답변 제출
  const handleSubmitAnswer = async () => {
    console.log("🟢 handleSubmitAnswer 실행됨");

    if (!meta.interview_record_id || !meta.job_id) {
      console.error("⚠️ meta 정보 없음:", meta);
      return;
    }

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }

    // stop 이벤트에서 chunks 세팅됨 → 약간 지연 필요
    setTimeout(async () => {
      if (chunks.length === 0) {
        console.error("⚠️ 녹화된 영상 없음");
        return;
      }

      const recordedBlob = new Blob(chunks, { type: "video/webm" });
      console.log("🎥 Blob 크기:", recordedBlob.size);

      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken:", accessToken);

        const formData = new FormData();
        formData.append("job_id", String(meta.job_id));
        formData.append("file", recordedBlob, "answer.webm");
        formData.append("answer_time", String(answerTime));

        console.log("📤 FormData:", [...formData.entries()]);

        const res = await axios.post(
          `http://52.78.218.243:8080/interviews/practice/submit/${meta.interview_record_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("✅ 서버 응답:", res.data);
        const result = res.data.data;

        if (result.finished) {
          // ✅ 마지막 질문 → 종합 리포트 표시
          setIsFinished(true);
          setFinalReport(result.report);
        } else {
          // ✅ 개별 질문 피드백
          setReport({ short_feedback: result.short_feedback });
          if (result.next_question) {
            setQuestions((prev) => [...prev, result.next_question]);
          }
        }
      } catch (err) {
        console.error("❌ 제출 실패:", err.response?.status, err.response?.data || err.message);
      }
    }, 500); // onstop 후 chunks 저장 대기
  };

  // ✅ 다음 질문으로 이동
  const handleNextQuestion = () => {
    setReport(null);
    setAnswerTime(0);
    setTime(90);
    setQuestionIndex((prev) => prev + 1);

    if (stream) {
      startRecording(stream); // 새 질문 시작 시 다시 녹화
    }
  };

  return (
    <div className="interview-container">
      {finalReport ? (
        // ✅ 최종 리포트
        <div className="final-report">
          <h2>📊 최종 면접 리포트</h2>
          <pre>{JSON.stringify(finalReport, null, 2)}</pre>
        </div>
      ) : report ? (
        // ✅ 개별 리포트
        <div className="report-section">
          <h2>📊 질문 {questionIndex + 1} 리포트</h2>
          <p>{report.short_feedback}</p>
          <div className="answer-time">답변 시간: {answerTime}초</div>
          <button className="next-btn" onClick={handleNextQuestion}>
            {questionIndex < meta.total_question_num - 1
              ? "다음 면접 진행하기"
              : "면접 종료"}
          </button>
        </div>
      ) : !isFinished ? (
        // ✅ 질문 화면
        <>
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

          <div className="answer-section">
            <div className="timer">{formatTime(time)}</div>
            <div className="answer-info">
              15초 이후에 답변을 마무리할 수 있습니다.
            </div>
          </div>

          {time <= 15 && (
            <div className="button-section">
              <button className="finish-btn" onClick={handleSubmitAnswer}>
                답변 마무리 하기
              </button>
            </div>
          )}
        </>
      ) : (
        <div>면접이 종료되었습니다.</div>
      )}
    </div>
  );
};

export default InterviewRun;
