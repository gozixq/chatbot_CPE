import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";


const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [apiData, setApiData] = useState([]);

  const [signedInLaew, setsignedInLaew] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/anonymousChat/sheet1"
    )
      .then((response) => response.json())
      .then((data) => {
        const lastFourComments = data.sheet1.slice(-4).reverse();
        setApiData(lastFourComments);})
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle changes in the textarea
  const handleChange = (e) => {
    setComment(e.target.value); // Update the comment state with the new text
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Ensure that a comment is present before making a POST request
    if (comment.trim() !== "") {
      const url = 'https://api.sheety.co/bacafe43412f599ef9dec1348d36337e/cpeFaQsSheets/sheet1';
      const body = {
        sheet1: {
          message: comment, // Use the appropriate property name as per your Sheety setup
          // If your sheet requires id and timestamp, you might need to generate id dynamically or let Sheety auto-generate it
          // timestamp can be the current time
          // id: newId, // Generate or omit if Sheety auto-generates it
          timestamp: new Date().toISOString()
        }
      };
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(json => {
        console.log('Post successful:', json.sheet1);
        // Here you could re-fetch the comments or add the new comment to your local state
        // For now, let's assume you want to re-fetch the comments
      })
      .catch(error => {
        console.error('Error posting new comment:', error);
      });
      
      // Clear the textarea after submission
      setComment("");
    }
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
        
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
              <div className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
              >
                <span className="font-black">Anonymous</span>
                <p>{/*apiData[0].message*/}</p>
                <p className="text-gray-500">{/*apiData[0].timestamp*/}</p>
              </div>
          </div>
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
              <div className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
              >
                <span className="font-black">Anonymous</span>
                <p>{/*apiData[0].message*/}</p>
                <p className="text-gray-500">{/*apiData[0].timestamp*/}</p>
              </div>
          </div>
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
              <div className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
              >
                <span className="font-black">Anonymous</span>
                <p>{/*apiData[0].message*/}</p>
                <p className="text-gray-500">{/*apiData[0].timestamp*/}</p>
              </div>
          </div>
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
              <div className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
              >
                <span className="font-black">Anonymous</span>
                <p>{/*apiData[0].message*/}</p>
                <p className="text-gray-500">{/*apiData[0].timestamp*/}</p>
              </div>
          </div>
        
          <div className="flex flex-col gap-8 justify-between lg:pl-16">
      <form onSubmit={handleSubmit} className="flex gap-5">
        <textarea
          value={comment} // Bind the value of the textarea to the comment state
          onChange={handleChange} // Call handleChange function when the textarea value changes
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