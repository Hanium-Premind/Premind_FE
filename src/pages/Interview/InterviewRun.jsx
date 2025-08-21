import React, { useState, useEffect } from "react";
import '../../assets/sass/interviewrun.scss';

const Interview = () => {
  const [time, setTime] = useState(90); // 기본 90초
  const [questionIndex, setQuestionIndex] = useState(0);

  // API에서 불러온 질문 리스트 (초기 빈 배열)
  const [questions, setQuestions] = useState([]);

  // 인터뷰 메타 데이터
  const [meta, setMeta] = useState({
    interview_record_id: null,
    job_id: null,
    total_question_num: 0,
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("interviewData");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("세션스토리지 interviewData:", parsed);

      // ✅ meta 저장
      setMeta({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
        total_question_num: parsed.total_question_num,
      });

      // ✅ 첫 질문 저장
      setQuestions([parsed.question]);

      // interview_record_id, job_id는 다음 요청에도 필요 → 다시 sessionStorage에 저장
      sessionStorage.setItem("interviewMeta", JSON.stringify({
        interview_record_id: parsed.interview_record_id,
        job_id: parsed.job_id,
      }));
    }
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleNext = () => {
    // 나중에는 여기서 "다음 질문 요청 API" 호출 가능
    if (questionIndex < meta.total_question_num - 1) {
      setQuestionIndex(questionIndex + 1);
      setTime(90);
    } else {
      alert("모든 질문이 끝났습니다!");
    }
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="interview-container">
      {/* 상단: 질문 */}
      <div className="question-section">
        <div className="question-header">
          <div className="question-number">
            {String(questionIndex + 1).padStart(2, "0")}.
          </div>
          <div className="question-text">
            {questions[questionIndex] || "질문 불러오는 중..."}
          </div>
        </div>
        <button className="subtitle-btn">자막 ON</button>
      </div>

      {/* 중앙: 타이머 & 안내 */}
      <div className="answer-section">
        <div className="timer">{formatTime(time)}</div>
        <div className="answer-text">질문에 대한 답변 중</div>
        <div className="answer-info">
          실수로 넘어가지 않도록, 15초 이후에 답변을 마무리할 수 있도록 설정되어있습니다.
          <br />
          더이상 답변을 하고 싶지 않다면 답변을 마무리해주세요.
        </div>
      </div>

      {/* 하단: 버튼 */}
      {(time <= 15 || time === 0) && (
        <div className="button-section">
          <button className="finish-btn" onClick={handleNext}>
            답변 마무리 하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Interview;
