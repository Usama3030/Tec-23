import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import liststyles from "./List.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ListPage = () => {
  const navigate = useNavigate();

  const [userChecklists, setUserChecklists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [rangeConfigrations, setRangeConfigrations] = useState([]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

   //prevent login
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_NODE_API}/api5/userchecklists`)
        .then((response) => {
          if (!response.ok) {
            console.log("Network response was not ok");
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the API:", data);
          setUserChecklists(data);
        })
        .catch((error) => {
          console.error("Error fetching user checklists:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [currentPage]);

  // const getColorForScore = (score) => {
  //   for (const config of rangeConfigrations) {
  //     if (score >= config.min && score < config.max) {
  //       return config.color;
  //     }
  //   }
  //   return "gray";
  // };
  const getColorForScore = (score) => {
    for (const entry of userChecklists) {
      if (entry.checklistTypeID && entry.checklistTypeID.rangeConfigrations) {
        for (const config of entry.checklistTypeID.rangeConfigrations) {
          if (score >= config.min && score < config.max) {
            return config.color;
          }
        }
      }
    }
    return "gray"; 
  };

 
  const navigateToForm = () => {
    navigate("/validateform");
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderedData = userChecklists.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  return (
    <div className={liststyles["list"]}>
      <div className={liststyles["header-container"]}>
      <div className={liststyles["company-name"]}>Baskan Tech</div>
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
            <p>User List</p>
          </div>
          <div className={liststyles.button_wrapper}>
            <button
              className={liststyles.button_common}
              onClick={navigateToForm}
            >
              Create
            </button>
          </div>
          <div className={liststyles.tableContainer}>
            {window.innerWidth <= 768 ? (
              //mobile view
              renderedData.map((entry, index) => (
                <div key={index} className={liststyles["card"]}   style={{ backgroundColor: getColorForScore(entry.score) }}>
                  <div className={liststyles["card-row"]}>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-user"]}`}
                    >
                      {entry.userID?.name}
                    </div>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-score"]}`}
                    >
                      {Number.isInteger(entry.score) ? entry.score : entry.score.toFixed(1)}
                    </div>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-type"]}`}
                    >
                      {entry.checklistTypeID?.type}
                    </div>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-date"]}`}
                    >
                      {format(new Date(entry.createdAt), "yyyy-MM-dd")}
                    </div>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-business"]}`}
                    >
                      {entry.businessID?.name}
                    </div>
                    <div
                      className={`${liststyles.colMob} ${liststyles["col-building"]}`}
                    >
                      {entry.buildingID?.name}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              //desktop view
              <div className={liststyles.desktopContainer}>
                <div className={liststyles.rowHeader}>
                  <div className={liststyles.col}>Type</div>
                  <div className={liststyles.col}>UserName</div>
                  <div className={liststyles.col}>Company Name</div>
                  <div className={liststyles.col}>Building</div>
                  <div className={liststyles.col}>Date</div>
                  <div className={liststyles.col}>Score</div>
                </div>
                {renderedData
                  .sort((a, b) =>
                    a.businessID?.name > b.businessID?.name ? 1 : -1
                  )
                  .map((entry, index) => (
                    <div key={index} className={liststyles.row} style={{ backgroundColor: getColorForScore(entry.score) }}>
                       {/* style={{ backgroundColor: getColorForScore(entry.score) }} */}
                      <div
                        className={`${liststyles.col} ${liststyles["col-type"]}`}
                      >
                        {entry.checklistTypeID?.type}
                      </div>
                      <div className={liststyles.col}>{entry.userID?.name}</div>
                      <div className={liststyles.col}>
                        {entry.businessID?.name}
                      </div>
                      <div className={liststyles.col}>
                        {entry.buildingID?.name}
                      </div>
                      <div
                        className={`${liststyles.col} ${liststyles["col-date"]}`}
                      >
                        {format(new Date(entry.createdAt), "yyyy-MM-dd")}
                      </div>
                      <div className={liststyles.col}>
                        {Number.isInteger(entry.score) ? entry.score : entry.score.toFixed(1)}
                        </div>
                      {/* <div className={liststyles.col}>{entry.score}{entry.score.toFixed(1)}</div> */}
                       {/* <div className={liststyles.col} style={{ color: getColorForScore(entry.score) }}>
                        {getColorForScore(entry.score)}
                      </div> */}
                      
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className={liststyles.pagination}>
            <span className={liststyles.pageNumber}>{currentPage}</span>
            <button
              className={liststyles.btn_pagination}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <IoIosArrowBack /> Previous
            </button>
            <button
              className={liststyles.btn_pagination}
              onClick={handleNextPage}
              disabled={indexOfLastEntry >= userChecklists.length}
            >
              Next <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;


