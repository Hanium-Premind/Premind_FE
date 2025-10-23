import { useState } from "react";
import VerifyModal from "../signInUp/VerifyModal";
import "../../assets/sass/signinup.scss";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    gender: "",
    phoneNumber: "",
  });

  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    if (!form.name || !form.phoneNumber) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }
    setShowModal(true);
  };

  const handleVerifySuccess = () => {
    setVerified(true);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verified) {
      alert("본인인증을 완료해주세요.");
      return;
    }
    alert("회원가입 완료!");
    window.location.href = "/signup/complete";
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>
      <p className="required-info">*는 필수항목 입니다.</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>아이디*</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="ID"
            required
          />
        </div>

        <div className="form-row">
          <label>비밀번호*</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            required
          />
        </div>

        <div className="form-row">
          <label>비밀번호 확인*</label>
          <input
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="PASSWORD 확인"
            required
          />
        </div>

        <div className="form-row">
          <label>이름*</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
            required
          />
        </div>

        <div className="form-row">
          <label>생년월일*</label>
          <input
            name="birth"
            value={form.birth}
            onChange={handleChange}
            placeholder="YYYYMMDD"
            required
          />
        </div>

        <div className="form-row gender-row">
          <label>성별*</label>
          <div className="gender-btns">
            <button
              type="button"
              className={form.gender === "FEMALE" ? "active" : ""}
              onClick={() => setForm((f) => ({ ...f, gender: "FEMALE" }))}
            >
              여성
            </button>
            <button
              type="button"
              className={form.gender === "MALE" ? "active" : ""}
              onClick={() => setForm((f) => ({ ...f, gender: "MALE" }))}
            >
              남성
            </button>
          </div>
        </div>

        <div className="form-row">
          <label>전화번호*</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
          />
        </div>

        <div className="verify-row">
          <button
            type="button"
            className="verify-btn"
            onClick={handleOpenModal}
          >
            {verified ? "본인 인증 완료" : "본인 인증"}
          </button>
        </div>

        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>

      {showModal && (
        <VerifyModal
          name={form.name}
          phone={form.phoneNumber}
          onClose={() => setShowModal(false)}
          onSuccess={handleVerifySuccess}
        />
      )}
    </div>
  );
}
