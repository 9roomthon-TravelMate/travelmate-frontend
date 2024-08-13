import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import travel_mate_char from '../assets/images/traveler_character.png';

export default function RegionPage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const setRegion = useAuthStore((state) => state.setRegion);
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleNext = () => {
    if (selectedRegion) {
      setRegion(selectedRegion);
      setIsButtonClicked(true);
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
    <div
      style={{
        backgroundColor: '#f2f2f2',
        minHeight: '100vh',
        paddingTop: '1rem',
      }}
    >
      <div className='container mx-auto p-4 mt-12'>
        <h1 className='text-2xl mb-8' style={{ color: '#7E7C7C' }}>
          이번 여행, 어디로 떠나볼까요?
        </h1>
        <h2 className='text-3xl mb-12'>
          여행을 떠나고 싶은 지역을 선택해 주세요.
        </h2>

        <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
          <div className='flex flex-col w-full lg:w-auto'>
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

            {/* 다음 버튼을 버튼들과 같은 박스 아래 오른쪽에 배치 */}
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleNext}
                className={`py-3 px-6 rounded-lg ${
                  isButtonClicked
                    ? 'bg-[#a8e6ff] text-black'
                    : 'bg-gray-200 text-black'
                }`}
              >
                다음
              </button>
            </div>
          </div>

          <div className='flex justify-center items-center w-full lg:w-auto p-4 lg:p-0'>
            <img
              src={travel_mate_char}
              alt='Travel Mate'
              className='w-48 h-auto lg:w-72'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
