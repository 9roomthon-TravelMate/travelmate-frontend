import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const onKakaoLogin = () => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
};

export const fetchUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching user info');
  }
};

export const logout = async () => {
  await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const deleteUser = async () => {
  await axios.post(
    `${API_BASE_URL}/users/delete`,
    {},
    {
      withCredentials: true,
    }
  );
};
