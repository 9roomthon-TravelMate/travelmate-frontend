import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore'; // 필요에 따라 경로를 업데이트하세요

const ProtectedRoute = ({ element }) => {
  const { user } = useAuthStore();

  if (!user) {
    // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트합니다.
    return <Navigate to='/loginPage' replace />;
  }

  // 사용자가 로그인한 경우 해당 컴포넌트를 렌더링합니다.
  return element;
};

export default ProtectedRoute;
