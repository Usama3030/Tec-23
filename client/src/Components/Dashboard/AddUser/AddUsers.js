import React, { useEffect, useState } from "react";
import userstyle from "./Users.module.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    business: "",
    roles: "",
  });

   //prevent login
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      error.fname = "Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    if (!values.business) {
      error.business = "Business is required";
    }
    if (!values.roles) {
      error.roles = "Role is required";
    }
    return error;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_NODE_API}/api/signup`, user);
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        if (error.response && error.response.status === 406) {
          // Handle "Business not found" error
          setFormErrors({ ...formErrors, business: "Business not found" });
        } else {
          // Handle other errors
          console.error("Error:", error);
          // Display a general error message to the user
          alert("An error occurred while registering.");
        }
      }
    }
  };
  
  return (
    <>
      <div className={userstyle.user}>
        <form>
          <h1>Create New User</h1>
          <div className={userstyle.user_body}>
          <div className={userstyle.option}>
            <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={changeHandler}
            value={user.name}
          />
          <p className={userstyle.error}>{formErrors.name}</p>
          </div>
          <div className={userstyle.option}>
            <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="@gmail.com"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={userstyle.error}>{formErrors.email}</p>
          </div>
          <div className={userstyle.option}>
            <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="****"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={userstyle.error}>{formErrors.password}</p>
          </div>
          <div className={userstyle.option}>
            <label htmlFor="cpassword">Confirm password</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="****"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={userstyle.error}>{formErrors.cpassword}</p>
          </div>
          <div className={userstyle.option}>
            <label htmlFor="business">Business Name</label>
          <input
            type="text"
            name="business"
            id="business"
            placeholder="Business"
            onChange={changeHandler}
            value={user.business}
          />
          <p className={userstyle.error}>{formErrors.business}</p>
          </div>
          <div className={userstyle.option}>
            <label htmlFor="roles">Designation</label>
          <input
            type="text"
            name="roles"
            id="roles"
            placeholder="Role"
            onChange={changeHandler}
            value={user.roles}
          />
          <p className={userstyle.error}>{formErrors.roles}</p>
          </div>
          <div className={userstyle.option}>
          <button className={userstyle.button_common} onClick={signupHandler}>
            Register
          </button>
          </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddUser;
