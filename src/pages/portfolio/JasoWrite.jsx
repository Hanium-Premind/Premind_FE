import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/jasowrite.scss";
import JobSelec from "./JobSelection"; // ✅ 모달 컴포넌트 import

export default function JasoWrite() {
  const navigate = useNavigate();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // 드롭다운 질문 옵션
  const questionOptions = [
    "본인의 성장과정에 대해 설명하세요",
    "지원 동기를 작성하세요",
    "본인 성격의 장단점을 설명하세요",
    "도전 및 문제해결 경험을 설명하세요",
    "협업 또는 팀워크 경험에 대해 설명하세요",
    "가장 성취감을 느꼈던 경험을 설명하세요",
    "지원 직무를 선택한 이유와 준비 과정을 설명하세요",
    "실패 경험과 그 극복 과정을 설명하세요",
    "입사 후 포부에 대해 설명하세요",
    "리더십을 발휘한 경험에 대해 설명하세요",
    "자신의 가치관 또는 신념에 대해 설명하세요",
    "타인과의 갈등을 해결한 경험을 설명하세요",
    "해당 기업에 지원한 이유와 기업에 대해 조사한 내용을 포함해 설명하세요",
    "직접 작성"
  ];

  // 기본 정보
  const [formData, setFormData] = useState({
    title: "",
    job: "",
    company: "",
  });

  // 질문/답변 리스트
  const [qaList, setQaList] = useState([
    { question: questionOptions[0], answer: "", isCustom: false }
  ]);

  // 기본 항목 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 질문/답변 핸들러
  const handleQaChange = (index, e) => {
    const { name, value } = e.target;
    const newQaList = [...qaList];
    newQaList[index][name] = value;
    setQaList(newQaList);
  };

  // 드롭다운 변경 핸들러
  const handleDropdownChange = (index, value) => {
    const newQaList = [...qaList];
    if (value === "직접 작성") {
      newQaList[index].question = "";
      newQaList[index].isCustom = true;
    } else {
      newQaList[index].question = value;
      newQaList[index].isCustom = false;
    }
    setQaList(newQaList);
  };

  // 질문/답변 추가
  const addQa = () => {
    setQaList([
      ...qaList,
      { question: questionOptions[0], answer: "", isCustom: false }
    ]);
  };

  // ✅ JobSelec에서 선택된 직무 ID도 같이 받음
const handleJobSelect = (selectedJob) => {
    setIsJobModalOpen(false); // 모달 닫기
    setFormData({
     ...formData,
     job: selectedJob.name,              // 표시용 (텍스트)
      jobMajorId: selectedJob.majorId,    // API 전송용
      jobMiddleId: selectedJob.middleId,
      jobMinorId: selectedJob.minorId,
  });
  setIsJobModalOpen(false);
};

// ✅ 제출
const handleSubmit = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const payload = {
    jobMajorId: formData.jobMajorId,
    jobMiddleId: formData.jobMiddleId,
    jobMinorId: formData.jobMinorId,
    title: formData.title,
    memo: "",               // 필요 시 메모 추가
    company: formData.company,
    qaList: qaList.map((qa) => ({
      question: qa.question,
      answer: qa.answer,
    })),
  };

  try {
    const response = await fetch("http://52.78.218.243:8080/resumes/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("자기소개서가 업로드되었습니다!");
      navigate("/jaso");
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

      {/* 기본 항목 */}
      <div className="jaso-section">
        <h3>[기본 항목]</h3>
        <h5>자기소개서 파일명</h5>
        <input
          type="text"
          name="title"
          placeholder="이번 자기소개서 파일명을 작성해주세요"
          value={formData.title}
          onChange={handleChange}
        />
        <h5>직무</h5>
        <div className="job-info" onClick={() => setIsJobModalOpen(true)}>
          {formData.job || "이번 자기소개서를 작성할 직무를 선택해주세요"}
        </div>
        <h5>기업명</h5>
        <input
          type="text"
          name="company"
          placeholder="이번에 준비할 기업의 이름을 작성해주세요"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      {/* 자기소개서 항목 */}
      <div className="jaso-section">
        <h3>[자기소개서 항목]</h3>

        {qaList.map((qa, index) => (
          <div key={index} className="qa-block">
            {!qa.isCustom && (
              <select
                value={qa.question}
                onChange={(e) => handleDropdownChange(index, e.target.value)}
              >
                {questionOptions.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {qa.isCustom && (
              <input
                type="text"
                name="question"
                placeholder="자기소개서 질문을 직접 작성해주세요"
                value={qa.question}
                onChange={(e) => handleQaChange(index, e)}
              />
            )}

            <div className="textarea-wrapper">
              <textarea
                name="answer"
                placeholder="질문에 대한 내용을 작성해주세요."
                value={qa.answer}
                onChange={(e) => handleQaChange(index, e)}
              />
              <span className="char-count">{qa.answer.length}자</span>
            </div>
          </div>
        ))}

        <div className="plus-button" onClick={addQa}>+</div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        작성 완료
      </button>

      {isJobModalOpen && (
        <div className="job-backdrop">
          <JobSelec onSelect={handleJobSelect} onClose={() => setIsJobModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
