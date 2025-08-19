import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';
import '../assets/sass/navbar.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]); // 🔥 경로가 바뀔 때마다 실행됨

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
     <div className="navbar__logo" onClick={() => navigate('/')}>
        <img src={logo} alt="PREMIND 로고" />
    </div>

      <ul className="navbar__menu">
        <li onClick={() => navigate('/interview')}>모의 면접</li>
        <li onClick={() => navigate('/interview-records')}>면접 결과</li>
        <li onClick={() => navigate('/portfoliomain')}>자소서/포트폴리오</li>
        <li onClick={() => navigate('/mypage')}>마이페이지</li>
      </ul>

      <div className="navbar__actions">
        <button
          type="button"
          className="navbar__logout"
          onClick={handleAuthClick}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
        <div className="navbar__actions__icons">
          <AiFillTwitterCircle onClick={() => window.open('https://twitter.com', '_blank')} />
          <FaInstagramSquare onClick={() => window.open('https://instagram.com', '_blank')} />
          <FaFacebook onClick={() => window.open('https://facebook.com', '_blank')} />
        </div>
      </div>
    </nav>
  );
}
