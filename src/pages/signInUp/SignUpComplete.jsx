import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/signinup.scss";
import backgroundLogo from "../../assets/img/signup.svg";

export default function SignupComplete() {
  const navigate = useNavigate();

  return (
    <div className="complete-page">
      {/* ✅ SVG 배경 */}
      <img src={backgroundLogo} alt="PREMIND background" className="bg-logo" />

      <h2>
        회원가입 <span className="highlight">완료</span>
      </h2>
      <p>가입이 완료되었습니다.</p>
      <p>지금 바로 프리마인드와 함께 면접을 준비해봐요!</p>

      <button className="login-btn" onClick={() => navigate("/login")}>
        로그인
      </button>
    </div>
  );
}
