// useUser.js
import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../utils/api';
import useAuthStore from '../context/useAuthStore';

export default function useUser() {
  const { user, setUser, clearUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    clearUser: state.clearUser, // clearUser도 함께 가져옴
  }));
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const getUserInfo = async () => {
        try {
          const data = await fetchUserInfo();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (err) {
          setError(err);
        }
      };

      getUserInfo();
    }
  }, [setUser]);

  return { user, error, clearUser };
}
