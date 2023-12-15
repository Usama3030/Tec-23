import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar";

import newUserIcon from "../../../assets/add-user.png";

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

  // Prevent login
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
      error.name = "Name is required";
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
      error.cpassword = "Confirm password and password should be the same";
    }
    if (!values.business) {
      error.business = "Business is required";
    }
    if (!values.roles) {
      error.roles = "Role is required";
    }
    return error;
  };

  // const signupHandler = async (e) => {
  //   e.preventDefault();
  //   setFormErrors(validateForm(user));
  //   setIsSubmit(true);

  //   if (Object.keys(formErrors).length === 0) {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_NODE_API}/api/signup`,
  //         user
  //       );
  //       if (response.status === 201) {
  //         alert(response.data.message);
  //         navigate("/dashboard", { replace: true });
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 406) {
  //         // Handle "Business not found" error
  //         setFormErrors({
  //           ...formErrors,
  //           business: "Business not found",
  //         });
  //       } else {
  //         // Handle other errors
  //         console.error("Error:", error);
  //         // Display a general error message to the user
  //         alert("An error occurred while registering.");
  //       }
  //     }
  //   }
  // };
  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    const submitForm = async () => {
      if (Object.keys(formErrors).length === 0) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_NODE_API}/api/signup`,
            user
          );
          if (response.status === 201) {
            alert(response.data.message);
            navigate("/dashboard", { replace: true });
          }
        } catch (error) {
          if (error.response && error.response.status === 406) {
            // Handle "Business not found" error
            setFormErrors({
              ...formErrors,
              business: "Business not found",
            });
          } else {
            // Handle other errors
            console.error("Error:", error);
            // Display a general error message to the user
            alert("An error occurred while registering.");
          }
        }
      }
    };

    if (isSubmit) {
      submitForm();
      setIsSubmit(false); // Reset isSubmit after submission
    }
  }, [formErrors, isSubmit, navigate, user]);

  return (
    <>
      <div className="min-h-screen bg-gray-800 w-full mx-1 ">
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
                        Add New User
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
                        {/* Name */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="name"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={changeHandler}
                            value={user.name}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="email"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="@gmail.com"
                            onChange={changeHandler}
                            value={user.email}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="password"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="****"
                            onChange={changeHandler}
                            value={user.password}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                              formErrors.password
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.password && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.password}
                            </p>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="cpassword"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            placeholder="****"
                            onChange={changeHandler}
                            value={user.cpassword}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                              formErrors.cpassword
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.cpassword && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.cpassword}
                            </p>
                          )}
                        </div>

                        {/* Business Name */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="business"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="business"
                            id="business"
                            placeholder="Business"
                            onChange={changeHandler}
                            value={user.business}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150  ${
                              formErrors.business
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.business && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.business}
                            </p>
                          )}
                        </div>

                        {/* Designation */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="roles"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Designation
                          </label>
                          <input
                            type="text"
                            name="roles"
                            id="roles"
                            placeholder="Role"
                            onChange={changeHandler}
                            value={user.roles}
                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                              formErrors.roles
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.roles && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.roles}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={signupHandler}
                        >
                          Register
                        </button>
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
};

export default AddUser;
