import React from 'react';
import possibilityImage from '../../assets/200.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>

    <div class="card-container">
        <div class="card-header">
          <div class="img-avatar"></div>
          <div class="text-chat">Chat CPE</div>
        </div>
        <div class="card-body">
          <div class="messages-container">
              <div class="message-box left">
                  <p>Hello, How are you?</p>
              </div>
              <div class="message-box right">
                  <p>I'm good, thanks for asking! How about you?</p>
              </div>
          </div>
          <div class="message-input">
            <form>
              <textarea placeholder="Type your message here" class="message-send"></textarea>
              <button type="submit" class="button-send">Send</button>
            </form>
          </div>
        </div>
      </div>

    <div class="spacer"></div>
    
  </div>
);

export default Possibility;
