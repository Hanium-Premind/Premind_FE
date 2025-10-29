import { useState } from "react";
import VerifyModal from "./VerifyModal";
import "../../assets/sass/signinup.scss";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: { year: "", month: "", day: "" },
    gender: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.username &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword &&
    form.name &&
    form.birth.length === 8 &&
    form.gender;

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("본인 인증을 완료해주세요.");
      return;
    }
    alert("🎉 회원가입이 완료되었습니다!");
  };

  return (
        <div className="signup-page">
        <div className="signup-container">
            {/* 제목 및 안내문 */}
            <h2 className="signup-title">회원가입</h2>
            <div className="signup-subtext-wrapper">
            <p className="signup-subtext">*는 필수항목 입니다.</p>
            </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* 아이디 */}
          <div className="form-grid">
            <label htmlFor="username">아이디*</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="ID"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className="form-grid">
            <label htmlFor="password">비밀번호*</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="PASSWORD"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-grid">
            <label htmlFor="confirmPassword">비밀번호 확인*</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="PASSWORD 확인"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* 이름 */}
          <div className="form-grid">
            <label htmlFor="name">이름*</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 생년월일 */}
<div className="form-grid">
            <label>생년월일*</label>
            <div className="birth-inputs">
              <input
                type="text"
                placeholder="0000"
                maxLength="4"
                value={form.birth.year}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    birth: { ...prev.birth, year: e.target.value },
                  }))
                }
              />
              <span>년</span>
              <input
                type="text"
                placeholder="00"
                maxLength="2"
                value={form.birth.month}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    birth: { ...prev.birth, month: e.target.value },
                  }))
                }
              />
              <span>월</span>
              <input
                type="text"
                placeholder="00"
                maxLength="2"
                value={form.birth.day}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    birth: { ...prev.birth, day: e.target.value },
                  }))
                }
              />
              <span>일</span>
            </div>
          </div>

          {/* 성별 */}
          <div className="form-grid">
            <label>성별*</label>
            <div className="gender-btns">
              <button
                type="button"
                className={form.gender === "FEMALE" ? "active" : ""}
                onClick={() => setForm((p) => ({ ...p, gender: "FEMALE" }))}
              >
                여성
              </button>
              <button
                type="button"
                className={form.gender === "MALE" ? "active" : ""}
                onClick={() => setForm((p) => ({ ...p, gender: "MALE" }))}
              >
                남성
              </button>
            </div>
          </div>

            {/* 본인인증 + 회원가입 */}
            <div className="verify-row">
            <button
                type="button"
                className={`verify-btn ${isFormValid ? "active" : ""} ${
                isVerified ? "verified" : ""
                }`}
                disabled={!isFormValid || isVerified}
                onClick={() => {
                if (!isVerified) setIsModalOpen(true);
                }}
            >
                {isVerified ? "본인 인증 완료" : "본인 인증"}
            </button>

            <button
                type="submit"
                className={`submit-btn ${isVerified ? "active" : ""}`}
                disabled={!isVerified}
            >
                회원가입
            </button>
            </div>

        </form>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <VerifyModal
          name={form.name}
          phone={form.phone}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
}
