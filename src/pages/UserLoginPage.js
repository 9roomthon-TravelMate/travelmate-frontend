import React from 'react';
import kakao_login_image from '../assets/images/kakao_login_large_wide.png';
import { onKakaoLogin } from '../utils/api';

const UserLoginPage = () => {
  return (
    <div
      className='flex flex-col items-center justify-center h-screen'
      style={{
        backgroundColor: '#f2f2f2',
        padding: '20px',
      }}
    >
      <h1 className='text-4xl font-extrabold mb-6 text-center text-gray-800'>
        Travel Mate에 오신 것을 환영합니다!
      </h1>
      <p className='text-2xl mb-12 text-center text-gray-600'>
        로그인하여 다양한 여행 정보를 얻고, 맞춤형 여행 코스를 추천받으세요.
      </p>
      <button
        onClick={onKakaoLogin}
        className='transition transform hover:scale-105 focus:scale-105'
      >
        <img
          src={kakao_login_image}
          alt='Kakao login'
          className='shadow-lg rounded-lg hover:shadow-xl transition duration-300'
        />
      </button>
    </div>
  );
};

export default UserLoginPage;
