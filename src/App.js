import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/sass/common.scss';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview/InterviewMain';
import Footer from './components/Footer';
import Login from './pages/signInUp/Login';
import Signup from './pages/signInUp/SignUp';
import SignupComplete from "./pages/signInUp/SignUpComplete.jsx";
import InterviewStart from './pages/Interview/InterviewStart';
import PortfolioMain from './pages/portfolio/PortfolioMain';
import Jaso from './pages/portfolio/Jaso';
import JasoWrite from './pages/portfolio/JasoWrite';
import InterviewRun from './pages/Interview/InterviewRun';
// import InterviewRunt from './pages/Interview/InterviewRunt';
import Portfolio from './pages/portfolio/Portfolio';
import InterR from './pages/Interview/InterviewResult';

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
              <Route path="/interview/start" element={<InterviewStart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/complete" element={<SignupComplete />} />
              <Route path="/portfoliomain" element={<PortfolioMain />} />
              <Route path="/jaso" element={<Jaso />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/jasowrite" element={<JasoWrite />} />
              <Route path="/interview/run" element={<InterviewRun />} /> 
              <Route path="/interview-result" element={<InterR />} />
              {/* <Route path="/interview/runt" element={<InterviewRunt />} /> */}

            </Routes>
          </main>
           <Footer />
        </div>
    </Router>
  );
};

export default App;
