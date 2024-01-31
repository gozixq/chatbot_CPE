import React from "react";
import {
  
  Blog,
  Possibility,
  
  WhatGPT3,
  Header,
} from "./containers";
import { CTA,  Navbar } from "./components";

import "./App.css";

const App = () => (
  <div className="App">
    <Navbar />
    <div className="gradient__bg"> 
      <Header />
    </div>
    <WhatGPT3 />
    
    <Possibility />
    <CTA />
    <Blog />
    
  </div>
);

export default App;
