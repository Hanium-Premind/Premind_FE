import React, { useState, useRef } from "react";
import "../../assets/sass/port.scss";

export default function Portfolio() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const questions = [
    "이번 프로젝트의 주제",
    "나의 포지션",
    "문제 인식",
    "문제 해결 방법",
  ];

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded && uploaded.type === "application/pdf") {
      setFile(uploaded);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
    }
  };

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, file, selectedQuestion, answer });
    alert("포트폴리오가 작성되었습니다.");
  };

  return (
    <div className="page portfolio-page">
      <div className="portfolio-container">
        <h2 className="page-title">포트폴리오</h2>

        <form className="portfolio-form" onSubmit={handleSubmit}>
          {/* 제목 */}
          <input
            type="text"
            className="input-title"
            placeholder="이번 프로젝트의 제목을 작성해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* 파일 업로드 */}
          <div className="file-upload">
            <label htmlFor="fileInput">
              {file ? file.name : "파일 업로드 (.pdf only)"}
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>

          {/* ✅ 커스텀 드롭다운 */}
          <div className="dropdown" ref={dropdownRef}>
            <div
              className={`dropdown-header ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedQuestion || "포트폴리오 질문을 선택해주세요"}
              <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </div>

            {dropdownOpen && (
              <ul className="dropdown-list">
                {questions.map((q, idx) => (
                  <li key={idx} onClick={() => handleSelectQuestion(q)}>
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 답변 작성 */}
          <textarea
            className="textarea-answer"
            placeholder="질문에 대한 내용을 작성해주세요."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          ></textarea>

          {/* 추가 버튼 */}
          <button type="button" className="add-question-btn">
            +
          </button>

          {/* 제출 버튼 */}
          <button type="submit" className="submit-btn">
            작성 완료
          </button>
        </form>
      </div>
    </div>
  );
}
