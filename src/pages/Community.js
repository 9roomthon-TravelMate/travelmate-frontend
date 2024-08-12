import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Community.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set()); // 좋아요 상태를 관리
  const [newComments, setNewComments] = useState({}); // 각 게시글에 대한 댓글 상태를 저장하는 객체
  const navigate = useNavigate();

  const getallposts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/post/community`, {
        method: 'GET',
        credentials: 'include', //쿠키정보도 같이 보내는 것
      });
      if (!response.ok) {
        throw new Error('파일 불러오기 실패');
      }

      const result = await response.json();
      console.log('파일 생성 결과:', result);

      setPosts(result.length ? result.reverse() : []);
      
    } catch (error) {
      console.error('파일 생성 오류:', error.message);
      setError(error.message);
    }
  };

  const GotoWritePage = async () => {
    navigate('/create-post');
  };

  //커뮤니티 페이지 마운팅될때마다 모든 게시글 불러오기
  useEffect(() => {
    getallposts();
  }, []);

  const handleCommentChange = (e, postId) => {
    setNewComments({ ...newComments, [postId]: e.target.value });
  };
  
  const handleCommentSubmit = async (postId) => {
    if (!newComments[postId]?.trim()) return; // 해당 게시글에 대한 댓글이 비어있는지 확인

    const content = newComments[postId];
    const commentDto = { content, postId };
    const data = {
        CommentDto: commentDto
      };

    try {
        console.log("Sending comment to server:", commentDto);

        const response = await fetch(`${API_BASE_URL}/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 데이터로 전송
        },
        body: JSON.stringify(data), // JSON 직렬화
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to create comment');

      const newCommentData = await response.json();
      
      // Update posts with the new comment
      setPosts(posts.map(post => 
        post.postId === postId 
          ? { 
              ...post, 
              comments: [...post.comments, newCommentData], // 댓글 추가
              commentCount: post.commentCount + 1 // 댓글 카운트 증가
            } 
          : post
      ));


      // Reset comment input for the specific post
      setNewComments({ ...newComments, [postId]: '' });
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const encodeFilename = (filename) => encodeURIComponent(filename);

  const handleLikeToggle = async (postId) => {
    try {
      const isLiked = likedPosts.has(postId);  // 현재 좋아요 상태 확인
      const url = `${API_BASE_URL}/like/${isLiked ? 'remove' : 'add'}`;
      const likeDto = { postId };
      const data = {
        LikeDto: likeDto
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
  
      if (!response.ok) throw new Error('Failed to toggle like');
  
      const post = posts.find(p => p.postId === postId);
      const updatedLikeCount = likedPosts.has(postId) ? post.likeCount - 1 : post.likeCount + 1;
  
      // 상태를 업데이트하는 로직
      setPosts(posts.map(post => 
        post.postId === postId 
            ? { ...post, likeCount: updatedLikeCount } 
            : post
        ));
  
      // 좋아요 상태를 업데이트
      if (isLiked) {
        setLikedPosts(new Set([...likedPosts].filter(id => id !== postId)));  // 좋아요 취소
      } else {
        setLikedPosts(new Set(likedPosts.add(postId)));  // 좋아요 추가
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className='community_page'>
      <h1 className='default1'>당신의 여행이야기를 들려주거나 동행을 구해보세요!</h1>
      {posts.length === 0 ? (
        <div>
            <p className='welcome'>아직 등록된 게시글이 없습니다. 첫 게시글을 작성해보세요!</p>
            <button className='writepost_0' onClick={GotoWritePage}>게시글 작성하기</button>
        </div>
      ) : (
        <div className='post-list'>
          <button className='writepost_1' onClick={GotoWritePage}>게시글 작성하기</button>
          {posts.map(post => (
            <div className='post' key={post.postId}>
              <div className='post-header'>
                <p className='author'>{post.author}</p>
                <h2>{post.title}</h2>
              </div>
              <div className='post-content'>
                <p>{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className='post-images'> 
                    {post.images.map((image) => (
                      <img key={image.id} src={`${API_BASE_URL}/images?filename=${encodeFilename(image.saveImageName)}`} alt={image.originalImageName} />
                      ))}
                  </div>
                )}
              </div>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className='post-hashtags'>
                  {post.hashtags.map((hashtag, index) => (
                    <span key={index} className='hashtag'>#{hashtag}  </span>
                  ))}
                </div>
              )}
              <div className='post-interactions'>
                <button 
                  className={`like-button ${likedPosts.has(post.postId) ? 'liked' : ''}`}
                  onClick={() => handleLikeToggle(post.postId)}
                >
                  ❤️ {/* 하트 이모티콘 */}
                </button>
                <span className='like-count'> {post.likeCount}</span> {/* 좋아요 카운트 */}
                <button className='comment-button'>
                  💬 {/* 댓글 이모티콘 */}
                </button>
                <span className='comment-count'> {post.commentCount}</span> {/* 댓글 카운트 */}
              </div>
              <div className="separator"></div>
              {post.comments && post.comments.length > 0 && (
                <div className='post-comments'>
                    <h3 className='comment-header'>댓글</h3>
                    <ul>
                    {post.comments.map((comment, index) => (
                        <li key={index} style={{ whiteSpace: 'nowrap'}}>
                        <span>{comment.writer}</span>&nbsp;&nbsp;&nbsp;&nbsp; {/* 작성자 이름 뒤에 4칸 띄우기 */}
                        <span>{comment.content}</span> {/* 댓글 내용 */}
                        </li>
                    ))}
                    </ul>
                </div>
                )}
              <div className="comment-form">
                <textarea
                  value={newComments[post.postId] || ''}
                  onChange={(e) => handleCommentChange(e, post.postId)}
                  placeholder="댓글을 작성하세요..."
                />
                <button className="comment-content" onClick={() => handleCommentSubmit(post.postId)}>댓글 작성</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
