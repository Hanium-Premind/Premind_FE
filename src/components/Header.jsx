import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo-section">
        <img
          //src=""
          alt="premind 로고"
          className="logo-image"
        />
      </div>
      <nav className="nav-menu">
        <ul>
          <li><a href="#">면접</a></li>
          <li><a href="#">면접 기록</a></li>
          <li><a href="#">자소서 / 포트폴리오</a></li>
          <li><a href="#">마이페이지</a></li>
        </ul>
        </nav>
        <nav className="nav-button">
            <button className='signup-button'>회원가입</button>
            <button className='login-button'>로그인</button>
        </nav>
    </header>
  );
}

export default Header;