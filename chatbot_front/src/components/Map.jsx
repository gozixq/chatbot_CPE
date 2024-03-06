import React from "react";
import floor4 from "../assets/images/floor4.png";
import floor5 from "../assets/images/floor5.png";

const Map = () => {
  return (
    <div className="flex flex-col py-32 bg-black text-white px-8" id="map">
      <div className="w-full flex justify-center items-center flex-col gap-10">
        <span className="lg:text-5xl font-bold text-3xl text-transparent bg-clip-text w-fit bg-gradient-to-l from-gray-100 from-10% via-gray-200 via-30% to-gray-500 to-90%">
          Map
        </span>
        <div className=" flex lg:gap-24 gap-16 lg:flex-row flex-col">
          <img src={floor4} alt="Floor 4" className="w-[400px]" />
          <img src={floor5} alt="Floor 5" className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Map;
