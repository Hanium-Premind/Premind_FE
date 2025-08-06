import '../../assets/sass/interviewstart.scss';
import { useState, useEffect} from 'react';
import placeholderImg from '../../assets/img/intready.png';

export default function InterviewStart() {
  const [micAllowed, setMicAllowed] = useState(false);
  const [camAllowed, setCamAllowed] = useState(false);
  const [step, setStep] = useState(0); // 0: 준비중, 1: 시작가능

  useEffect(() => {
    // 1) 마이크 권한 요청
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setMicAllowed(true);
        stream.getTracks().forEach(t => t.stop());
        // 2) 카메라 권한 요청
        return navigator.mediaDevices.getUserMedia({ video: true });
      })
      .then(stream => {
        setCamAllowed(true);
        stream.getTracks().forEach(t => t.stop());
      })
      .catch(err => {
        console.warn('permission denied', err);
      });
  }, []);

  // 권한 둘 다 허용되면 시작 버튼 보여주기
  useEffect(() => {
    if (micAllowed && camAllowed) {
      setStep(1);
    }
  }, [micAllowed, camAllowed]);

  const handleStart = () => {
    window.open('/interview/run', '_blank');
  };

  return (
    <div className="interview-start-page">
      <div className="interview-start-card">
        <div className="left">
          <h2 className="title">면접 준비 중...</h2>
          <p className="desc">
            하단의 두 기기의 확인이 끝나면 불이 들어와요.<br/>
            불이 들어오면 잠시 후 면접준비가 끝납니다.
          </p>
          <p className="desc">
            마음의 준비가 끝나면, 면접시작하기를 눌러 시작하세요!
          </p>

          <ul className="checks">
            <li className={micAllowed ? 'ok' : ''}>
              <span className="dot" />
              마이크<br/>
              <small>대답을 잘 듣기 위한 확인 중…</small>
            </li>
            <li className={camAllowed ? 'ok' : ''}>
              <span className="dot" />
              카메라<br/>
              <small>지원자의 열정을 보기 위한 확인 중…</small>
            </li>
          </ul>

          {step === 1 && (
            <button className="start-btn" onClick={handleStart}>
              면접 시작하기
            </button>
          )}
        </div>

        <div className="right">
          <img src={placeholderImg} alt="면접 영상 프리뷰" />
          {step === 0 && <div className="overlay-text">면접 준비중…</div>}
        </div>
      </div>
    </div>
  );
}
