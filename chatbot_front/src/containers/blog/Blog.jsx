import React, { useState, useEffect } from "react";
import "./blog.css";

const Blog = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/anonymousChat/sheet1"
    )
      .then((response) => response.json())
      .then((data) => setApiData(data.sheet1))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onClickHandler = () => {
    if (comment.trim() !== "") {
      setComments((prevComments) => [...prevComments, comment]);
      setComment("");
    }
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

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
          <div class="spacer"></div>
          <button className="comment-button" onClick={onClickHandler}>
            Comment
            <div class="hoverEffect">
              <div></div>
            </div>
          </button>
          <div class="spacer"></div>
          {[...comments].reverse().map((text, index) => (
            <div>
              <div class="spacer"></div>
              <div key={index} className="notification">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">Anonymous</div>
                <div class="notibody">{text}</div>
              </div>
              <div class="spacer"></div>
            </div>
          ))}
          <div class="spacer"></div>
          {apiData.slice(0, 5).map((item, index) => (
            <div key={index} className="notification">
              <div class="notiglow"></div>
              <div class="notiborderglow"></div>
              <div class="notititle">Anonymous</div>
              <div class="notibody">{item.message}</div>
              <div class="spacer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
