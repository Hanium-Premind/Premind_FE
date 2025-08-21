import '../../assets/sass/interviewstart.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '../../assets/img/intready.png';

export default function InterviewStart() {
  const [micAllowed, setMicAllowed] = useState(false);
  const [camAllowed, setCamAllowed] = useState(false);
  const [step, setStep] = useState(0); // 0: 준비중, 1: 시작가능
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    let localStream;

    // 마이크 + 카메라 권한 요청
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(s => {
        localStream = s;
        setMicAllowed(true);
        setCamAllowed(true);
        setStream(s); // 스트림 저장
      })
      .catch(err => {
        console.warn('permission denied', err);
      });

    // 컴포넌트 언마운트 시 스트림 해제
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // 권한 둘 다 허용되면 시작 버튼 보여주기
  useEffect(() => {
    if (micAllowed && camAllowed) {
      setStep(1);
    }
  }, [micAllowed, camAllowed]);

  // stream을 video 태그에 연결
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleStart = () => {
    navigate("/interview/run");
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
          {/* 카메라 프리뷰 */}
          {stream ? (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <img src={placeholderImg} alt="면접 영상 프리뷰" />
          )}
          {step === 0 && <div className="overlay-text">면접 준비중…</div>}
        </div>
      </div>
    </div>
  );
}
