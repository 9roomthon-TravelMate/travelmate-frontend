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

export const fetchRegions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourspot/regions`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching regions info');
  }
};

export const fetchDistricts = async (regionId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tourspot/regions/${regionId}/districts`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching districts info');
  }
};

export const fetchThemes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourspot/themes`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching themes info');
  }
};

export const fetchTourismInfo = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourspots`, {
      withCredentials: true,
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching tourismInfo info');
  }
};

export const fetchTourPlace = async (tourSpotId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tourspots/${tourSpotId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching tourPlace info');
  }
}; // 이 부분에서 닫는 중괄호를 추가했습니다.

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

export const sendSurveyData = async (dataToSend) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/recommend/submit`,
      dataToSend,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data; // 응답 데이터를 반환
    } else {
      console.error('Failed to send data to the server');
      return null;
    }
  } catch (error) {
    console.error('Error sending data:', error);
    return null;
  }
};

export const saveVisitedPlaces = async (contentIds) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/recommend/save-visited`,
      {
        contentIds,
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to save visited places');
    }

    return response;
  } catch (error) {
    console.error('Error saving visited places:', error);
    throw error;
  }
};
