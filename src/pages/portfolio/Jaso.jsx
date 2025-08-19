import { useEffect, useState } from "react";
import "../../assets/sass/jaso.scss";
import { useNavigate } from "react-router-dom";

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  // ✅ 데이터 fetch
  useEffect(() => {
    fetch("http://52.78.218.243:8080/resumes/list", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("네트워크 응답 오류: " + res.status);
        }
        return res.json();
      })
      .then((data) => setResumes(data))
      .catch((err) => console.error("API 오류:", err));
  }, []);

  return (
    <div className="resume-page">
      <h1 className="title">자기소개서</h1>

      <div className="resume-box">
        {/* 테이블 헤더 */}
        <div className="resume-header">
          <span className="col-left">등록 일자 순 ⬇</span>
          <span className="col-right">등록일</span>
        </div>

        {/* 리스트 출력 */}
        <ul className="resume-list">
          {resumes.map((resume, index) => (
            <li key={index} className="resume-item">
              <div className="resume-info">
                <h3 className="resume-title">{resume.title}</h3>
                <p className="resume-tags">{resume.tags}</p>
              </div>
              <div className="resume-meta">
                <span className="resume-date">{resume.date}</span>
                <span className="more">⋯</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 버튼 */}
      <div className="button-wrap">
        <button onClick={() => navigate("/jasowrite")}>
          새 자기소개서 작성
        </button>
      </div>
    </div>
  );
}
