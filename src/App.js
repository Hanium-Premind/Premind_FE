import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/sass/common.scss';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview/InterviewMain';
import Footer from './components/Footer';
import Login from './pages/signInUp/Login';

// import InterviewRecords from './pages/Interview/InterviewRecords';
// import Portfolio from './pages/Portfolio';
// import MyPage from './pages/MyPage';
// import Signup from './pages/signInUp/SignUp';


const App = () => {
  return (
    <Router>
       <div className="app-container">
          <Navbar />
          <main className="app-content">
            <Routes>
              {/* ✅ 각 페이지 라우팅 */}
              <Route path="/" element={<Home />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/portfolio" element={<Portfolio />} /> */}
              {/* <Route path="/mypage" element={<MyPage />} /> */}
              {/* <Route path="/signup" element={<Signup />} /> */}
              
            </Routes>
            </main>
            <Footer />
        </div>
    </Router>
  );
};

export default App;
