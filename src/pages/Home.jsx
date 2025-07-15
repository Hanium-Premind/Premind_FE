import '../assets/sass/main.scss'; 
import content1 from '../assets/img/content1.svg';
import line from '../assets/img/line.png';
import lb from '../assets/img/logoblk.svg';
<<<<<<< HEAD
import S1 from '../assets/img/service1.svg';

export default function MainPage() {
=======
import SliderSection from '../components/mainslider';
import S1 from '../assets/img/service1.svg';
import S2 from '../assets/img/service2.svg'

export default function MainPage() {
   const slides = [
    {
      title: '1. 면접 모드별 선택',
      img : S1,
    },
    {
      title: '2. 최종 면접 보고서를 통한 피드백',
      img: S2,
    },
  ];
>>>>>>> 30b8798a7d2ac664e3f4f1235f53353bb3ac84bc
  return (
    <div className="main-page">
      <section className="section hero">
        <div className="hero-text">
          <button>지금 바로 면접 연습하기</button>
        </div>
        <div className="hero-image-wrapper">
            <img src={content1} alt="면접 분석 리포트"className="hero-image"/>
        </div>
      </section>

     
      <section className="section problem">
        <div className="problem-text">
          <p>
            “면접 대비를 편하게 하고 싶어요”<br />
            “면접 학원 비용이 부담돼요”<br />
            “AI를 말하듯이 송출하는 툴이 많이 들어요”<br /><br />
            이러한 걱정의 부담을 덜어드릴<br />
            AI 아바타 기반 면접 서비스<br /><br />
            취업준비생을 위한 면접 대비 플랫폼 서비스
          </p>
        </div>
      </section>

    <section className="section slogan">
            <div className="slogan-background">
                <img src={line} alt="라인 배경" className="bg-line" />
                <img src={lb} alt="PREMIND 로고" className="bg-logo" />
            </div>

            <div className="slogan-overlay">
                <p>
                    당신이<br/>
                    최종 합격에 도달할 때까지</p>
                    <p><br/><br/>
                    옆에서 함께 도와주는</p>
            <button className="start-btn">지금 바로 시작해보기</button>
            </div>
    </section>    
<<<<<<< HEAD
    <section className="section last">
        <p>1. 면접 모드별 선택</p>
    </section>    
=======

    <SliderSection slides={slides} />
   
>>>>>>> 30b8798a7d2ac664e3f4f1235f53353bb3ac84bc
    </div>
  );
}
