import React, { useRef, useState, useEffect } from 'react';
import '../components/slider.scss';


export default function SliderSection({ slides }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 스크롤 이벤트로 현재 인덱스 계산
  const onScroll = () => {
    const { scrollLeft, clientWidth } = sliderRef.current;
    const idx = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(idx);
  };

  // dot 클릭 시 이동
  const goTo = (i) => {
    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * i,
      behavior: 'smooth'
    });
  };

  // 리사이즈 시 위치 보정
  useEffect(() => {
    const handler = () => goTo(currentIndex);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [currentIndex]);

  return (
    <section className="slide-section">
      {/* 현재 슬라이드의 제목 */}
      <p className="section-title">{slides[currentIndex].title}</p>

      <div className="slider-container">
        {/* 이미지 슬라이더 */}
        <div className="image-slider" ref={sliderRef} onScroll={onScroll}>
          {slides.map(({ img }, i) => (
            <div key={i} className="slide">
              <img src={img} alt={`slide ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* 페이지네이션 닷 */}
        <div className="pagination-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
