import React from "react";
import { Blog } from "./containers";
import HeroSection from "../src/components/HeroSection";
import ChatBot from "./components/ChatBot";
import { CTA } from "./components";
import Navbar from "./components/Navbar";
import Comments from "./components/Comments";
import FAQ from "./components/FAQ";

import "./App.css";
import Map from "./components/Map";

const App = () => (
  <div className="bg-black h-screen">
    <Navbar />
    <HeroSection />
    <ChatBot />
    <Map />
    <FAQ />
    <Comments />
    {/* <CTA /> */}
    {/* <Blog /> */}

    {/* <div className="fixed bottom-0 left-0 w-full h-1 bg-green-500 sm:bg-yellow-500 md:bg-orange-500 lg:bg-red-500" />
  </div> */}
);

export default App;
