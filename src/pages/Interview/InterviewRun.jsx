import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/sass/interviewrun.scss";

const InterviewRun = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState(90);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [report, setReport] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [subtitleOn, setSubtitleOn] = useState(true);

  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [stream, setStream] = useState(null);

  // ✅ 세션에서 면접 정보 로드
  useEffect(() => {
    const saved = sessionStorage.getItem("interviewData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setMeta({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
        total_question_num: parsed.total_question_num,
      });
      setQuestions([parsed.question]);
    }
  }, []);

  // ✅ 카메라/마이크 스트림 + MediaRecorder 초기화
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        setStream(s);

        const recorder = new MediaRecorder(s, { mimeType: "video/webm" });

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            console.log("🎥 dataavailable 발생:", e.data.size);
            setChunks((prev) => [...prev, e.data]);
          }
        };

        recorder.onstop = () => {
          console.log("⏹️ onstop 이벤트 발생");
          handleSubmitRecording();
        };

        recorder.start(1000); // ✅ 1초마다 dataavailable 발생
        console.log("▶️ MediaRecorder 시작됨");
        setMediaRecorder(recorder);
      })
      .catch((err) => {
        console.error("❌ 카메라 접근 실패:", err);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ✅ 타이머 동작
  useEffect(() => {
    if (time > 0 && !isFinished && !report) {
      const timer = setTimeout(() => setTime((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, isFinished, report]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ✅ 답변 제출 (onstop에서 실행)
  const handleSubmitRecording = async () => {
    console.log("📤 handleSubmitRecording 실행됨, chunks:", chunks.length);

    const recordedBlob = new Blob(chunks, { type: "video/webm" });
    console.log("🎞️ Blob 크기:", recordedBlob.size);

    if (recordedBlob.size === 0) {
      console.error("⚠️ Blob이 비어 있음 → 녹화 데이터 없음");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("job_id", meta.job_id);
      formData.append("file", recordedBlob, "answer.webm");
      formData.append("answer_time", 90 - time);

      console.log("📤 FormData 전송 시작...");
      const res = await axios.post(
        `http://52.78.218.243:8080/interviews/practice/submit/${meta.interview_record_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Content-Type 자동 처리
        }
      );

      console.log("✅ 서버 응답:", res.data);

      if (res.data.data.finished) {
        setReport(res.data.data);
        setIsFinished(true);
      } else {
        setReport(res.data.data); // 이번 질문 리포트 표시
      }
    } catch (err) {
      console.error("❌ 제출 실패:", err.response?.data || err.message);
    }
  };

  // ✅ 버튼 눌렀을 때 녹화 stop → onstop → submit 실행
  const handleFinishAnswer = () => {
    console.log("🟢 handleFinishAnswer 클릭됨");
    if (!mediaRecorder) {
      console.warn("⚠️ mediaRecorder 없음");
      return;
    }
    console.log("⏹️ mediaRecorder.stop 호출");
    mediaRecorder.stop();
  };

  // ✅ 리포트 확인 후 다음 질문
  const handleNextQuestion = async () => {
    setReport(null); // 리포트 닫기
    setChunks([]); // 새 답변을 위해 초기화

    const token = localStorage.getItem("accessToken");
    const res = await axios.post(
      "http://52.78.218.243:8080/interviews/practice/start",
      {
        interview_record_id: meta.interview_record_id,
        job_id: meta.job_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("📌 다음 질문:", res.data);

    setQuestions((prev) => [...prev, res.data.data.question]);
    setQuestionIndex((prev) => prev + 1);
    setTime(90);

    // 새 MediaRecorder 시작
    const newRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    newRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
    };
    newRecorder.onstop = () => handleSubmitRecording();
    newRecorder.start(1000);
    setMediaRecorder(newRecorder);
  };

  return (
    <div className="interview-container">
      {report ? (
        <div className="report-section">
          <h2>📊 질문 {questionIndex + 1} 리포트</h2>
          <p>{report.short_feedback || "답변 리포트가 생성되었습니다."}</p>
          <div className="answer-time">답변 진행시간: {90 - time}초</div>
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

          {/* 답변 마무리 버튼 (항상 렌더링) */}
          <div className="button-section">
            <button
              className="finish-btn"
              onClick={handleFinishAnswer}
              disabled={time > 15} // 15초 전에는 비활성화
            >
              답변 마무리 하기
            </button>
          </div>
        </>
      ) : (
        <div className="report-section">
          <h2>면접 종료</h2>
          <p>{report?.summary || "최종 리포트가 생성되었습니다."}</p>
          <button onClick={() => navigate("/interviews/result")}>
            면접 결과 보러가기
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewRun;
