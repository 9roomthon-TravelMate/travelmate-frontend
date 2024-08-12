import React from 'react';
import travel_mate_char from '../assets/images/traveler_character.png';

export default function HomePage() {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center h-screen bg-gray-100'>
      <div className='flex flex-col lg:flex-row justify-between w-full lg:w-3/4'>
        <div className='text-3xl flex flex-col justify-center w-full lg:w-2/3 text-left p-4 lg:p-0'>
          <p className='text-3xl lg:text-4xl font-bold mb-4 lg:mb-6'>
            Travel Mate에 오신 것을 환영합니다.
          </p>
          <p className='text-base lg:text-lg'>국내 여행을 계획 중이신가요?</p>
          <p className='text-base lg:text-lg mb-8 lg:mb-32'>
            여행을 떠날 지역, 기간, 취향을 알려주시면 자동으로 맞춤형 코스를
            추천해 드립니다.
          </p>
        </div>
        <button></button>
        <div className='flex justify-center items-center w-full lg:w-1/3 p-4 lg:p-0'>
          <img
            src={travel_mate_char}
            alt='Travel Mate'
            className='w-48 h-auto lg:w-72'
          />
        </div>
      </div>
    </div>
  );
}