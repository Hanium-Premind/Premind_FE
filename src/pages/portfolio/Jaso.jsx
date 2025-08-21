import { useEffect, useState } from "react";
import "../../assets/sass/jaso.scss";
import { useNavigate } from "react-router-dom";

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  // ✅ 데이터 fetch
 useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");

  fetch("http://52.78.218.243:8080/resumes/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // 서버에 JSON 요청 명시
      "Accept": "application/json",       // JSON 응답 기대
      "Authorization": `Bearer ${accessToken}`, // ✅ 문자열 제대로 처리
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("네트워크 응답 오류: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("자소서 목록 data", data); // ✅ 여기서 출력
      setResumes(data.data);
    })
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
