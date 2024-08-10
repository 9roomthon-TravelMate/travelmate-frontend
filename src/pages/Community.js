import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Community.css';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const getallposts = async () => {
    try {
      const response = await fetch('http://localhost:8080/post/community', {
        method: 'GET',
        credentials: 'include', //쿠키정보도 같이 보내는 것 
      });
      if (!response.ok) {
        throw new Error('파일 불러오기 실패');
      }

      const result = await response.json();
      console.log('파일 생성 결과:', result);

      setPosts(result.length ? result : []);
      
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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return; // Do nothing if comment is empty

    const content = newComment;
    const formData = new FormData();
    const commentDto = {
        content,
        postId
    };
    const data = {
        CommentDto: commentDto
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('commentdto', blob);

    try {
        const response = await fetch('http://localhost:8080/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to create comment');
      const newCommentData = await response.json();
      
      // Update posts with the new comment
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newCommentData] } 
          : post
      ));
      
      // Reset comment input
      setNewComment('');
      setSelectedPostId(null);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
    };

    const encodeFilename = (filename) => encodeURIComponent(filename);

  return (
    <div className='community_page'>
      <h1 className='default'> 당신의 여행이야기를 들려주거나 동행을 구해보세요! </h1>
      {posts.length === 0 ? (
        <div>
            <p className='welcome'> 아직 등록된 게시글이 없습니다. 첫 게시글을 작성해주세요 ! </p>
            <button className= 'writepost_0' onClick={GotoWritePage}>게시글 작성하기</button>
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
                      <img key={image.id} src={`http://localhost:8080/images?filename=${encodeFilename(image.saveImageName)}`} alt={image.originalImageName} />
                      ))}
                  </div>
                )}
              </div>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className='post-hashtags'>
                  {post.hashtags.map((hashtag, index) => (
                    <span key={index} className='hashtag'>#{hashtag}</span>
                  ))}
                </div>
              )}
              <div className="separator"></div>
              {post.comments && post.comments.length > 0 && (
                <div className='post-comments'>
                  <h3>댓글</h3>
                  <ul>
                    {post.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="comment-form">
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="댓글을 작성하세요..."
                />
                <button onClick={() => handleCommentSubmit(post.postId)}>댓글 작성</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
