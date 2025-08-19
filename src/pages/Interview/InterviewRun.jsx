import React, { useState, useEffect } from "react";
import "../../assets/sass/interviewrun.scss";

const questions = [
  "첫 번째 질문입니다. 답변해주세요.",
  "두 번째 질문입니다. 답변해주세요.",
  "세 번째 질문입니다. 답변해주세요.",
  "네 번째 질문입니다. 답변해주세요.",
  "다섯 번째 질문입니다. 답변해주세요."
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); // 1분 30초
  const [isFinished, setIsFinished] = useState(false);

  // 타이머
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, isFinished]);

  // 다음 질문으로 이동
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(90);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      {!isFinished ? (
        <>
          <div className="quiz-question">
            <h2>질문 {currentQuestion + 1}</h2>
            <p>{questions[currentQuestion]}</p>
          </div>

          <div className="quiz-timer">
            남은 시간: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

          {/* 15초 이하일 때 버튼 표시 */}
          {timeLeft <= 15 && (
            <button className="quiz-button" onClick={handleNextQuestion}>
              답변 마무리하기
            </button>
          )}
        </>
      ) : (
        <div className="quiz-finish">
          <h2>퀴즈가 종료되었습니다 🎉</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
