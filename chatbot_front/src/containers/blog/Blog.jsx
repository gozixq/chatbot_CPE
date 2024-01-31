import React, { useState } from 'react';
import './blog.css';

const Blog = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const onClickHandler = () =>{
    setComments((comments) => [...comments,comment]);
  }

  const onChangeHandler = (e) =>{
    setComment(e.target.value);
  }

  return (
    <div className="gpt3__blog section__padding" id="blog">

      <div className="gpt3__blog-container">
        <div className="gpt3__comment-box">
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={onChangeHandler}
          ></textarea>
          <button className="comment-button" onClick={onClickHandler}>
            Submit Comment
          </button>
        </div>
          {comments.map((text) => (
            <div className="comment-container">
              {text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
