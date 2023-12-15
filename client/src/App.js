import "./App.css";
import React, { useState } from "react";
import Routees from "./Routes/Routes";
import backgroundImage from "./assets/register_bg_2.png";

function App() {
  const [userState, setUserState] = useState({});

  return (
    <>
      {/* <div className="App">
<Routees userState={userState} setUserState={setUserState} />
</div> */}
      <div>
        {/* <div
        className="app flex items-center justify-center w-screen h-screen bg-black"
        style={{
          // backgroundImage:
          //   'url("https://i.pinimg.com/236x/d0/64/5a/d0645a0ce8178eea07e699158cc4f7d0.jpg")',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // or 'contain'
          backgroundPosition: "center",
        }}
      > */}
        <Routees userState={userState} setUserState={setUserState} />
      </div>
    </>
  );
}

export default App;
