import React, { useState, useEffect } from "react";
import chatBot from "../assets/images/chatBot2.png";
import { FaPaperPlane } from "react-icons/fa";
import OpenAI from "openai";

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

const openai = new OpenAI({
 apiKey: process.env.REACT_APP_OPENAI_API_KEY,dangerouslyAllowBrowser: true
});

const ChatBot = () => {
  const [inputText, setInputText] = useState("");
  const [questions, setQuestions] = useState([]);
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
    e.preventDefault();
    const userMessage = { text: inputText, sender: "User" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    const matchingQuestion = questions.find((q) =>
      q.question?.toLowerCase().includes(inputText?.toLowerCase())
    );
  
    if (matchingQuestion) {
      setMessages((prevMessages) => [...prevMessages, { text: matchingQuestion.answerTh, sender: "Bot" }]);
      setInputText("");
    } else {
      // Inform the user that the bot is searching for an answer
      setMessages((prevMessages) => [...prevMessages, { text: "...รอสักครู่", sender: "Bot" }]);
  
      try {
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:personal:messages30xtest:8zg6v8tA",
          messages: [
            {
              "role": "system",
              "content": "You are a CPE-CMU FAQs chatbot."
            },
            {
              "role": "user",
              "content": inputText
            }
          ],
          temperature: 0.55,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        
        // Update the chat with the response from OpenAI
        console.log(response.choices[0].message.content);
        setMessages((prevMessages) => [...prevMessages, { text: response.choices[0].message.content, sender: "Bot" }]);
      } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
        // Handle the error case, maybe inform the user that the bot couldn't find an answer
        setMessages((prevMessages) => [...prevMessages, { text: "ขออภัย แชทบอทถูกปิดความสามารถการค้นหาในขนาดนี้", sender: "Bot" }]);
      }
  
      setInputText("");
    }
  };
  
  
  const Message = ({ text, sender }) => (
    <div
      className={`flex items-start w-full p-4 ${
        sender === "Bot" ? "justify-start" : "justify-end"
      }`}
    >
      <p
        className={`py-2 px-3 ${
          sender === "Bot"
            ? "bg-primary rounded-r-lg rounded-tl-lg text-black"
            : "bg-gray-700 text-white rounded-l-lg rounded-tr-lg"
        }`}
      >
        {text}
      </p>
    </div>
  );
  return (
    <div
      className="flex w-full bg-black text-white pt-32 px-10 lg:px-32 pb-10"
      id="chatbot"
    >
      <div className="flex items-center gap-12 w-full">
        <div className="lg:justify-end justify-center items-center hidden lg:flex">
          <img src={chatBot} alt="CPE Bot" className="h-auto w-full" />
        </div>
        <div class="relative w-full h-full">
          <div class="absolute -inset-1 bg-gradient-to-br from-primary to-cyan-500 rounded-lg blur-lg opacity-75 py-4 px-6 transition group-hover:opacity-100 group-hover:blur-lg "></div>
          <div class="relative w-full h-full">
            <div className=" justify-center items-center bg-[#0f0f0f] rounded-2xl p-5">
              <div className="flex gap-5 justify-start w-full items-center pb-3">
                <span className="font-bold text-2xl">Chat CPE</span>
              </div>
              <div className="flex flex-col w-full items-center justify-start overflow-x-auto border-white/50 border-t-[1px] py-2 h-96 chat_____scrollbar">
                {messages.map((message, index) => (
                  <Message key={index} {...message} />
                ))}
              </div>
              <div className="w-full pt-5">
                <form onSubmit={handleSubmit} className="flex gap-5 ">
                  <textarea
                    className="bg-transparent resize-none rounded-md w-full h-16 p-3 focus:outline-none border-[1px] border-white/60 focus:border-primary/60 focus:ring-none"
                    placeholder="Write your message here..."
                    value={inputText}
                    onChange={handleInputChange}
                    disabled={
                      messages.length > 0 &&
                      messages[0].text === "Chat CPE ยังไม่พร้อมในขณะนี้..."
                    }
                  />
                  <button
                    disabled={
                      messages.length > 0 &&
                      messages[0].text === "Chat CPE ยังไม่พร้อมในขณะนี้..."
                    }
                    type="submit"
                    className="p-5 rounded-lg border-[1px] border-white/60 hover:border-primary/60 hover:bg-black/10 active:bg-white/10 group"
                  >
                    <FaPaperPlane className="text-2xl group-hover:text-primary text-white" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
