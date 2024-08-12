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

export const fetchTourSpotReviewList = async(tourSpotId, query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourspots/${tourSpotId}/reviews`, {
      withCredentials: true,
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching tour spot review list');
  }
};

export const fetchMyTourSpotReview = async(tourSpotId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourspots/${tourSpotId}/reviews/my`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error fetching my tour spot review');
  }
};

export const postTourSpotReview = async(tourSpotId, review) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tourspots/${tourSpotId}/reviews`, review, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error post tour spot review');
  }
};

export const updateTourSpotReview = async(reviewId, review) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tourspot/reviews/${reviewId}`, review, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error update tour spot review');
  }
};

export const deleteTourSpotReview = async(reviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tourspot/reviews/${reviewId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Error delete tour spot review');
  }
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

// 좋아요 목록 가져오기
export const fetchLikedPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mypage/likes`, {
      withCredentials: true,
    });
    return response.data.map(post => ({
      id: post.id,
      imageUri: post.imageUri
    }));
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('좋아요 한 게시물 정보를 가져오는 중 에러 발생:', error);
  }
};

// 내 게시물 가져오기
export const fetchMyPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mypage/posts`, {
      withCredentials: true,
    });
    return response.data.map(post => ({
      id: post.id,
      imageUri: post.imageUri
    }));
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('내 게시물 정보를 가져오는 중 에러 발생:', error);
  }
};

// 추천 일정 목록 가져오기
export const fetchRecommendedSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mypage/recommends`, {
      withCredentials: true,
    });
    return response.data.map(schedule => ({
      name: schedule.name,
      address: schedule.address,
      mainThumbnailUrl: schedule.mainThumbnailUrl // mainThumbnailUrl 필드를 포함합니다
    }));
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('추천 일정 정보를 가져오는 중 에러 발생:', error);
  }
};

// 회원탈퇴
export const deleteAccount = async () => {
  try {
    await axios.post(`${API_BASE_URL}/users/delete`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('회원탈퇴 중 에러 발생:', error);
  }
};

