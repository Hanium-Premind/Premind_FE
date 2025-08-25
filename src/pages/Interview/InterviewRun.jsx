import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/sass/interviewrun.scss";

const InterviewRun = () => {
  const [time, setTime] = useState(90);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [report, setReport] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [subtitleOn, setSubtitleOn] = useState(true); // ✅ 자막(질문) 표시 여부

  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });

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
      sessionStorage.setItem(
        "interviewMeta",
        JSON.stringify({
          interview_record_id: parsed.interview_record_id,
          job_id: parsed.job_id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (time > 0 && !isFinished) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, isFinished]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFinishAnswer = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job_id", meta.job_id);
      formData.append("file", new Blob()); 
      formData.append("answer_time", 90 - time);

      const res = await axios.post(
        `http://52.78.218.243:8080/interviews/practice/submit/${meta.interview_record_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.data.finished) {
        setReport(res.data.data.report);
        setIsFinished(true);
      } else {
        setQuestions((prev) => [...prev, res.data.data.next_question]);
        setQuestionIndex((prev) => prev + 1);
        setTime(90);
      }
    } catch (err) {
      console.error("리포트 전송 실패:", err);
    }
  };

  return (
    <div className="interview-container">
      {!isFinished ? (
        <>
          {/* 상단 질문 */}
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

          {/* 중앙: 타이머 */}
          <div className="answer-section">
            <div className="timer">{formatTime(time)}</div>
            <div className="answer-text">질문에 대한 답변 중</div>
            <div className="answer-info">
              실수로 넘어가지 않도록, 15초 이후에 답변을 마무리할 수 있습니다.
              <br />
              더이상 답변을 하고 싶지 않다면 답변을 마무리해주세요.
            </div>
          </div>

          {(time <= 15 || time === 0) && (
            <div className="button-section">
              <button className="finish-btn" onClick={handleFinishAnswer}>
                답변 마무리 하기
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="report-section">
          <h2>면접 종료</h2>
          <p>{report?.summary}</p>
          <div className="report-details">
            <h3>세부 분석</h3>
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewRun;
