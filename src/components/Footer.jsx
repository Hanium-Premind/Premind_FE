import { useNavigate } from 'react-router-dom';
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../components/footer.scss';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      {/* 상단 링크들 (내부 페이지) */}
      <ul className="footer__menu">
        <li onClick={() => navigate('/')}>홈</li>
        <li onClick={() => navigate('/about')}>소개</li>
        <li onClick={() => navigate('/terms')}>이용약관</li>
        <li onClick={() => navigate('/privacy')}>개인정보 처리방침</li>
        <li onClick={() => navigate('/copyright')}>저작권 정책</li>
        <li onClick={() => navigate('/support')}>고객센터</li>
      </ul>

      {/* 소셜 아이콘 (외부 링크) */}
      <div className="footer__social">
        <AiFillYoutube onClick={() => window.open('https://youtube.com', '_blank')} />
        <FaFacebookF   onClick={() => window.open('https://facebook.com', '_blank')} />
        <AiOutlineTwitter onClick={() => window.open('https://twitter.com', '_blank')} />
        <FaInstagram    onClick={() => window.open('https://instagram.com', '_blank')} />
        <FaLinkedinIn   onClick={() => window.open('https://linkedin.com', '_blank')} />
      </div>

      {/* 카피라이트 */}
      <div className="footer__copy">
        PREMIND &copy; 2025. All rights reserved.
      </div>
    </footer>
  );
}
