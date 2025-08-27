import { useState, useEffect } from "react";
import "../../assets/sass/interviewrun.scss";
import reportImage from '../../assets/img/report.svg';

const InterviewT = () => {
  const [time, setTime] = useState(18);
  const [questionIndex, setQuestionIndex] = useState(0);

  // 하드코딩 질문
  const questions = [
    "PLC 기반 제어 시스템 설계로 다운타임을 30% 줄인 방법의 검증 가능한 지표는 무엇이었나요?",
    "사용자 맞춤형 뉴스 추천 모델의 A/B 테스트 결과가 재현 가능하도록 절차나 체크리스트를 어떻게 구성하셨나요?",
    "기술적 용어 차이를 조율할 때, 중재 과정에서의 주요 트레이드오프는 무엇이었습니까?",
    "조직 내에서 협업할 때 갈등을 해결한 경험을 말씀해주세요.",
    "새로운 기술을 도입했을 때, 팀원들의 반발을 어떻게 설득하고 수용시켰나요?"
  ];

  // 하드코딩 리포트 (각 질문마다 short_feedback 미리 작성)
  const reports = [
    {
      short_feedback:
        "사용자는 면접 전반에서 '구조적인 사고력'과 '자신감 있는 표현력'으로 긍정적인 인상을 남겼습니다. 다만 일부 문장에서 속도가 느려져 전달력이 떨어질 수 있습니다. 다음 질문부터는 #문장의 속도감 조절에 유의하세요.",
    },
    {
      short_feedback:
        "A/B 테스트 과정에서 실험군과 대조군을 명확히 구분한 점은 긍정적입니다. 다만 #재현성 보장에 대한 세부 절차 설명이 부족했습니다.",
    },
    {
      short_feedback:
        "#트레이드오프 개념을 잘 언급했으나, 실제 사례 연결이 부족해 아쉬움이 있습니다.",
    },
    {
      short_feedback:
        "갈등 상황 해결 과정에서 #협상 스킬을 잘 보여주었으나, 감정 관리 측면 보강이 필요합니다.",
    },
    {
      short_feedback:
        "새로운 기술 도입 시 #설득 논리와 #데이터 기반 근거가 돋보였습니다. 최종적으로 높은 완성도의 답변입니다.",
    },
  ];
  const reportTitles = [
  "“나쁘지 않았지만, 조금 알아듣기 어려웠군”",
  "“조금 더 구체적인 설명이 필요했어”",
  "“핵심 개념은 잘 짚었지만, 사례 연결이 아쉬웠군”",
  "“협상 과정은 좋았지만 감정 관리가 부족했어”",
  "“논리와 데이터는 좋았지만, 팀 설득 과정이 더 궁금하군”"
];

  const [report, setReport] = useState(null);
  const [subtitleOn, setSubtitleOn] = useState(true);
  const [answerTime, setAnswerTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // 타이머 동작
  useEffect(() => {
    if (time > 0 && !report && !isFinished) {
      const timer = setTimeout(() => {
        setTime((t) => t - 1);
        setAnswerTime((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, report, isFinished]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // 리포트 텍스트 가공 (. 기준 줄바꿈 + # 강조)
  const formatFeedback = (text) => {
    if (!text) return null;
    return text.split(".").map((sentence, idx) => {
      if (!sentence.trim()) return null;
      return (
        <p key={idx}>
          {sentence.split(/(#[^\s]+)/).map((part, i) =>
            part.startsWith("#") ? (
              <span key={i} className="highlight">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  // 답변 마무리 → 중간 리포트 표시
  const handleFinishAnswer = () => {
    setReport(reports[questionIndex]);
  };

  // 다음 질문 이동
  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setReport(null);
      setAnswerTime(0);
      setQuestionIndex((prev) => prev + 1);
      setTime(16);
    } else {
      setReport(null)
      setIsFinished(true);
    }
  };

  return (
    <div className="interview-container">
            {report ? (
        // 중간 리포트
        <div className="report-section mid-report">
          <div className="mid-report-header">
            <h2 className="mid-report-number">{String(questionIndex + 1).padStart(2, "0")}</h2>
            <div className="mid-report-title">
              {reportTitles[questionIndex]}
            </div>
          </div>
          <div className="mid-report-body">
            <div className="report-feedback">{formatFeedback(report.short_feedback)}</div>
          </div>
          <div className="mid-report-footer">
            <div className="answer-time-label" >답변 진행시간</div>
            <div className="answer-time-value">{formatTime(answerTime)}</div>
          </div>
          <button className="next-btn" onClick={handleNextQuestion}>
            {questionIndex < questions.length - 1 ? "다음 면접 진행하기" : "면접 종료"}
          </button>
        </div>
      ) : !isFinished ? (
        // 질문 화면
        <>
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">
                {String(questionIndex + 1).padStart(2, "0")}.
              </div>
              {subtitleOn && <div className="question-text">{questions[questionIndex]}</div>}
            </div>
            <button
              className="subtitle-btn"
              onClick={() => setSubtitleOn((prev) => !prev)}
            >
              {subtitleOn ? "자막 OFF" : "자막 ON"}
            </button>
          </div>

          <div className="answer-section">
            <div className="timer">{formatTime(time)}</div>
            <p className="answer-info">
              15초 이후 또는 시간이 끝나면 답변을 마무리할 수 있습니다.
            </p>
          </div>

          {time <= 15 && (
            <div className="button-section">
              <button className="finish-btn" onClick={handleFinishAnswer}>
                답변 마무리 하기
              </button>
            </div>
          )}
        </>
      ) : (
        // 최종 리포트
        <div className="report-section">
          <h2>종합 면접 리포트</h2>
          <img src={reportImage} alt="면접 분석 리포트"className="result-image" style={{ width: "960px", height: "auto", margin: "32px 0" }}/>
        </div>
      )}
    </div>
  );
};

export default InterviewT;
