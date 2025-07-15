import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/sass/common.scss';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview/InterviewMain';
import InterviewPractice from './pages/Interview/InterviewPrac';
// import InterviewRecords from './pages/Interview/InterviewRecords';
// import Portfolio from './pages/Portfolio';
// import MyPage from './pages/MyPage';
// import Signup from './pages/signInUp/SignUp';
// import Login from './pages/signInUp/Login';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ✅ 각 페이지 라우팅 */}
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview-practice" element={<InterviewPractice />} />
        {/* <Route path="/portfolio" element={<Portfolio />} /> */}
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
