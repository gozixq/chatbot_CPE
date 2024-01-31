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
          >
          </textarea>
          <div class="spacer"></div>
          <button className="comment-button" onClick={onClickHandler}>
              Comment
          <div class="hoverEffect">
          <div>
          </div>
          </div></button>

          <div class="spacer"></div>
          {[...comments].reverse().map((text, index) => (
            <div>
              <div class="spacer"></div> {/* Spacer div added here */}
              <div key={index} className="notification">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">Anonymous</div>
                <div class="notibody">{text}</div>
              </div>
              <div class="spacer"></div> {/* Spacer div added here */}
            </div>
          ))}

        </div>
        
      </div>
    </div>
  );
};

export default Blog;
