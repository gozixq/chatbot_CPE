import React from "react";
import {
  Footer,
  Blog,
  Possibility,
  Features,
  WhatGPT3,
  Header,
} from "./containers";
import { CTA, Brand, Navbar } from "./components";

import "./App.css";

const App = () => (
  <div className="App">
    <Navbar />
    <div className="gradient__bg"> 
      <Header />
    </div>
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    
  </div>
);

export default App;
