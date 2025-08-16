import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/sass/jasowrite.scss";

export default function JasoWrite() {
  const { resumeId } = useParams(); // /resumes/:resumeId 에서 param 추출
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        title: title,
        question: question,
        answer: answer,
      };

      await axios.post(`/resumes/${resumeId}`, payload);

      alert("자기소개서가 저장되었습니다.");
      navigate("/resumes/list"); // 작성 완료 후 리스트 페이지로 이동
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="jaso-container">
      <h2>자기소개서</h2>

      {/* 파일명 입력 */}
      <input
        type="text"
        placeholder="이번 자기소개서 파일명을 작성해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-box"
      />

      {/* 질문 */}
      <input
        type="text"
        placeholder="자기소개서 질문을 선택해주세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input-box"
      />

      {/* 답변 */}
      <textarea
        placeholder="질문에 대한 내용을 작성해주세요."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="textarea-box"
      />

      {/* 작성 완료 버튼 */}
      <button onClick={handleSubmit} className="submit-btn">
        작성 완료
      </button>
    </div>
  );
}
