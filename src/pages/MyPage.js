import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { deleteAccount, fetchMyPosts, fetchLikedPosts, fetchRecommendedSchedules, deletePost } from '../utils/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function MyPage() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);
  const [likedPosts, setLikedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [recommendedSchedules, setRecommendedSchedules] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMyPosts().then(data => setMyPosts(data)).catch(error => console.error(error));
      fetchLikedPosts().then(data => setLikedPosts(data)).catch(error => console.error(error));
      fetchRecommendedSchedules().then(data => setRecommendedSchedules(data)).catch(error => console.error(error));
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
      try {
        await deleteAccount();
        clearUser();
        localStorage.removeItem('user');
        document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
      } catch (error) {
        console.error('회원탈퇴 실패', error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('이 게시물을 삭제하시겠습니까?')) {
      try {
        await deletePost(postId); // 게시물 삭제 API 호출
        // 삭제 후 상태 갱신
        if (activeTab === 1) {
          setLikedPosts(likedPosts.filter(post => post.id !== postId));
        } else if (activeTab === 2) {
          setMyPosts(myPosts.filter(post => post.id !== postId));
        }
      } catch (error) {
        console.error('게시물 삭제 실패', error);
      }
    }
  };

  const getTabBackgroundStyle = () => {
    const width = 100 / 3;
    switch (activeTab) {
      case 1:
        return { width: `${width}%`, left: 0 };
      case 2:
        return { width: `${width}%`, left: `${width}%` };
      case 3:
        return { width: `${width}%`, left: `${2 * width}%` };
      default:
        return { width: '0%', left: '0%' };
    }
  };

  const encodeFilename = (filename) => {
    return encodeURIComponent(filename);
  };

  const sortedAndGroupedPosts = (posts) => {
    return posts.sort((a, b) => b.id - a.id);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen overflow-hidden pt-20">
      <div className="bg-white w-3/5 p-6 shadow-lg rounded-lg flex flex-col" style={{ minHeight: 'calc(100vh - 5rem)' }}>
        <div className="flex flex-col items-center mb-8">
          <img src={user?.profile_image || 'default_profile_image_url_here'} alt="Profile" className="w-20 h-20 rounded-full mb-4" />
          <h1 className="text-lg text-center">{user?.nickname || '사용자 이름'}</h1>
        </div>

        <div className="relative flex border-b border-gray-300 mb-4">
          <div className="absolute bottom-0 h-1 bg-[#411A90]" style={getTabBackgroundStyle()}></div>
          <div className="flex w-full">
            <button className={`w-1/3 p-2 text-center text-base ${activeTab === 1 ? 'text-[#411A90]' : 'text-gray-600'}`} onClick={() => setActiveTab(1)}>
              좋아요 <span className={`${activeTab === 1 ? 'text-[#411A90]' : 'text-gray-500'} font-bold ml-1`}>{likedPosts.length}</span>
            </button>
            <button className={`w-1/3 p-2 text-center text-base ${activeTab === 2 ? 'text-[#411A90]' : 'text-gray-600'}`} onClick={() => setActiveTab(2)}>
              내 게시글 <span className={`${activeTab === 2 ? 'text-[#411A90]' : 'text-gray-500'} font-bold ml-1`}>{myPosts.length}</span>
            </button>
            <button className={`w-1/3 p-2 text-center text-base ${activeTab === 3 ? 'text-[#411A90]' : 'text-gray-600'}`} onClick={() => setActiveTab(3)}>
              추천 일정 <span className={`${activeTab === 3 ? 'text-[#411A90]' : 'text-gray-500'} font-bold ml-1`}>{recommendedSchedules.length}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 mb-4">
          {activeTab === 1 && (
            <div className="h-96 overflow-y-auto">
              {sortedAndGroupedPosts(likedPosts).map((post, postIndex) => (
                <div key={postIndex} className="mb-6 p-4 bg-white shadow-md rounded-lg flex items-start relative">
                  <img 
                    src={`${API_BASE_URL}/images?filename=${encodeFilename(post.imageUri)}`} 
                    alt={`Liked Post ${post.id}`} 
                    className="w-32 h-32 object-cover rounded-lg mr-4" 
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                  <button 
                    onClick={() => handleDeletePost(post.id)} 
                    className="text-red-500 text-sm absolute bottom-4 right-4"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 2 && (
            <div className="h-96 overflow-y-auto">
              {sortedAndGroupedPosts(myPosts).map((post, postIndex) => (
                <div key={postIndex} className="mb-6 p-4 bg-white shadow-md rounded-lg flex items-start relative">
                  <img 
                    src={`${API_BASE_URL}/images?filename=${encodeFilename(post.imageUri)}`} 
                    alt={`My Post ${post.id}`} 
                    className="w-32 h-32 object-cover rounded-lg mr-4" 
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                  <button 
                    onClick={() => handleDeletePost(post.id)} 
                    className="text-red-500 text-sm absolute bottom-4 right-4"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 3 && (
            <div className="h-96 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {recommendedSchedules.map((schedule, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg shadow-md">
                    <img 
                      src={schedule.mainThumbnailUrl || 'placeholder-image-url.jpg'} 
                      alt={`Thumbnail ${index}`} 
                      className="w-32 h-32 object-cover rounded-lg mr-4" 
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{schedule.name}</h3>
                      <p className="text-gray-700">{schedule.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full mt-7">
        <button onClick={handleDeleteAccount} className="text-black text-lg font-semibold underline">
          계정 삭제하기
        </button>
      </div>
    </div>
  );
}
