import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      // [name]: value,
      [name]: value.trim(),
    }));
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const loginHandler = async (e) => {
    console.log("button clicked");
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_API}/api/login`,
          user
        );

        const { data } = response;
        if (data.error) {
          // Handle specific errors
          handleLoginError(data.error);
        } else {
          handleSuccessfulLogin(data.user);
        }
      } catch (error) {
        handleRequestError(error);
      }
    }
  };

  // const handleLoginError = (errorType) => {
  //   let errorMessage = "";

  //   switch (errorType) {
  //     case "User not found":
  //       errorMessage = "User not found. Please check your email.";
  //       break;
  //     case "User is not verified":
  //       errorMessage = "User is not verified. Please verify your account.";
  //       break;
  //     case "Invalid password":
  //       errorMessage = "Invalid password. Please check your password.";
  //       break;
  //     default:
  //       errorMessage = "An unexpected error occurred. Please try again.";
  //   }

  //   alert(errorMessage);
  // };
  const handleLoginError = (errorType) => {
    if (errorType === "User not found") {
      setFormErrors({ email: "User not found" });
    } else if (errorType === "User is not verified") {
      setFormErrors({ email: "User is not verified" });
    } else if (errorType === "Invalid password") {
      setFormErrors({ password: "Invalid password" });
    } else {
      setFormErrors({ request: errorType });
    }
  };

  // const handleRequestError = (error) => {
  //   console.error("Error logging in:", error);

  //   if (error.response && error.response.data && error.response.data.error) {
  //     alert(error.response.data.error);
  //   } else {
  //     alert("Error logging in. Please try again.");
  //   }
  // };
  const handleRequestError = (error) => {
    console.error("Error logging in:", error);

    if (error.response && error.response.data && error.response.data.error) {
      setFormErrors({ request: error.response.data.error });
    } else {
      setFormErrors({ request: "Error logging in. Please try again." });
    }
  };

  const handleSuccessfulLogin = (userData) => {
    // Handle successful login
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserState(userData);

    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userId", userData._id);

    const { role } = userData;

    if (role.includes("admin")) {
      navigate("/dashboard", {
        replace: true,
        state: {
          userId: userData._id,
          userName: userData.name,
        },
      });
    } else {
      navigate("/list", {
        replace: true,
        state: {
          userId: userData._id,
          userName: userData.name,
        },
      });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={changeHandler}
                      value={user.email}
                    />

                    {formErrors.email && (
                      <p className="text-red-500 mt-2">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={changeHandler}
                      value={user.password}
                    />
                    {formErrors.password && (
                      <p className="text-red-500 mt-2">{formErrors.password}</p>
                    )}
                    {/* <div className="relative w-full mb-3"> */}
                    {formErrors.request && (
                      <p className="text-red-500 mt-2">{formErrors.request}</p>
                    )}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      // onClick={(e) => loginHandler(e)}
                      onClick={loginHandler}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
