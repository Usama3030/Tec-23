import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import { IoIosArrowBack, IoIosArrowForward, IoMdCreate } from "react-icons/io";

const ListPage = () => {
  const navigate = useNavigate();

  const [userChecklists, setUserChecklists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [newChecklistId, setNewChecklistId] = useState(null);

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

  const colorMapping = {
    red: "bg-red-200",
    orange: "bg-orange-200",
    // yellow: "bg-CardsBackground-800",
    // red: "bg-CardsBackground-900",
    yellow: "bg-yellow-200",
    green: "bg-CardsBackground-600",
    gray: "bg-gray-100",
    // Add more color mappings as needed
  };
  const borderColorMapping = {
    red: "border-red-300 border-2",
    orange: "border-orange-300 border-2",
    yellow: "border-yellow-300 border-2",
    green: "border-green-300 border-2",
    gray: "border-gray-500 border-2",
    // Add more color mappings as needed
  };

  const TextColorMapping = {
    red: "text-red-700",
    orange: "text-orange-700",
    yellow: "text-yellow-600",
    green: "text-green-700",
    gray: "text-gray-800",
    // Add more color mappings as needed
  };

  const getColorForScore = (score) => {
    for (const entry of userChecklists) {
      if (entry.checklistTypeID && entry.checklistTypeID.rangeConfigrations) {
        for (const config of entry.checklistTypeID.rangeConfigrations) {
          if (score >= config.min && score <= config.max) {
            return config.color;
          }
        }
      }
    }
    return "gray";
  };

  const getMappedColor = (originalColor) =>
    colorMapping[originalColor] || originalColor;

  const getMappedBorderColor = (originalColor) =>
    borderColorMapping[originalColor] || "border-gray-500 border-2";
  const getTextMappedColor = (originalColor) =>
    TextColorMapping[originalColor] || originalColor;

  const handleEditClick = async (entry) => {
    try {
      const newId = entry._id; // Get the id by
      setNewChecklistId(newId);
      Cookies.set("newChecklistId", newId);
      console.log("newId", newId);
      // Fetch data from the backend for the selected checklist
      // const response = await axios.get(`${process.env.REACT_APP_NODE_API}/api5/getAlreadyChecklistData/${newId}`);
      // const checklistFilledData = response.data;
      // console.log("checklistData", checklistFilledData);

      navigate("/home", {
        state: {
          formData: {
            type: entry.checklistTypeID._id,
          },
          checklistTypeId: entry.checklistTypeID._id,
          // checklistTypeId: entry._id,
        },
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
    <div className="min-h-screen absolute bg-gray-800 w-full mx-1 flex flex-col">
      {" "}
      {/* mx-2 md:mx-1 */}
      <Navbar />
      {/* <div className="container mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md"> */}
      <div className="List flex-1 mx-auto px-4 w-full bg-white">
        <div className="body-container p-6 mx-auto">
          <div className="body-content bg-white shadow-md rounded-md p-6 h-auto md:h-full">
            <div className="form-header mb-6 mt-6">
              <h3 className="font-bold text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
                Dashboard
              </h3>
            </div>
            <div className="button_wrapper flex justify-end mb-4">
              <button
                className="button_common bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={navigateToForm}
              >
                Create
              </button>
            </div>

            {/* New content div for a Data look */}
          </div>
          <div className="professional-content mt-1 p-6 h-80">
            {window.innerWidth <= 768 ? (
              // Mobile view
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {renderedData.map((entry, index) => (
                  <div
                    key={index}
                    className={`rounded-md shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg w-full lg:w-96 relative 
                   ${getMappedColor(getColorForScore(entry.score))}
                   ${getMappedBorderColor(getColorForScore(entry.score))}
                 `}
                  >
                    {/* Top right fixed button */}
                    <button
                      className="absolute top-2 right-2 bg-transparent text-gray-600 hover:text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleEditClick(entry)}
                    >
                      <IoMdCreate />
                    </button>

                    {/* First Row */}
                    <div className="p-4 flex flex-row justify-between items-center">
                      <div className="text-sm font-bold font-serif text-black mb-1 pl-2 pr-2">
                        {entry.checklistTypeID?.type}
                      </div>
                      <div className="text-sm font-serif text-gray-900 mb-1 pl-2 pr-2">
                        {entry.AssignedUserId?.name || "Null"}
                      </div>
                      <div className="text-sm font-serif text-gray-800 mb-1 pl-2 pr-2">
                        {entry.Status || "Null"}
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="p-4 flex flex-row justify-between items-center">
                      <div className="text-sm font-serif text-black pl-2 pr-2">
                        {entry.businessID?.name}
                      </div>
                      <div className="text-sm font-serif text-gray-800 pl-2 pr-2">
                        {new Date(entry.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </div>
                      <div
                        className={`text-sm font-serif font-semibold pl-2 pr-2
                      ${getTextMappedColor(getColorForScore(entry.score))}
                      `}
                      >
                        {Number.isInteger(entry.score)
                          ? entry.score
                          : entry.score.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              //Desktop View
              <div className="grid grid-cols-1 gap-4 p-4">
                {renderedData.map((entry, index) => (
                  <div
                    key={index}
                    className={`rounded-md shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg w-full lg:w-96 relative 
                    ${getMappedColor(getColorForScore(entry.score))}
                    ${getMappedBorderColor(getColorForScore(entry.score))}
                  `}
                  >
                    <div className="p-4 flex flex-col relative">
                      {/* First Row */}
                      <div className="mb-4 flex justify-between items-center">
                        <div className="text-md font-bold font-serif text-black mb-1 pl-2 pr-2">
                          <span className="text-gray-700 font-bold">
                            ChecklistType:
                          </span>{" "}
                          {entry.checklistTypeID?.type}
                        </div>
                        <div className=" text-lg font-serif">
                          <span className="text-gray-700">Assigned User:</span>{" "}
                          {entry.AssignedUserId?.name || "Null"}
                        </div>
                        <div className=" text-lg font-serif">
                          <span className="text-gray-700">Status:</span>{" "}
                          {entry.Status || "Null"}
                        </div>
                        <div>
                          {/* Edit Button */}
                          <button
                            className="absolute top-2 right-2 bg-transparent text-gray-600 hover:text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
                            onClick={() => handleEditClick(entry)}
                          >
                            <IoMdCreate />
                          </button>
                        </div>
                      </div>
                      {/* Second Row */}
                      <div className="mb-1 flex justify-between items-center">
                        <div className="font-serif text-md">
                          <span className="text-gray-700">Business Name:</span>{" "}
                          {entry.businessID?.name}
                        </div>
                        <div className="font-serif text-md">
                          <span className="text-gray-700">Due Date:</span>{" "}
                          {new Date(entry.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </div>
                        {/* <div className="text-sm font-bold text-orange-800 mb-1 pl-2 pr-2"> */}
                        <div
                          className={` font-serif font-semibold text-lg
                    ${getTextMappedColor(getColorForScore(entry.score))}
                  `}
                        >
                          <span className="">Score:</span>{" "}
                          {Number.isInteger(entry.score)
                            ? entry.score
                            : entry.score.toFixed(1)}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
              //   {renderedData.map((entry, index) => (
              //     <div
              //       key={index}
              //       className="bg-white rounded-md shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-300"
              //       style={{ backgroundColor: getColorForScore(entry.score) }}
              //     >
              //       <div className="p-4 flex flex-col justify-between h-full">
              //         <div>
              //           <h2 className="text-lg font-semibold text-gray-800 mb-2">
              //             {entry.businessID?.name}
              //           </h2>
              //           <p className="text-sm text-gray-600 mb-2">
              //             <span className="font-bold">Checklist Type:</span>{" "}
              //             {entry.checklistTypeID?.type}
              //           </p>
              //           <p className="text-sm text-gray-600 mb-2">
              //             <span className="font-bold">Assigned User:</span>{" "}
              //             {entry.AssignedUserId?.name || "Null"}
              //           </p>
              //           <p className="text-sm text-gray-600 mb-2">
              //             <span className="font-bold">Status:</span>{" "}
              //             {entry.Status || "Null"}
              //           </p>
              //         </div>
              //         <div className="flex justify-between items-center mt-4">
              //           <div className="text-sm text-gray-600">
              //             <span className="font-bold">Due Date:</span>{" "}
              //             {new Date(entry.dueDate).toLocaleDateString("en-US", {
              //               year: "numeric",
              //               month: "2-digit",
              //               day: "2-digit",
              //             })}
              //           </div>
              //           <div className="text-lg font-bold text-white">
              //             <span className="text-gray-200">Score:</span>{" "}
              //             {Number.isInteger(entry.score)
              //               ? entry.score
              //               : entry.score.toFixed(1)}
              //           </div>
              //           <button
              //             className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
              //             onClick={() => handleEditClick(entry)}
              //           >
              //             <IoMdCreate />
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   ))}
              // </div>
            )}

            <div className="flex items-center justify-between p-4">
              <span className="text-gray-700">{currentPage}</span>
              <div className="flex items-end space-x-1">
                <button
                  className="btn_pagination text-xs"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <IoIosArrowBack /> Previous
                </button>
                <button
                  className="btn_pagination text-xs"
                  onClick={handleNextPage}
                  disabled={indexOfLastEntry >= userChecklists.length}
                >
                  Next <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
          {/* <div className="professional-content">
            <h3> hii</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
