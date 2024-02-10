import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";

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
  const dummyComments = [
    {
      id: 1,
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, provident?",
    },
    { id: 2, comment: "depanlu cok" },
    { id: 3, comment: "di mana sayangku, saya rindu sayangku" },
    {
      id: 4,
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit doloremque dolore modi cupiditate, eaque tempore!",
    },
  ];
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
          {dummyComments.reverse().map((comment, id) => (
            <div
              key={id}
              className=" flex flex-col justify-start items-start border-l-2 border-primary px-5"
            >
              <span className="font-black">Anonymous</span>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
