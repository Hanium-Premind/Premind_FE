import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from './pages/Navbar';
//import Home from './pages/Home';
// import Interview from './pages/Interview/InterviewMain';
// import InterviewRecords from './pages/Interview/InterviewRecords';
// import Portfolio from './pages/Portfolio';
// import MyPage from './pages/MyPage';
// import Signup from './pages/signInUp/SignUp';
// import Login from './pages/signInUp/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Main page Route */}
                <Route path="/" element={
                    <>
                        <Navbar />

                    </>
                } />
                
            </Routes>
        </Router>
    );
  }

export default App;
