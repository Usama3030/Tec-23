// BackgroundPage.js

import React from "react";
import backgroundImage from "../assets/register_bg_2.png";

const BackgroundPage = ({ children }) => {
  return (
    <div
      className="app flex items-center justify-center w-screen h-screen bg-gray-700 with-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundPage;
