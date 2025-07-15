import { useNavigate } from 'react-router-dom';
import Header from '../Navbar'; 

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: 로그인 로직 (API 호출 등)
    console.log({ email, password });

    // 로그인 성공 시 홈으로 이동 예시
    navigate('/');
  };

  return (
    <>
      <Header />

      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
