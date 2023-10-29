import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liststyles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();  


   //prevent login
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);


 
  const navigateToForm = () => {
    navigate("/list");
  };

  const navigateToBusiness = () => {
    onclick = () => {
        console.log("button clicked");
        navigate("/business");
    }
  };

  const navigateToBuildings = () => {
    navigate("/list");
  };
  const navigateToUsers = () => {
    navigate("/list");
  };


  return (
    <div className={liststyles["list"]}>
      <div className={liststyles["header-container"]}>
      <div className={liststyles["company-name"]}>Dashboard</div>
        {/* <span> {localStorage.getItem("EMAIL")} </span> */}
        <button className={liststyles.button_header}  onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          {" "}
          LOGOUT{" "}
        </button>
      </div>
      <div className={liststyles["body-container"]}>
        <div className={liststyles["body-content"]}>
          <div className={liststyles["form-header"]}>
            <p>Dashboard</p>
          </div>
          <div className={liststyles.body_navigation}>
          <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={navigateToForm}
            >
              List of Checklist
            </button>
          </div>
          <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={navigateToBusiness}
            >
              Create Businesses
            </button>
          </div>
          <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={navigateToBuildings}
            >
              Create Buildings
            </button>
          </div>
          <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={navigateToUsers}
            >
            Create Users
            </button>
          </div>
          </div>
          <div className={liststyles.tableContainer}>
           
          </div>
          <div className={liststyles.pagination}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


