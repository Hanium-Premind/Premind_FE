import '../assets/sass/interview.scss';
import { useNavigate } from 'react-router-dom';


import intIcon1 from '../assets/img/int1.svg';
import intIcon2    from '../assets/img/mode_real.svg';
import intIcon3   from '../assets/img/mode_review.svg';

const MODES = [
  {
    id: 'practice',
    title: '연습 모드',
    desc1: '면접 부담 없이 편안하게 몇 번이든',
    desc2: '내가 원하는 대로!',
    img: intIcon1,             
    path: '/interview/practice',
  },
  {
    id: 'real',
    title: '실전 모드',
    desc1: '실제 면접처럼 처음부터 긴장감 있게',
    desc2: '확실하게 준비!',
    img: intIcon2,
    path: '/interview/real',
  },
  {
    id: 'review',
    title: '복습 모드',
    desc1: '내가 놓치고 있던 부분을 다시 복기하며',
    desc2: '더 나은 답변 준비!',
    img: intIcon3,
    path: '/interview/review',
  }
];

const TYPES = [
  { id: 'basic',       title: '기본 면접',      desc: '면접에서 기본적인 질문을 생성해 진행합니다.' },
  { id: 'personality', title: '인성 면접',      desc: '회사에 맞는 인재상, 인성과 관련된 질문을 생성해 진행합니다.' },
  { id: 'job',         title: '직무 면접',      desc: '직무에 따른 경험 관련 질문을 생성해 진행합니다.' },
];

export default function InterviewSetup() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="interview-setup">
      <h1 className="setup-title">모의 면접 설정</h1>

      <div className="mode-cards">
        {MODES.map(mode => (
          <div
            key={mode.id}
            className={`mode-card ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => setSelectedMode(mode.id)}
          >
            <div className="card-header">
              <h2>{mode.title}</h2>
            </div>
            <div className="card-body">
              <p>{mode.desc1}</p>
              <p>{mode.desc2}</p>
              {/* import 해온 SVG를 src에 바로 넣습니다 */}
              <img src={mode.img} alt={mode.title} />
            </div>
            <button
              className="select-btn"
              onClick={e => {
                e.stopPropagation();
                navigate(mode.path);
              }}
            >
              선택
            </button>
          </div>
        ))}
      </div>

      <div className="type-list">
        <h2 className="type-title">면접 유형</h2>
        <p className="type-sub">
          이번 면접에서 주로 진행 할 면접 질문 종류를 선택 해주세요
        </p>
        <ul>
          {TYPES.map(type => (
            <li
              key={type.id}
              className={`type-item ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="type-info">
                <h3>{type.title}</h3>
                <p>{type.desc}</p>
              </div>
              <div className="type-radio">
                <span className={`radio ${selectedType === type.id ? 'checked' : ''}`} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


