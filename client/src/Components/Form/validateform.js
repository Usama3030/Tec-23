import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import validatestyle from "./validate.module.css";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

function ValidateForm({ userName, userId }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "", // Retrieve userName from localStorage
    userId: localStorage.getItem("userId") || "", // Retrieve userId from localStorage
    businessName: "",
    buildingName: "",
    type: "",
  });
  // const [formData, setFormData] = useState({
  //   name: userName,
  //   userId: userId,
  //   businessName: "",
  //   buildingName: "",
  //   type: "",
  // });
  const [businesses, setBusinesses] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [checklistTypes, setChecklistTypes] = useState([]);
  const [newChecklistId, setNewChecklistId] = useState(null);
  //prevent login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

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
      if (!formData.type) {
        errors.type = "Checklist Type is required.";
      }

      // Set formErrors state to display errors
      setFormErrors(errors);

      if (!formData.businessName || !formData.buildingName || !formData.type) {
        // Handle case when required fields are empty
        console.log("Required fields are empty.");
      } else {
        axios
          .post(`${process.env.REACT_APP_NODE_API}/api5/newdoc`, {
            userID: formData.userId,
            businessID: formData.businessName,
            buildingID: formData.buildingName,
            checklistTypeID: formData.type,
          })
          .then((response) => {
            console.log("Response data:", response.data);
            console.log("Data added successfully");
            const newId = response.data.checklistId; // Get the id by
            setNewChecklistId(newId);
            Cookies.set("newChecklistId", newId);
            console.log(newId);

            // all field sent to home
            navigate("/home", {
              state: {
                formData: {
                  name: formData.name,
                  userId: formData.userId,
                  businessName: formData.businessName,
                  buildingName: formData.buildingName,
                  type: formData.type,
                },
                checklistTypeId: formData.type,
              },
            });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    } catch (error) {
      console.error("Error in checkSchemas:", error);
    }
  };

  useEffect(() => {
    // Fetch business names for the dropdown based on the user
    console.log("Fetching data for username:", formData.name);
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api5/compare`, {
        params: { name: formData.name },

        //name: formData.name,
      })
      .then((res) => {
        console.log(res.data);
        setBusinesses(res.data.businessNames);
        setBuildings(
          res.data.buildingData.map((item) => item.buildings).flat()
        );
        setChecklistTypes(res.data.checklistData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [formData.name]);

  return (
    <div className={validatestyle.register}>
      <h3>Please Provide the following credentials</h3>
      <div>
        <div>
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={formData.name}
            onChange={handleInputChange}
            disabled
          />
          <p className={basestyle.error}>{formErrors.name}</p>
        </div>
        {/* <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            name="userId"
            placeholder=""
            value={formData.userId}
            onChange={handleInputChange}
            disabled
          />
        </div> */}
        <div>
          <label htmlFor="businessName">Business:</label>
          <select
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
          >
            <option value="">Select a Business</option>
            {businesses.map((business, index) => (
              <option key={index} value={business.id}>
                {business.name}
              </option>
            ))}
          </select>
          <p className={basestyle.error}>{formErrors.businessName}</p>
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
          <p className={basestyle.error}>{formErrors.buildingName}</p>
        </div>
        <div>
          <label htmlFor="type">Checklist Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="">Select a Checklist Type</option>
            {checklistTypes?.map((checklistType, index) => (
              <option key={index} value={checklistType._id}>
                {checklistType.type}
              </option>
            ))}
          </select>
          <p className={basestyle.error}>{formErrors.type}</p>
        </div>
        <div>
          <button
            className={validatestyle.button_common}
            onClick={checkSchemas}
          >
            Check
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ValidateForm;
