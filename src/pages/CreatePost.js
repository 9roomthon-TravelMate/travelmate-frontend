import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CreatePost.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles([...e.target.files]);
  };

  const handleHashtagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedHashtag = newHashtag.trim();
      if (trimmedHashtag && !hashtags.includes(trimmedHashtag)) {
        setHashtags([...hashtags, trimmedHashtag]);
        setNewHashtag('');
      }
    }
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleHashtagRemove = (index) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const postDto = {
      title,
      content,
      hashtags
    };

    // JSON 데이터를 문자열로 변환하여 FormData에 추가
    formData.append('postDto', JSON.stringify(postDto));
    
    files.forEach(file => formData.append('file', file));

    try {
      const response = await fetch(`${API_BASE_URL}/post/create`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      console.log('Post created successfully:', result);
      navigate('/community');
    } catch (error) {
      console.error('Error creating post:', error.message);
      setError('게시글 생성에 실패하였습니다 :(');
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="writepage">
      <h1 className='default'> 당신의 여행이야기를 들려주거나 동행을 구해보세요! </h1>
      <div className='creatpost-container'>
        <button className="submit-button" type="button" onClick={handleSubmit}>작성 완료</button>
        <h1>글 작성하기</h1>
        <form onSubmit={handleSubmit}>
          <div className='title'>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='content'>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className='file'>
            <label htmlFor="files">사진 올리기</label>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="file-preview">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  {file.name}
                  <button type="button" onClick={() => handleFileRemove(index)} className="remove-button">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='hashtag'>
            <label htmlFor="hashtags">해시태그</label>
            <input
              type="text"
              id="hashtags"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              onKeyDown={handleHashtagKeyPress}
              placeholder="추가 하고 싶은 단어를 적은 후, 스페이스바와 엔터를 누르세요"
            />
            <div className="hashtag-preview">
              {hashtags.map((hashtag, index) => (
                <span key={index} className="hashtag-item">
                  #{hashtag}
                  <button type="button" onClick={() => handleHashtagRemove(index)} className="remove-button">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
      {/* Error modal */}
      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <span className="close-button" onClick={handleCloseErrorModal}>×</span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
