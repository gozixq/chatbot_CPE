import React, { useState } from 'react';
import './blog.css';

const Blog = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    if (comment.trim() !== '') {
      setComments((prevComments) => [...prevComments, comment]);
      setComment('');
    }
  };

  const onChangeHandler = (e) =>{
    setComment(e.target.value);
  }

  return (
    <div className="section__padding" id="blog">

      <div className="comment-box-container">
        <div className="comment-box">
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={onChangeHandler}
          ></textarea>
          <button className="comment-button" onClick={onClickHandler}>
            Submit Comment
          </button>

          {comments.map((text, index) => (
        <div key={index} className="comment-container">
        {text}
        </div>
        ))}
        </div>
        
      </div>
    </div>
  );
};

export default Blog;
