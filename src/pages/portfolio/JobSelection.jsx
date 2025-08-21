import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/jobselection.scss";

export default function JobSelec({onSelect, onClose}) {
  const navigate = useNavigate();

  const [majors, setMajors] = useState([]);   // 대분류
  const [middles, setMiddles] = useState([]); // 중분류
  const [minors, setMinors] = useState([]);   // 소분류

  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedMiddle, setSelectedMiddle] = useState(null);
  const [selectedMinor, setSelectedMinor] = useState(null);

   useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");

  fetch("http://52.78.218.243:8080/jobs/list/major", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json",     
      "Authorization": `Bearer ${accessToken}`, 
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("네트워크 응답 오류: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("직무 대분류 목록 data", data.data); 
      setMajors(data.data);
    })
    .catch((err) => console.error("API 오류:", err));
}, []);


  // 대분류 클릭 시 중분류 가져오기
const handleMajorClick = (major) => {
  setSelectedMajor(major);
  setSelectedMiddle(null);
  setSelectedMinor(null);
  setMiddles([]);
  setMinors([]);

  const accessToken = localStorage.getItem("accessToken");

  fetch(`http://52.78.218.243:8080/jobs/list/middle?parentId=${major.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("네트워크 응답 오류: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("중분류 목록 data", data.data);
      setMiddles(data.data);
    })
    .catch((err) => console.error("API 오류:", err));
};


  // 중분류 클릭 시 소분류 가져오기
const handleMiddleClick = (middle) => {
  setSelectedMiddle(middle);
  setSelectedMinor(null);
  setMinors([]);

  const accessToken = localStorage.getItem("accessToken");

  fetch(`http://52.78.218.243:8080/jobs/list/minor?parentId=${middle.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("네트워크 응답 오류: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("소분류 목록 data", data.data);
      setMinors(data.data);  // ✅ minors에 넣어야 함!!
    })
    .catch((err) => console.error("API 오류:", err));
};


  // 소분류 클릭 시 선택 완료
  const handleMinorClick = (minor) => {
    setSelectedMinor(minor);
 if (onSelect) {
    onSelect({
      majorId: selectedMajor.id,
      middleId: selectedMiddle.id,
      minorId: minor.id,
      name: `${selectedMajor.name} > ${selectedMiddle.name} > ${minor.name}`
    });
  }
  if (onClose) onClose();
  };

  return (
    <div className="job-modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="job-column major">
        {majors.map((major) => (
          <div
            key={major.id}
            className={`item ${selectedMajor?.id === major.id ? "selected" : ""}`}
            onClick={() => handleMajorClick(major)}
          >
            {major.name}
          </div>
        ))}
      </div>

      <div className="job-column middle">
        {middles.map((middle) => (
          <div
            key={middle.id}
            className={`item ${selectedMiddle?.id === middle.id ? "selected" : ""}`}
            onClick={() => handleMiddleClick(middle)}
          >
            {middle.name}
          </div>
        ))}
      </div>

      <div className="job-column minor">
        {minors.map((minor) => (
          <div
            key={minor.id}
            className={`item ${selectedMinor?.id === minor.id ? "selected" : ""}`}
            onClick={() => handleMinorClick(minor)}
          >
            {minor.name}
          </div>
        ))}
      </div>
    </div>
  );
}
