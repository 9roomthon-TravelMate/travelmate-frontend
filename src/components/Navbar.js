import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import travel_mate_logo from '../assets/images/travel_mate.png';
import useUser from '../hooks/useUser';
import { logout, deleteUser } from '../utils/api';

export default function Navbar() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      clearUser();
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <img src={travel_mate_logo} alt='Travel Mate' className='w-36 h-auto' />
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/testpage'>일정 추천</Link>
        <Link to='/test2'>여행지 정보</Link>
        <Link to='/test3'>커뮤니티</Link>
        <button onClick={handleDeleteUser} className='ml-4 text-sm'>
          회원탈퇴
        </button>
        {user ? (
          <div className='flex items-center gap-2'>
            <img
              src={user.profile_image}
              alt='Profile'
              className='w-10 h-10 rounded-full'
            />
            <span>{user.nickname}</span>
            <button onClick={handleLogout} className='ml-4 text-sm'>
              로그아웃
            </button>
          </div>
        ) : (
          <Link to='/loginPage' className='text-2xl text-brand'>
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
}
