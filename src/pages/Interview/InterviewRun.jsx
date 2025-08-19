import React, { useState, useEffect } from "react";
import '../../assets/sass/interviewrun.scss';

const Interview = () => {
  const [time, setTime] = useState(90); // 1:30 -> 90초
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    "면접에 앞서서, 본인에 대해 짧은 자기소개 부탁드립니다.",
    "지원 동기와 이 직무를 선택한 이유는 무엇인가요?",
    "본인의 장점과 단점에 대해 말씀해 주세요.",
    "최근 성취한 경험 중 가장 보람찼던 순간은 무엇인가요?",
    "향후 5년 후 본인의 커리어 계획은 무엇인가요?",
  ];

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTime(90);
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
          <div className="question-text">{questions[questionIndex]}</div>
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
