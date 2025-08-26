import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/sass/interviewrun.scss";

const InterviewRun = () => {
  const [time, setTime] = useState(90); // 기본 90초
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });
  const [report, setReport] = useState(null); // 리포트 상태
  const [answerTime, setAnswerTime] = useState(0);
  const [subtitle, setSubtitle] = useState(true);

  // 세션에서 면접 정보 가져오기
  useEffect(() => {
    const saved = sessionStorage.getItem("interviewData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setMeta({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
        total_question_num: parsed.total_question_num,
      });
      setQuestions([parsed.question]); // 첫 질문
    }
  }, []);

  // 타이머 동작
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
        setAnswerTime((prev) => prev + 1); // 실제 소요 시간 증가
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  // 답변 저장 & 리포트 요청
  const handleSubmitAnswer = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        `http://52.78.218.243:8080/interviews/practice/submit/${meta.interview_record_id}`,
        {
          job_id: meta.job_id,
          answer_time: answerTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📌 리포트 데이터:", res.data);
      setReport(res.data); // 리포트 표시
      setAnswerTime(0); // 시간 초기화
    } catch (err) {
      console.error("❌ 답변 저장 실패:", err.response?.data || err.message);
    }
  };

  // 다음 질문 불러오기
  const handleNextQuestion = async () => {
    if (questionIndex < meta.total_question_num - 1) {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.post(
          "http://52.78.218.243:8080/interviews/practice/start",
          {
            interview_record_id: meta.interview_record_id,
            job_id: meta.job_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("📌 다음 질문:", res.data);
        setQuestions((prev) => [...prev, res.data.question]);
        setQuestionIndex((prev) => prev + 1);
        setTime(90);
        setReport(null); // 리포트 초기화
      } catch (err) {
        console.error("❌ 다음 질문 불러오기 실패:", err.response?.data || err.message);
      }
    } else {
      alert(`면접이 종료되었습니다. 총 답변 시간: ${answerTime}초`);
    }
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="interview-container">
      {!report ? (
        <>
          {/* 질문 섹션 */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">
                {String(questionIndex + 1).padStart(2, "0")}.
              </div>
              {subtitle && (
                <div className="question-text">
                  {questions[questionIndex] || "질문 불러오는 중..."}
                </div>
              )}
            </div>
            <button
              className="subtitle-btn"
              onClick={() => setSubtitle((prev) => !prev)}
            >
              {subtitle ? "자막 OFF" : "자막 ON"}
            </button>
          </div>

          {/* 답변 섹션 */}
          <div className="answer-section">
            <div className="timer">{formatTime(time)}</div>
            <div className="answer-text">질문에 대한 답변 중</div>
            <div className="answer-info">
              15초 이하 또는 시간이 끝나면 답변을 마무리할 수 있습니다.
            </div>
          </div>

          {/* 답변 마무리 버튼 */}
          {(time <= 15 || time === 0) && (
            <div className="button-section">
              <button className="finish-btn" onClick={handleSubmitAnswer}>
                답변 마무리 하기
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="report-section">
          <h2>📊 질문 {questionIndex + 1} 리포트</h2>
          <p>{report.feedback || "답변이 저장되었습니다."}</p>
          <button className="next-btn" onClick={handleNextQuestion}>
            {questionIndex < meta.total_question_num - 1
              ? "다음 질문 진행하기"
              : "면접 종료"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewRun;
