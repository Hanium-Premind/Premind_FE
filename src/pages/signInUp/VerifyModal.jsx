import { useState } from "react";
import axios from "axios";
import "../../assets/sass/signinup.scss";

export default function VerifyModal({ name, phone, onClose, onSuccess }) {
  const [step, setStep] = useState("input");
  const [code, setCode] = useState("");

  const sendCode = async () => {
    try {
      console.log("📤 Sending request to /users/receive/code");
      const response = await axios.post("http://52.78.218.243:8080/users/receive/code", {
        phoneNumber: phone.replace(/-/g, ""),
      });
      console.log("✅ Response:", response.data);
      alert("인증번호가 전송되었습니다!");
      setStep("sent");
    } catch (err) {
      console.error("❌ Error sending code:", err);
      alert("인증번호 발송에 실패했습니다.");
    }
  };

  const verifyCode = async () => {
    try {
      console.log("📤 Verifying code...");
      const response = await axios.post("http://52.78.218.243:8080/users/verify/code", {
        phoneNumber: phone.replace(/-/g, ""),
        code,
      });
      console.log("✅ Verify Response:", response.data);
      alert("인증번호가 확인되었습니다!");
      setStep("verified");
      setTimeout(() => onSuccess(), 800);
    } catch (err) {
      console.error("❌ Error verifying code:", err);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="verify-overlay">
      <div className="verify-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3>본인 인증</h3>

        <div className="verify-info">
          <p><strong>이름</strong> {name}</p>
          <p><strong>전화번호</strong> {phone}</p>
        </div>

        {step === "input" && (
          <button className="send-btn" onClick={sendCode}>
            인증 번호 전송
          </button>
        )}

        {step === "sent" && (
          <>
            <p>인증번호가 전송되었습니다.</p>
            <input
              className="code-input"
              type="text"
              placeholder="인증번호 4자리"
              maxLength="4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="verify-btn" onClick={verifyCode}>
              인증 번호 확인
            </button>
            <button className="resend-btn" onClick={sendCode}>
              인증 번호 재전송
            </button>
          </>
        )}

        {step === "verified" && <p className="verified-text">인증이 완료되었습니다!</p>}
      </div>
    </div>
  );
}
