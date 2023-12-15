import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../../Components/Navbar";
import newUserIcon from "../../../assets/check-list.png";

function AssignTask() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "", // Retrieve userName from localStorage
    userId: localStorage.getItem("userId") || "",
    assignTo: "",
    type: "",
    businessName: "",
    buildingName: "",
    dueDate: "",
  });
  const [businesses, setBusinesses] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [assignTos, setAssignTos] = useState([]);
  const [checklistTypes, setChecklistTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkSchemas = async () => {
    try {
      // Check if any of the form fields are empty
      const errors = {};
      if (!formData.businessName) {
        errors.businessName = "Business Name is required.";
      }
      if (!formData.buildingName) {
        errors.buildingName = "Building Name is required.";
      }
      if (!formData.assignTo) {
        errors.assignTo = "Name is required.";
      }
      if (!formData.type) {
        errors.type = "Checklist Type is required.";
      }
      if (!formData.dueDate) {
        errors.dueDate = "Select Due Date!";
      }

      // Set formErrors state to display errors
      setFormErrors(errors);

      if (
        !formData.businessName ||
        !formData.buildingName ||
        !formData.assignTo ||
        !formData.dueDate ||
        !formData.type
      ) {
        // Handle case when required fields are empty
        console.log("Required fields are empty.");
      } else {
        axios
          .post(`${process.env.REACT_APP_NODE_API}/api6/savetask`, {
            userId: formData.userId,
            AssignedUserId: formData.assignTo,
            dueDate: formData.dueDate,
            checklistTypeID: formData.type,
            businessID: formData.businessName,
            buildingID: formData.buildingName,
            Status: "Pending",
          })
          .then((response) => {
            console.log("Response data:", response.data);
            console.log("Data added successfully");
            alert(response.data.message);
            navigate("/dashboard", { replace: true });
            console.log(response.data.checklistId);
          })
          .catch((error) => {
            console.error("Error", error);
          });

        console.log("Selected User Name:", formData.assignTo);
        console.log("Selected Checklist Type:", formData.type);
        console.log("Selected Business:", formData.buildingName);
        console.log("Selected Building:", formData.businessName);
        console.log("Selected Due Date:", formData.dueDate);
        console.log("Selected Admin:", formData.name);
      }
    } catch (error) {
      console.error("Error in checkSchemas:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api6/assign`)
      .then((res) => {
        console.log(res.data);
        setAssignTos(res.data.usersData);
        setChecklistTypes(res.data.checklistData);
        setBusinesses(res.data.businessData);
        setBuildings(res.data.buildingData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-800 overflow-hidden w-full mx-1 ">
        {" "}
        {/* mx-2 md:mx-1 */}
        <Navbar />
        {/* <div className="container mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md"> */}
        <div>
          <div className="container mx-auto mt-10 px-4 h-full w-4/6">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3 flex items-center  justify-center p-4 inline-block">
                      {/* Add icon or image here */}
                      <img
                        src={newUserIcon}
                        alt="New User Icon"
                        className="mr-2 h-9 w-9"
                      />
                      <h6 className="text-blueGray-500 text-sm font-bold">
                        Assign Task to User
                      </h6>
                    </div>
                    <hr className="mt-10 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      {/* <small>Or sign up with credentials</small> */}
                    </div>
                    <form>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {/* Admin */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="name"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Admin:
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.name}
                          </p>
                        </div>

                        {/* User's Name */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="assignTo"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            User's Name:
                          </label>
                          <select
                            name="assignTo"
                            value={formData.assignTo}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Select a User</option>
                            {assignTos.map((assign, index) => (
                              <option key={index} value={assign._id}>
                                {assign.name}
                              </option>
                            ))}
                          </select>
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.assignTo}
                          </p>
                        </div>

                        {/* Checklist Type */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="type"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Checklist Type:
                          </label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Select a Checklist Type</option>
                            {checklistTypes.map((checklistType, index) => (
                              <option key={index} value={checklistType._id}>
                                {checklistType.type}
                              </option>
                            ))}
                          </select>
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.type}
                          </p>
                        </div>
                        {/* business Name */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="businessName"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Business:
                          </label>
                          <select
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Select a Business</option>
                            {businesses.map((business, index) => (
                              <option key={index} value={business._id}>
                                {business.name}
                              </option>
                            ))}
                          </select>
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.businessName}
                          </p>
                        </div>
                        {/* buildin gName */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="buildingName"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Building:
                          </label>
                          <select
                            name="buildingName"
                            value={formData.buildingName}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Select a Building</option>
                            {buildings.map((building, index) => (
                              <option key={index} value={building._id}>
                                {building.name}
                              </option>
                            ))}
                          </select>
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.buildingName}
                          </p>
                        </div>
                        {/* buildin gName */}
                        {/* ... (similar structure for other form fields) */}

                        <div className="relative mb-3">
                          <label
                            htmlFor="dueDate"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Due Date:
                          </label>
                          <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.dueDate}
                          </p>
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={checkSchemas}
                          >
                            Register Task
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignTask;
