import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";


const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [signedInLaew, setsignedInLaew] = useState(false);
  const [res, setRes] = useState("");

  const fetchData = async () => {
    const url = "https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/anonymousChat/sheet1";
    const res = await axios.get(url);
    setApiData(res.data.sheet1.slice(-4));
  }

  // Ensure that a comment is present before making a POST request
  const postData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Ensure that a comment is present before making a POST request
    if (comment.trim() !== "") {
      const url = "https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/anonymousChat/sheet1";
      
      try {
        // Fetching existing comments to determine the latest ID
        const existingCommentsResponse = await axios.get(url);
        const existingComments = existingCommentsResponse.data.sheet1;
        const latestId = existingComments.length > 0 ? existingComments[existingComments.length - 1].id + 1 : 1;
        
        let data = {
          sheet1: {
            message: comment, 
            timestamp: new Date().toISOString(),
            id: latestId
          }
        };

        // Making a POST request using Axios
        const res = await axios.post(url, data);
        setRes(res);
        console.log('Post successful:', res.data);
      } catch (error) {
        console.error('Error posting new comment:', error);
        // Handle error here (e.g., display error message to the user)
      }
      
      // Clear the textarea after submission
      setComment("");
    }
  };

  useEffect(() => {
    fetchData();
  }, [res])

  // Function to handle changes in the textarea
  const handleChange = (e) => {
    setComment(e.target.value); // Update the comment state with the new text
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
 

  return (
    <div className="lg:py-5 lg:px-24 px-10 py-3 bg-black text-white">
      <div className="flex flex-col gap-10">
        <div className="p-3 lg:p-7 flex justify-between  items-center bg-[#0f0f0f] rounded-lg h-fit">
          {signedInLaew ? (
            <div className="flex justify-between items-center w-full gap-7">
              <textarea
                className="bg-transparent resize-none rounded-md w-full h-16 p-3 focus:outline-none border-[1px] border-white/60 focus:border-primary/60 focus:ring-none"
                placeholder="Write your comment here..."
                value={comment}
                onChange={onChangeHandler}
              />
              <button
                type="submit"
                className="px-4 rounded-lg border-[1px] h-16 border-white/60 hover:border-primary/60 hover:bg-black/10 active:bg-white/10 group"
              >
                Comment
              </button>
            </div>
          ) : (
            <>
              <span className="capitalize">
                Login with CMU account <br className=" md:hidden" /> to access
                our community
              </span>
              <a
                href="/#"
                className="gap-2 flex justify-center items-center md:hover:bg-white/20 px-3 py-2 rounded-lg"
              >
                <p className="hidden md:block">Sign In</p>
                <div className="hover:bg-white/20 hover:md:bg-transparent p-2 md:p-0 rounded-full">
                  <FiLogIn className="text-2xl" />
                </div>
              </a>
            </>
          )}
        </div>
        
        {apiData?.map((val) => (
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
              <div className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
              >
                <span className="font-black">Anonymous</span>
                <p>{val.message}</p>
                <p className="text-gray-500">{val.timestamp}</p>
              </div>
          </div>
        ))}
          
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
      <form onSubmit={postData} className="flex gap-5">
        <textarea
          value={comment} // Bind the value of the textarea to the comment state
          onChange={handleChange} // Call setComment function when the textarea value changes
          placeholder="Write your comment here..."
          className="p-3 rounded-lg border-[1px] border-white/60 focus:border-primary/60 focus:ring-0 focus:ring-primary/10 focus:ring-offset-transparent/10 focus:ring-offset-primary/10 focus:ring-offset-2 focus:outline-none bg-transparent resize-none w-full"
        />
        <button
          type="submit"
          className="p-5 rounded-lg border-[1px] border-white/60 hover:border-primary/60 hover:bg-black/10 active:bg-white/10 group"
        >
          <FaPaperPlane className="text-2xl group-hover:text-primary text-white" />
        </button>
      </form>
    </div>

      </div>
    </div>
  );
};

export default Comments;