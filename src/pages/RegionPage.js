import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import travel_mate_char from '../assets/images/traveler_character.png';

export default function RegionPage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const setRegion = useAuthStore((state) => state.setRegion); // Zustand의 상태 업데이트 함수 가져오기
  const navigate = useNavigate();

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleNext = () => {
    if (selectedRegion) {
      setRegion(selectedRegion); // Zustand의 상태 업데이트
      navigate('/daterangepicker');
    } else {
      alert('여행 가고 싶은 지역을 선택해주세요!');
    }
  };

  const regions = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];

  return (
    <div className='container mx-auto p-4 mt-12'>
      <h1 className='text-xl font-semibold mb-4'>
        이번 여행, 어디로 떠나볼까요?
      </h1>
      <h2 className='text-2xl font-bold mb-12'>
        여행을 떠나고 싶은 지역을 선택해 주세요.
      </h2>

      <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7 gap-8 mb-4'>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region)}
              className={`p-2 border rounded-lg h-24 w-24 flex items-center justify-center ${
                selectedRegion === region
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        <div className='flex justify-center items-center w-full lg:w-auto p-4 lg:p-0'>
          <img
            src={travel_mate_char}
            alt='Travel Mate'
            className='w-48 h-auto lg:w-72'
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className='bg-purple-500 hover:bg-purple-700 text-white py-3 px-6 rounded-full w-full'
      >
        다음
      </button>
    </div>
  );
}
