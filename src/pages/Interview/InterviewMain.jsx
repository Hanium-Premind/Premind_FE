import '../../assets/sass/interview.scss';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';


import intIcon1 from '../../assets/img/intIcon1.png';
import intIcon2 from '../../assets/img/intIcon2.png';
import intIcon3 from '../../assets/img/intIcon3.png';
import ivIcon from '../../assets/img/Icons.png';

const MODES = [
  {
    id: 'practice',
    title: '연습 모드',
    desc1: '면접 부담 없이 편안하게 몇 번이든',
    desc2: '내가 원하는 대로!',
    img: intIcon1,             
  },
  {
    id: 'real',
    title: '실전 모드',
    desc1: '실제 면접처럼 처음부터 긴장감 있게',
    desc2: '확실하게 준비!',
    img: intIcon2,
  },
  {
    id: 'review',
    title: '복습 모드',
    desc1: '내가 놓치고 있던 부분을 다시 복기하며',
    desc2: '더 나은 답변 준비!',
    img: intIcon3,
  }
];

const INTERVIEWERS = [
  {
    id: 'strict',
    title: '깔끔한',
    desc1: '집요하게 물어보는 면접관입니다.',
    desc2: '작은 것 하나도 놓치지 말고 준비하세요',
    icon: ivIcon
  },
  {
    id: 'friendly',
    title: '상냥한',
    desc1: '편안한 분위기 속 면접 봅니다.',
    desc2: '중요한 요점 위주로 준비하세요',
    icon: ivIcon
  },
  {
    id: 'practical',
    title: '실무집중',
    desc1: '실제 활동의 관계 및 경험에 집중!',
    desc2: '활동의 경험을 정리해서 준비하세요',
    icon: ivIcon
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
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [resume, setResume] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const navigate = useNavigate();

  const handleSelectMode = (modeId) => {
    setSelectedMode(modeId);
    // TODO: 백엔드로 선택값 전송하는 로직 추가하기
  };

  return (
    <div className="interview-setup">
      <h2 className="setup-title">모의 면접 설정</h2>

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
              <p>{mode.desc1}</p><br/>
              <p>{mode.desc2}</p>
              <img src={mode.img} alt={mode.title} />
            </div>
            <button
              className="select-btn"
              onClick={e => {
                e.stopPropagation();
                handleSelectMode(mode.id);
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
                <p>{type.title}</p>
                <p>{type.desc}</p>
              </div>
              <div className="type-radio">
                <span className={`radio ${selectedType === type.id ? 'checked' : ''}`} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 3. 연습 모드일 때만: 질문 갯수 드롭다운 */}
      {selectedMode === 'practice' && (
        <section className="question-count-section">
          <h2 className="section-title">면접 질문 갯수</h2>
          <p className="section-sub">
            이번 면접에서 진행할 질문의 갯수를 설정해 주세요.
            설정 없으면 기본(10개)으로 진행됩니다.
          </p>
          <div className="count-control">
            <select
              className="count-select"
              value={questionCount}
              onChange={e => setQuestionCount(Number(e.target.value))}
            >
              {[...Array(11)].map((_, i) => {
                const n = 5 + i;
                return (
                  <option key={n} value={n}>
                    {n}개
                  </option>
                );
              })}
            </select>
          </div>
        </section>
      )}

      {/* 4. 면접관 유형 */}
      <section className="interviewer-section">
        <h2 className="section-title">면접관 유형</h2>
        <p className="section-sub">
          이번 면접을 진행할 면접관을 선택해 주세요
        </p>
        <div className="interviewer-cards">
          {INTERVIEWERS.map(iv => (
            <div
              key={iv.id}
              className={`interviewer-card ${
                selectedInterviewer === iv.id ? 'active' : ''
              }`}
              onClick={() => setSelectedInterviewer(iv.id)}
            >
              <img src={iv.icon} alt={iv.title} className="iv-icon" />
              <h3>{iv.title}</h3>
              <p className="iv-desc1">{iv.desc1}</p>
              <p className="iv-desc2">{iv.desc2}</p>
              <button
                className="select-btn"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                선택
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 완료 버튼 */}
      <div className="complete-container">
        <button
          className="complete-btn"
          onClick={() => {
            /* onComplete 로직 */
          }}
        >
          면접 설정완료
        </button>
      </div>
    </div>
  );
}


