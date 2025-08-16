import { useState } from "react";
import '../../assets/sass/portfoliomain.scss'

export default function App() {
  const [selected, setSelected] = useState(null);

  const cards = [
    { id: 1, title: "자기소개서 관리", desc: "면접에 대비하기 위해선, 자기소개서 작성부터 시작!" },
    { id: 2, title: "포트폴리오 관리", desc: "직무에 따라 중요한 포트폴리오!" },
  ];

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
              <button onClick={() => setSelected(card.id)}>선택</button>
            </div>
          </div>
        ))}
    </div>
  );
}
