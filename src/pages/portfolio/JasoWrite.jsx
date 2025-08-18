import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/jasowrite.scss";

export default function JasoWrite() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fileName: "",
    job: "",
    company: "",
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://52.78.218.243:8080/resumes/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("자기소개서가 업로드되었습니다!");
        navigate("/jaso"); // 작성완료 후 jaso.jsx 페이지로 이동
      } else {
        alert("업로드 실패, 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="jaso-container">
      <h1 className="jaso-title">자기소개서</h1>

      <div className="jaso-section">
        <h3>[기본 항목]</h3>
        <input
          type="text"
          name="fileName"
          placeholder="이번 자기소개서 파일명을 작성해주세요"
          value={formData.fileName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="job"
          placeholder="이번 자기소개서를 작성할 직무를 선택해주세요"
          value={formData.job}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="이번에 준비할 기업의 이름을 작성해주세요"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div className="jaso-section">
        <h3>[자기소개서 항목]</h3>
        <input
          type="text"
          name="question"
          placeholder="자기소개서 질문을 작성해주세요"
          value={formData.question}
          onChange={handleChange}
        />
        <textarea
          name="answer"
          placeholder="질문에 대한 내용을 작성해주세요."
          value={formData.answer}
          onChange={handleChange}
        />
      </div>

      <div className="plus-button">+</div>

      <button className="submit-btn" onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  );
}
