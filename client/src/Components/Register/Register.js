import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
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

  // const signupHandler = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validateForm(user));
  //   setIsSubmit(true);
  //   // if (!formErrors) {
  //   //   setIsSubmit(true);
  //   // }
  // };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //     axios.post("http://localhost:8080/api/signup", user).then((res) => {
  //       alert(res.data.message);
  //       navigate("/login", { replace: true });
  //     });
  //   }
  // }, [formErrors]);

  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_NODE_API}/api/signup`, user);
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/login", { replace: true });
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
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={changeHandler}
            value={user.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          <input
            type="text"
            name="business"
            id="business"
            placeholder="Business"
            onChange={changeHandler}
            value={user.business}
          />
          <p className={basestyle.error}>{formErrors.business}</p>
          <input
            type="text"
            name="roles"
            id="roles"
            placeholder="Role"
            onChange={changeHandler}
            value={user.roles}
          />
          <p className={basestyle.error}>{formErrors.roles}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};
export default Register;
