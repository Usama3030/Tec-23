import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
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
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };
  /*
  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:8080/api/login", user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        navigate("/", { replace: true });
      });
    }
  }, [formErrors]);

*/

  const loginHandler = (e) => {
    console.log("button clicked");
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    // For testing purposes, set isValidPassword to true
    const fakeUser = {
      ...user,
      isValidPassword: true,
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(fakeUser);
      // window.alert("Its working... " + user.email);
      try{
        // window.alert("try working... " + user.email);
      axios
        .post(`${process.env.REACT_APP_NODE_API}/api/login`, fakeUser)
        .then((res) => {
          // window.alert("then is working... " + JSON.stringify(res.data));
          if (res.data.error === "User not found") {
            // Handle the case when the email is not found
            setFormErrors({ email: "Email not found" });
            console.log("Email not found");
            alert("Email not found");
          } else {
            // Clear any previous email-related error
            const { user: userData } = res.data;
            const { role } = userData;

            // Store the JWT token in localStorage
            localStorage.setItem("token", userData.token);
            localStorage.setItem("userData", JSON.stringify(userData));

              console.log("userData", userData);

             setUserState(userData);

             localStorage.setItem("userName", userData.name);
             localStorage.setItem("userId", userData._id);
             if (role.includes("admin")) {
              // If user has "admin" role, navigate to the dashboard
              navigate("/dashboard", {
                replace: true,
                state: {
                  userId: userData._id,
                  userName: userData.name,
                },
              });
            } else {
              // If user does not have the "admin" role, navigate to the list
              navigate("/list", {
                replace: true,
                state: {
                  userId: userData._id,
                  userName: userData.name,
                },
              });
            }
            
            // navigate("/list", {
            //   replace: true,
            //   state: {
            //     userId: userData._id,
            //     userName: userData.name,
            //   },
            // });
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error.response.data.error);
        //  window.alert("catch is working... "+ error.message);
        });
      } catch(err){
        // window.alert("116 catch is working... "+ err.message);
      }
    }
  };
  return (
    <div className={loginstyle.loginPage}>
      <div className={loginstyle.login}>
        <form>
          <h1>Login</h1>
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
          <button id="myButton" className={basestyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
        {/* <NavLink to="/signup">Not yet registered? Register Now</NavLink> */}
      </div>
    </div>
  );
};

export default Login;
