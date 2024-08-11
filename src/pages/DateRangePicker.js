import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';

export default function TravelPeriodPage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const setTravelPeriod = useAuthStore((state) => state.setTravelPeriod);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleNext = () => {
    if (startDate && endDate) {
      setTravelPeriod({
        start: formatDate(startDate),
        end: formatDate(endDate),
      });
      navigate('/preferencespage');
    } else {
      alert('여행 기간을 선택해주세요!');
    }
  };

  return (
    <div className='container mx-auto p-4 mt-12'>
      <h1 className='text-xl font-semibold mb-4'>여행 기간을 선택하세요</h1>
      <div className='flex flex-col items-center mb-8'>
        <div className='mb-4'>
          <label className='block text-lg font-bold mb-2'>여행 날짜</label>
          <DatePicker
            selected={startDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            placeholderText='여행 날짜를 선택하세요'
            className='border p-2 rounded-lg'
            calendarContainer={({ children }) => (
              <div className='text-lg w-180 h-180'>{children}</div>
            )}
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
