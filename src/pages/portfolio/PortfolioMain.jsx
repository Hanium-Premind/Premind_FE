import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sass/portfoliomain.scss";

export default function PortfolioMain() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const cards = [
    {
      id: 1,
      title: "자기소개서 관리",
      desc: "면접에 대비하기 위해선, 자기소개서 작성부터 시작!",
    },
    {
      id: 2,
      title: "포트폴리오 관리",
      desc: "직무에 따라선, 자기소개서 만큼 중요한 자료!",
    },
  ];

  const handleSelect = (cardId) => {
    setSelected(cardId);

    // 카드 선택 시 페이지 이동 처리
    if (cardId === 1) {
      navigate("/jaso"); // 자기소개서 페이지
    } else if (cardId === 2) {
      navigate("/portfolio"); // 포트폴리오 페이지 (추후 필요 시)
    }
  };

  return (
    <div className="main">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${selected === card.id ? "selected" : "default"}`}
        >
          <h2>{card.title}</h2>
          <p>{card.desc}</p>
          <div className="button-wrap">
            <button onClick={() => handleSelect(card.id)}>선택</button>
          </div>
        </div>
      ))}
    </div>
  );
}
