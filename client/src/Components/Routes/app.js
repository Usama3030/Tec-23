import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./index";
import Login from "../Login/Login";

function App() {
  return (
    <BrowserRouter>
      <div
        className="container-fluid min-vh-100"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="row">
          <div className="col">
            <Routes>
              <Route exact path="/" element={<Login />} />
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
      <div>
        {
          //(typeof backendData.users === 'undefined') ? (
          //<p>loading..</p>
          // ): (
          //  backendData.users.map((users, i) =>(
          //  <p key={i}>{users}</p>
          //))
          //);
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
