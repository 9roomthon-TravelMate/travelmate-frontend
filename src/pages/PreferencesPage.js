import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import { sendSurveyData } from '../utils/api';

const questions = [
  {
    question: '1. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '자연 속에서\n 여유롭게 산책하고 싶어',
    option7: '화려한 도시의 야경을 보러 갈래',
  },
  {
    question: '2. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '새로운 곳을 찾아 모험을 떠날래',
    option7: '익숙한 편안함이 좋아',
  },
  {
    question: '3. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '비싸더라도 숙소는 편해야지!',
    option7: '잠만 자는 건데\n 저렴한 숙소도 괜찮아~',
  },
  {
    question: '4. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '여행은 쉬러 가는 거지~',
    option7: '여행은 색다른 것을 즐기는 거지!',
  },
  {
    question: '5. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '많은 사람들에게 \n인기 있는 랜드마크에 가보고 싶어',
    option7: '사람들에게 잘 알려지지 \n않은 나만의 장소를 찾고 싶어',
  },
  {
    question: '6. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '버려지는 시간이 아까워!\n 여행 계획은 철저하게',
    option7: '흘러가는대로 즐기는 거지~\n 즉흥 여행!',
  },
  {
    question: '7. 다음 중 당신의 취향에 더 잘 맞는 응답을 골라주세요!',
    option1: '인생 사진은 건져야지!\n 남는 건 사진 뿐',
    option7: '사진은 별로 안중요해.\n 즐거우면 된 거야!',
  },
  {
    question: '8. 함께 여행하는 일행이 있나요?',
    options: ['나홀로 여행', '1명과 동행', '2명과 동행', '3명 이상 동행'],
  },
  {
    question: '9. 당신의 성별을 알려주세요',
    options: ['남', '여'],
  },
  {
    question: '10. 당신의 나이를 알려주세요',
    options: ['0~19세', '20대', '30대', '40대', '50대', '60대 이상'],
  },
];

const regionMapping = {
  서울: 1,
  인천: 2,
  대전: 3,
  대구: 4,
  광주: 5,
  부산: 6,
  울산: 7,
  세종: 8,
  경기: 31,
  강원: 32,
  충북: 33,
  충남: 34,
  경북: 35,
  경남: 36,
  전북: 37,
  전남: 38,
  제주: 39,
};

const companionMapping = {
  '나홀로 여행': 0,
  '1명과 동행': 1,
  '2명과 동행': 2,
  '3명 이상 동행': 3,
};

export default function PreferencesSurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setPreference = useAuthStore((state) => state.setPreference);
  const clearPreferences = useAuthStore((state) => state.clearPreferences);
  const preferences = useAuthStore((state) => state.preferences);
  const travelPeriod = useAuthStore((state) => state.travelPeriod);
  const region = useAuthStore((state) => state.region);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);

  useEffect(() => {
    clearPreferences();
  }, [clearPreferences]);

  useEffect(() => {
    if (preferences[currentQuestion] !== undefined) {
      setSelectedAnswer(preferences[currentQuestion]);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestion, preferences]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setPreference(currentQuestion, selectedAnswer);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsLastQuestionAnswered(true);
      }
    }
  };

  useEffect(() => {
    if (isLastQuestionAnswered) {
      sendDataToServer();
    }
  }, [preferences, isLastQuestionAnswered]);

  const transformDataToJSON = (preferences, travelPeriod, region) => {
    const travelStartYmd = travelPeriod.start;
    const travelEndYmd = travelPeriod.end;

    const ageGroupMapping = {
      '0~19세': 10,
      '20대': 20,
      '30대': 30,
      '40대': 40,
      '50대': 50,
      '60대 이상': 60,
    };

    const ageGrp = ageGroupMapping[preferences[9]] || null;
    const regionId = regionMapping[region] || null;
    const travelCompanionsNum = companionMapping[preferences[7]] || 0;

    return {
      gender: preferences[8],
      ageGrp: ageGrp,
      travelStartYmd: travelStartYmd,
      travelEndYmd: travelEndYmd,
      travelStyl1: preferences[0],
      travelStyl2: preferences[1],
      travelStyl3: preferences[2],
      travelStyl4: preferences[3],
      travelStyl5: preferences[4],
      travelStyl6: preferences[5],
      travelStyl7: preferences[6],
      travelCompanionsNum: travelCompanionsNum,
      regionId: regionId,
    };
  };

  const sendDataToServer = async () => {
    const dataToSend = transformDataToJSON(preferences, travelPeriod, region);

    try {
      const responseData = await sendSurveyData(dataToSend);
      navigate('/summarypage', { state: { places: responseData } });
    } catch (error) {
      console.error('Failed to send data to the server');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f2f2f2',
        minHeight: '100vh',
        paddingTop: '1rem',
      }}
    >
      <div className='container mx-auto p-4 mt-12'>
        <h1 className='text-xl mb-4 mt-12' style={{ color: '#7E7C7C' }}>
          마지막으로 당신의 취향을 알려주세요!
        </h1>
        <h2 className='text-2xl mb-36' style={{ color: '#000' }}>
          {questions[currentQuestion].question}
        </h2>

        <div
          className='flex flex-col justify-between'
          style={{ minHeight: '200px' }}
        >
          {currentQuestion < 7 ? (
            <div className='flex justify-between items-center mb-8'>
              <span
                className='flex-shrink-0 w-1/4 text-center text-lg text-black'
                style={{ whiteSpace: 'pre-line' }}
              >
                {questions[currentQuestion].option1}
              </span>
              <div className='flex justify-center gap-4 w-2/4'>
                {[...Array(7)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleSelectAnswer(index + 1)}
                    className={`py-2 px-4 rounded-full ${
                      selectedAnswer === index + 1
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <span
                className='flex-shrink-0 w-1/4 text-center text-lg text-black'
                style={{ whiteSpace: 'pre-line' }}
              >
                {questions[currentQuestion].option7}
              </span>
            </div>
          ) : (
            <div className='flex justify-center items-center mb-8'>
              <div className='flex gap-4'>
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`py-2 px-4 rounded-full ${
                      selectedAnswer === option
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className='flex justify-between mt-12'>
            <button
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full'
              disabled={currentQuestion === 0}
            >
              이전
            </button>
            <button
              onClick={handleNext}
              className={`py-2 px-4 rounded-full ${
                selectedAnswer !== null
                  ? 'bg-purple-500 hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={selectedAnswer === null}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
