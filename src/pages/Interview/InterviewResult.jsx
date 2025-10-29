import React, { useState } from "react";
import "../../assets/sass/interviewresult.scss";

const InterviewResult = () => {
  const [activeFilter, setActiveFilter] = useState("전체");

  const data = [
    {
      date: "2025.07.08",
      title: "000회사",
      type: "포트폴리오",
      score: "78/100",
      mode: "실전모드",
    },
    {
      date: "2025.07.08",
      title: "111회사",
      type: "포트폴리오",
      score: "68/100",
      mode: "실전모드",
    },
    {
      date: "2025.06.27",
      title: "222회사",
      type: "자기소개서",
      score: "77/100",
      mode: "연습모드",
    },
    {
      date: "2025.05.25",
      title: "333회사",
      type: "자기소개서",
      score: "89/100",
      mode: "반복모드",
    },
  ];

  const filteredData =
    activeFilter === "전체"
      ? data
      : data.filter((item) => item.mode === activeFilter);

  return (
    <div className="page interview-result-page">
      <div className="interview-container">
        <h2 className="page-title">면접 결과</h2>

        {/* 필터 버튼 */}
        <div className="filter-buttons">
          {["전체", "실전모드", "연습모드", "반복모드"].map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 결과 테이블 */}
        <table className="result-table">
          <thead>
            <tr>
              <th>등록 일자 & 순</th>
              <th>자료</th>
              <th>점수</th>
              <th>면접 모드</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="date-cell">
                  <span className="date">{item.date}</span>
                  <span className="title">{item.title}</span>
                </td>
                <td>{item.type}</td>
                <td>{item.score}</td>
                <td className="mode-cell">{item.mode}</td>
                <td className="more-cell">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewResult;
