import React from 'react';
import { Link } from 'react-router-dom';
import travel_mate_logo from '../assets/images/travel_mate.png';
import useAuthStore from '../context/useAuthContext';

export default function Navbar() {
  const { user } = useAuthStore((state) => state); // 상태에서 user 정보 가져오기

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <img src={travel_mate_logo} alt='Travel Mate' className='w-36 h-auto' />
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/profile'>일정 추천</Link>
        <Link to='/test2'>여행지 정보</Link>
        <Link to='/community'>커뮤니티</Link>
        <Link to='loginPage' className='flex items-center text-4xl text-brand'>
          <img
            src={travel_mate_logo}
            alt='Travel Mate'
            className='w-36 h-auto'
          />
        </Link>
      </nav>
    </header>
  );
}
