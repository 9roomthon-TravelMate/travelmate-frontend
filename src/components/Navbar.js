import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import travel_mate_logo from '../assets/images/travel_mate.png';
import useUser from '../hooks/useUser';
import { logout } from '../utils/api';

export default function Navbar() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef();

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

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='fixed z-50 top-0 left-0 w-full bg-white flex justify-between border-b border-gray-300 p-2 h-16'>
      <Link to='/' className='flex items-center'>
        <img
          src={travel_mate_logo}
          alt='Travel Mate'
          className='ml-4 w-36 h-auto'
        />
      </Link>
      <nav
        className='flex items-center gap-4 font-base text-base '
        style={{ color: '#696969' }}
      >
        <Link to='/regionpage'>일정 추천</Link>
        <Link to='/InfoMain'>여행지 정보</Link>
        <Link to='/testpage'>커뮤니티</Link>

        {!user ? (
          <Link to='/loginPage' className='font-base mr-4'>
            로그인
          </Link>
        ) : (
          <div className='relative mr-4' ref={profileRef}>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={toggleDropdown}
            >
              <img
                src={user.profile_image}
                alt='Profile'
                className='w-10 h-10 rounded-full'
              />
              <span>{user.nickname}</span>
            </div>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md'>
                <Link
                  to='/mypage'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
