// import React, { useEffect, useState } from "react";
import CPE from "../assets/icons/cpe.png";
import { IoMenu } from "react-icons/io5";
import { SlClose } from "react-icons/sl";

import Cookies from 'js-cookie';

// new
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Title, Button, Flex } from "@mantine/core";

const Navbar = () => {
  const navbarButton = [
    { title: "Home", url: "#home" },
    { title: "Chat Bot", url: "#chatbot" },
    { title: "FAQ", url: "#faq" },
    { title: "Map", url: "#map" },
    { title: "Comments", url: "#comments" },
  ];

  const [nav, setNav] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      // Check if the user has scrolled down 100px or more
      if (scrollTop > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // login
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  // const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const setCookie = (name, studentId) => {
    Cookies.set(name, studentId, { expires: 7, path: '/' });
  };

  const getUserInfo = () => {
    const studentId = Cookies.get('studentId') ?? '';
    const cmuAccount = Cookies.get('cmuAccount') ?? '';
    const firstName = Cookies.get('firstName') ?? '';
    const lastName = Cookies.get('lastName') ?? '';

    const token = Cookies.get('token') ?? '';
    
    setUserInfo({
      studentId,
      cmuAccount,
      firstName,
      lastName,
      token,
    })
  };

  async function signIn(authorizationCode) {
    console.log('ssss: ', `${process.env.REACT_APP_API_BASE_URL}/api/v1/cmuOAuth`)
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/cmuOAuth`,
        {},
        {
          params: {
            code: authorizationCode,
          },
          withCredentials: true,
        }
      );
      console.log('test: ', resp)
      console.log('resp.data: ', resp.data)
      return resp.data;
    } catch (err) {
      if (!err.response) {
        setMessage("Cannot connect to API Server. Please try again later.");
      } else if (!err.response.data.ok) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Unknown error occurred. Please try again later.");
      }
    }
  }

  async function logout() {
    Cookies.remove('studentId');
    Cookies.remove('cmuAccount');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('token');

    window.location.href = '/'
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  useEffect(() => {
    if (!code) return;

    const fetchData = async () => {
      const resp = await signIn(code);
      if (resp) {
        console.log('resp: ', resp)
        setUserInfo(resp)
        setCookie('studentId', resp.studentId)
        setCookie('cmuAccount', resp.cmuAccount)
        setCookie('firstName', resp.firstName)
        setCookie('lastName', resp.lastName)
        setCookie('token', resp.token)

        window.location.href = '/'
        // if (resp.itAccountType === "Admin") {
        //   navigate("/admin-dashboard");
        // } else if (resp.itAccountType === "StdAcc") {
        //   navigate("/student-dashboard");
        // } else if (resp.itAccountType === "MISEmpAcc") {
        //   navigate("/instructor-dashboard");
        // } else {
        //   navigate("/");
        // }
      }
    };

    fetchData();
  }, [code]);
  
  return (
    <nav
      className={`flex justify-between fixed top-0 w-full lg:py-5 lg:px-24 px-10 py-3 text-white font-[Relax] z-50 duration-700 ${
        isScrolled ? " bg-black/10 backdrop-blur" : " "
      }`}
    >
      <div className="w-fit flex lg:gap-10 gap-3 items-center">
        <a href="/" className="select-none">
          <img src={CPE} alt="CPE Logo" className="h-6" />
        </a>
        <div className="lg:flex justify-evenly gap-10 items-center hidden ">
          {navbarButton.map((button, i) => (
            <a
              key={i}
              href={button.url}
              className="border-b-[3px] border-opacity-0 border-primary hover:border-opacity-100 duration-300 items-center flex select-none"
            >
              {button.title}
            </a>
          ))}
        </div>
      </div>
      <div className="lg:flex hidden gap-3 select-none">
      <a 
        className="px-3 py-1 rounded-md border-2 border-white border-opacity-0 hover:border-opacity-100 duration-300"
        href='https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=sSGuKKdySjj0savuymnjDfAxP1aC6tmHVRcTTayn&redirect_uri=http://localhost:3000/cmuOAuthCallback&scope=cmuitaccount.basicinfo&state=xyz' >
        <div
          style={!userInfo.studentId ? {
            boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          } : {display: "none"}}
        >
          Sign In
        </div>
      </a>
        {/* <button 
          className="px-3 py-1 rounded-md border-2 border-white border-opacity-0 hover:border-opacity-100 duration-300"
          onClick={() => {handleOAuthLogin()}}
        >
          Sign In
        </button> */}
        <button 
          className="px-3 py-1 rounded-md border-2 hover:bg-white/30 duration-300"
          style={!userInfo.studentId ? {} : {display: "none"}}
        >
          Sign Up
        </button>
        <button 
          className="px-3 py-1 rounded-md border-2 hover:bg-white/30 duration-300"
          style={userInfo.studentId ? {} : {display: "none"}}
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <button className="lg:hidden" onClick={handleNav}>
        <IoMenu className="text-3xl" />
      </button>
      <div
        className={
          nav
            ? "fixed left-0 top-0 justify-center w-full h-screen items-center drop-shadow-2xl z-50 duration-1000 transition-all backdrop-blur-sm bg-[#0f0f0f]"
            : "fixed left-[-150%] top-0 w-[100%] h-screen z-50 duration-700 transition-all"
        }
      >
        <div className="z-50 flex items-center py-5 drop-shadow-lg border-b-[40%] bg-black">
          <div className="flex items-center w-full justify-center px-10">
            <button
              href="/"
              className="flex items-center justify-center text-gray-500 select-none"
            >
              <img src={CPE} alt="CPE Logo" className="h-6" />
            </button>
          </div>
          <SlClose
            onClick={() => setNav(!nav)}
            size={25}
            className="fixed right-0 mx-10 rounded-full cursor-pointer text-red-600 drop-shadow-md"
          />
        </div>
        <div className="flex flex-col rounded-md h-screen p-12 gap-6 select-none">
          {navbarButton.map((button, i) => (
            <a
              key={i}
              href={button.url}
              className="border-b-2 border-opacity-0 border-primary hover:border-opacity-100 duration-300 items-center flex w-fit"
            >
              {button.title}
            </a>
          ))}
          <div className="flex w-full justify-center items-center gap-5 mt-10">
            <div className="flex gap-3 select-none">
              <button 
                className="px-3 py-1 rounded-md border-2 border-white border-opacity-0 hover:border-opacity-100 duration-300"
                onClick={() => {}}
              >
                Sign In
              </button>
              <button className="px-3 py-1 rounded-md border-2 hover:bg-white/30 duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="gpt3__navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#wgpt3">FAQ</a>
          </p>
          <p>
            <a href="#possibility">Chat Bot</a>
          </p>
          <p>
            <a href="#features">Map</a>
          </p>
          <p>
            <a href="#blog">Board</a>
          </p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#wgpt3">FAQ</a>
              </p>
              <p>
                <a href="#possibility">Chat Bot</a>
              </p>
              <p>
                <a href="#features">Map</a>
              </p>
              <p>
                <a href="#blog">Contact Us</a>
              </p>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
