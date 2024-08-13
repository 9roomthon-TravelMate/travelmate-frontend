import React from 'react';
import { useNavigate } from 'react-router-dom';
import travel_mate_char from '../assets/images/traveler_character.png';

export default function HomePage() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/regionpage');
  };

  return (
    <div
      className='flex flex-col lg:flex-row justify-center items-center h-screen'
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <div className='flex flex-col lg:flex-row justify-between w-full lg:w-4/5'>
        <div className='text-3xl flex flex-col justify-center w-full lg:w-5/6 text-left p-4 lg:p-0'>
          <p className='text-3xl lg:text-6xl font-bold mb-8 lg:mb-12'>
            Travel Mate에 오신 것을 환영합니다.
          </p>
          <p className='text-3lg mb-8'>국내 여행을 계획 중이신가요?</p>
          <p className='text-3lg mb-12 lg:mb-32'>
            여행을 떠날 지역, 기간, 취향을 알려주시면 자동으로 맞춤형 코스를
            추천해 드립니다.
          </p>
          <div className='flex justify-center'>
            <button
              onClick={handleNavigation}
              className='text-white py-3 px-6 w-full max-w-xs'
              style={{
                backgroundColor: '#4843BC',
                borderRadius: '8px',
              }}
            >
              코스 추천 받기 →
            </button>
          </div>
        </div>

        <div className='flex justify-center items-center w-full lg:w-1/6 p-4 lg:p-0'>
          <img
            src={travel_mate_char}
            alt='Travel Mate'
            className='w-64 h-auto lg:w-80'
          />
        </div>
      </div>
    </div>
  );
}
