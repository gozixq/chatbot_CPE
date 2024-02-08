/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import Bot from "../assets/images/chatbot.png";
import { HiMiniChevronDoubleDown } from "react-icons/hi2";

const HeroSection = () => (
  <div
    id="home"
    className="flex flex-col w-full h-screen heroBackground text-white"
  >
    <div className="flex flex-col-reverse gap-5 lg:justify-between lg:flex-row lg:items-center justify-center px-10 lg:px-32 w-full h-full bg-black/30 pt-20">
      <div className="flex flex-col lg:justify-start justify-center w-full">
        <div className="flex flex-col">
          <h1 className="bg-clip-text text-center font-bold text-5xl lg:text-[90px] lg:text-start w-full text-transparent bg-gradient-to-l from-gray-100 from-10% via-gray-200 via-30% to-gray-500 to-90% drop-shadow-lg">
            Welcome to <br className="md:hidden" />
            Chat CPE
          </h1>
          <p className="text-center lg:text-start md:text-lg opacity-70">
            your reliable and always-available resource for exploring the world
            of Computer
            <br className="hidden lg:block" /> Engineering at Chiang Mai
            University!
          </p>
        </div>
      </div>
      <div className="flex lg:justify-end justify-center items-center">
        <img
          src={Bot}
          alt="CPE Bot"
          className="h-auto w-[75%] md:w-[60%] lg:w-[75%]"
        />
      </div>
    </div>
    <div className="flex flex-col w-full justify-center items-center h-fit">
      <a
        href="#chatbot"
        className="flex flex-col items-center animate-bounce duration-1000"
      >
        <p>Get Started</p>
        <HiMiniChevronDoubleDown className="text-xl" />
      </a>
    </div>
  </div>
);

export default HeroSection;
