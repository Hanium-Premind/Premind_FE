import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/signinup.scss";
import VerifyModal from "./VerifyModal"; // 본인 인증 모달

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGender = (gender) => {
    setForm({ ...form, gender });
  };

  const handleVerify = () => {
    // 모든 입력이 완료된 경우만 본인 인증 열기
    if (
      !form.username ||
      !form.password ||
      !form.confirmPassword ||
      !form.name ||
      !form.birthYear ||
      !form.birthMonth ||
      !form.birthDay ||
      !form.gender
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setShowModal(true);
  };

  const handleSignup = () => {
    if (!verified) {
      alert("본인 인증을 완료해주세요.");
      return;
    }
    navigate("/signup/complete");
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>
      <p className="required-info">*는 필수항목 입니다.</p>

      <form className="signup-form">
        <div className="form-grid">
          <label htmlFor="username">아이디*</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="ID"
            required
          />

          <label htmlFor="password">비밀번호*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            required
          />

          <label htmlFor="confirmPassword">비밀번호 확인*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 재입력"
            required
          />

          <label htmlFor="name">이름*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름 입력"
            required
          />

          <label>생년월일*</label>
          <div className="birth-inputs">
            <input
              type="text"
              name="birthYear"
              maxLength="4"
              placeholder="YYYY"
              value={form.birthYear}
              onChange={handleChange}
            />
            <span>년</span>
            <input
              type="text"
              name="birthMonth"
              maxLength="2"
              placeholder="MM"
              value={form.birthMonth}
              onChange={handleChange}
            />
            <span>월</span>
            <input
              type="text"
              name="birthDay"
              maxLength="2"
              placeholder="DD"
              value={form.birthDay}
              onChange={handleChange}
            />
            <span>일</span>
          </div>

          <label>성별*</label>
          <div className="gender-btns">
            <button
              type="button"
              className={form.gender === "FEMALE" ? "active" : ""}
              onClick={() => handleGender("FEMALE")}
            >
              여성
            </button>
            <button
              type="button"
              className={form.gender === "MALE" ? "active" : ""}
              onClick={() => handleGender("MALE")}
            >
              남성
            </button>
          </div>
        </div>

        <div className="verify-row">
          <button
            type="button"
            className={`verify-btn ${verified ? "complete" : ""}`}
            onClick={handleVerify}
          >
            {verified ? "본인 인증 완료" : "본인 인증"}
          </button>
        </div>

        <button
          type="button"
          className="submit-btn"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </form>

      {showModal && (
        <VerifyModal
          name={form.name}
          onClose={() => setShowModal(false)}
          onVerified={() => {
            setVerified(true);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
