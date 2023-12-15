import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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

  // const navigateToForm = () => {
  //   console.log("button clicked");
  //   navigate("/list");
  // };

  // const navigateToBuildings = () => {
  //   navigate("/list");
  // };

  return (
    <div className={liststyles["list"]}>
      <div className={liststyles["header-container"]}>
        <div className={liststyles["company-name"]}>Dashboard</div>
        {/* <span> {localStorage.getItem("EMAIL")} </span> */}
        <button
          className={liststyles.button_header}
          onClick={() => {
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
            {/* <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={()=>navigateToForm}
            >
              List of Checklist
            </button>
          </div> */}
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/list"
            >
              <div className={liststyles.card_navigation}>
                List of Checklist
              </div>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/business"
            >
              <div className={liststyles.card_navigation}>
                Create Businesses
              </div>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/assigning"
            >
              <div className={liststyles.card_navigation}>Assign Task</div>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/user"
            >
              <div className={liststyles.card_navigation}>Create Users</div>
            </NavLink>
            {/* <div className={liststyles.card_navigation}>
            <button
              className={liststyles.button_navigation}
              onClick={navigateToBuildings}
            >
              Create Buildings
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
