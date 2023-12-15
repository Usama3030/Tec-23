import React, { useEffect, useState } from "react";
import validatestyle from "./Assign.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
    <div className={validatestyle.register}>
      <h3>Assign Task to User</h3>
      <div>
        <div>
          <label htmlFor="name">Admin:</label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={formData.name}
            onChange={handleInputChange}
            disabled
          />
          <p className={validatestyle.error}>{formErrors.name}</p>
        </div>
        <div>
          <label htmlFor="userName">User's Name:</label>
          <select
            name="assignTo"
            value={formData.assignTo}
            onChange={handleInputChange}
          >
            <option value="">Select a User</option>
            {assignTos.map((assign, index) => (
              <option key={index} value={assign._id}>
                {assign.name}
              </option>
            ))}
          </select>
          <p className={validatestyle.error}>{formErrors.assignTo}</p>
        </div>
        <div>
          <label htmlFor="type">Checklist Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="">Select a Checklist Type</option>
            {checklistTypes.map((checklistType, index) => (
              <option key={index} value={checklistType._id}>
                {checklistType.type}
              </option>
            ))}
          </select>
          <p className={validatestyle.error}>{formErrors.type}</p>
        </div>
        <div>
          <label htmlFor="businessName">Business:</label>
          <select
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
          >
            <option value="">Select a Business</option>
            {businesses.map((business, index) => (
              <option key={index} value={business._id}>
                {business.name}
              </option>
            ))}
          </select>
          <p className={validatestyle.error}>{formErrors.businessName}</p>
        </div>
        <div>
          <label htmlFor="buildingName">Building:</label>
          <select
            name="buildingName"
            value={formData.buildingName}
            onChange={handleInputChange}
          >
            <option value="">Select a Building</option>
            {buildings.map((building, index) => (
              <option key={index} value={building._id}>
                {building.name}
              </option>
            ))}
          </select>
          <p className={validatestyle.error}>{formErrors.buildingName}</p>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            placeholder=""
            value={formData.dueDate}
            onChange={handleInputChange}
          />
          <p className={validatestyle.error}>{formErrors.dueDate}</p>
        </div>
        <div>
          <button
            className={validatestyle.button_common}
            onClick={checkSchemas}
          >
            Register Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignTask;
