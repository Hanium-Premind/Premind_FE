import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/sass/login.scss';

export default function Login() {
  const navigate = useNavigate();

  // 입력값 상태
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // 에러 상태
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg('');

    try {
        const res = await axios.post(
          'http://52.78.218.243:8080/auth/login',
          { username, password },
        {
          // 만약 쿠키 기반 세션을 쓰고 싶으면 이 옵션을 추가:
          // withCredentials: true
        }
      );

      console.log("응답", res.data.data);
      // 예: { token: 'JWT 토큰 문자열', user: { ... } }
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);

      // 토큰을 localStorage 에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // "아이디 기억하기" 기능: 
      // true 면 username만 저장해 두고, 아니면 지우기
      if (remember) {
        localStorage.setItem('savedUsername', username);
      } else {
        localStorage.removeItem('savedUsername');
      }
      
      // 로그인 후 홈으로 이동
      navigate('/');
    } catch (err) {
      console.error(err);
      // 백엔드가 보내준 메시지가 있다면 그것을, 아니면 기본 메시지
      const msg =
        err.response?.data?.message ||
        '로그인에 실패했습니다. 아이디/비밀번호를 확인하세요.';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h2>로그인</h2>
        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(r => !r)}
          />
          아이디 기억하기
        </label>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <div className="field">
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="ID"
            required
          />
        </div>

        <div className="field password-field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PASSWORD"
            required
          />
          <a href="/find-password" className="forgot">
            비밀번호 찾기
          </a>
        </div>

        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>

      <div className="signup-link">
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
}
