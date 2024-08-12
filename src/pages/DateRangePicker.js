import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/locale';
import useAuthStore from '../context/useAuthStore';
import travel_mate_char from '../assets/images/traveler_character.png';
import './css/CustomDatePicker.css';

registerLocale('ko', ko);

export default function TravelPeriodPage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const setTravelPeriod = useAuthStore((state) => state.setTravelPeriod);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
    <div
      style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}
      className='p-4'
    >
      <div className='container mx-auto p-4 mt-12'>
        <h1 className='text-2xl mb-12 mt-12'>
          여행을 떠날 일자와 돌아올 일자를 선택해 주세요.
        </h1>
        <div className='flex flex-col lg:flex-row items-center mb-8'>
          <div className='w-full lg:w-2/3 mb-8 lg:mb-0'>
            <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full'>
              <label className='block text-lg mb-4'>날짜를 선택해주세요.</label>
              <DatePicker
                locale='ko'
                selected={startDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className='flex justify-between items-center px-2 py-1'>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {'<'}
                    </button>
                    <span className='text-lg'>
                      {date.getFullYear()}년 {date.getMonth() + 1}월
                    </span>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {'>'}
                    </button>
                  </div>
                )}
                placeholderText='여행 날짜를 선택하세요'
                className='custom-datepicker'
                calendarContainer={({ children }) => (
                  <div className='custom-calendar-container'>{children}</div>
                )}
              />

              {/* 다음 버튼을 박스 내부 오른쪽 아래에 배치 */}
              <div className='flex justify-end mt-4'>
                <button
                  onClick={handleNext}
                  className='text-white py-3 px-6 rounded-lg'
                  style={{ backgroundColor: '#411A90' }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center w-full lg:w-1/3 p-4 lg:p-0'>
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
