import React, { useState, useEffect } from "react";
import possibilityImage from "../../assets/200.png";
import "./possibility.css";
import { Configuration, OpenAIApi } from "openai";

const API_KEY = "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";

// Function to fetch questions from the API
const fetchQuestions = async () => {
  try {
    const response = await fetch(
      `https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/cpeFaQsSheets/sheet3`
    );
    const data = await response.json();
    return data.sheet3; // Return the entire questions array
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return null; // Return null in case of an error to indicate failure
  }
};

async function callOpenAIAPI() {
  let abdul = "";
  console.log("Calling the OpenAI API");

  const APIBody = {
    model: "ft:davinci-002:personal::8n375XlC",
    prompt: "อธิบายความหมายของ การรักใครสักคน",
    temperature: 1.2,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(APIBody),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data.choices[0].text);
      abdul = data.choices[0].text;
    });
  return abdul;
}

const Message = ({ text, sender }) => (
  <div className={`message-box ${sender}`}>
    <p>{text}</p>
  </div>
);

const Possibility = () => {
  const [inputText, setInputText] = useState("");
  const [questions, setQuestions] = useState([]); // Store the questions from the API
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initializeChat = async () => {
      const fetchedQuestions = await fetchQuestions();
      if (fetchedQuestions) {
        setQuestions(fetchedQuestions);
        setMessages([
          { text: "สวัสดี Chat CPE พร้อมให้บริการ!", sender: "Bot" },
        ]);
      } else {
        setMessages([
          { text: "Chat CPE ยังไม่พร้อมในขณะนี้...", sender: "Bot" },
        ]);
      }
    };

    initializeChat();
  }, []);

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

    const userMessage = { text: inputText, sender: "User" }; // Prepare the user's message
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add the user's message to the chat

    if (inputText === "แชท") {
      // If the user input matches "อับดุลเอ้ย", call the OpenAI API
      const data = await callOpenAIAPI();
      // Add the OpenAI response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data, sender: "Bot" },
      ]);
    } else {
      // For other inputs, attempt to find a matching question in the predefined questions list
      const matchingQuestion = questions.find((q) =>
        q.question.toLowerCase().includes(inputText.toLowerCase())
      );

      // Prepare the bot's response based on whether a matching question was found
      const botResponse = matchingQuestion
        ? { text: matchingQuestion.answerTh, sender: "Bot" } // Use the answer from the matching question
        : { text: "ไม่พบคำตอบที่ตรงกับคำถามของคุณ", sender: "Bot" }; // Default response if no match is found

      // Add the bot's response to the chat
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }

    setInputText(""); // Clear the input field after handling the submission
  };

  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        <img src={possibilityImage} alt="possibility" />
      </div>
      <div className="card-container">
        <div className="card-header">
          <div className="img-avatar"></div>
          <div className="text-chat">Chat CPE</div>
        </div>
        <div className="card-body">
          <div className="messages-container">
            {messages.map((message, index) => (
              <Message key={index} {...message} />
            ))}
          </div>
          <div className="message-input">
            <form onSubmit={handleSubmit}>
              <div className="input-button-container">
                <textarea
                  className="comment-input"
                  placeholder="Write your message here..."
                  value={inputText}
                  onChange={handleInputChange}
                ></textarea>
                <div className="spacer"></div>
                <button type="submit" className="button-send">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default Possibility;
