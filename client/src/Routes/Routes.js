import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import ListPage from "../Pages/List/ListPage";
import ValidateForm from "../Pages/Form/validateform";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddBusiness from "../Pages/Dashboard/AddBusiness/AddBusiness";
import AddUser from "../Pages/Dashboard/AddUser/AddUsers";
import AssignTask from "../Pages/Dashboard/AssignTask/AssignTask";
import UpdateForm from "../Pages/UpdateForm/UpdateForm";
import BackgroundPage from "./BackgroundPage";
import Navbar from "../Components/Navbar";
import { NotFound } from "../Pages/NotFound/NotFound";
import { useEffect } from "react";

function Routees({ userState, setUserState }) {
  // Function to determine if the current route is the login page
  const isLoginPage = () => {
    return (
      window.location.pathname === "/login" || window.location.pathname === "/"
    );
  };

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            <BackgroundPage>
              {userState && userState._id ? (
                userState.role.includes("admin") ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/list" />
                )
              ) : (
                <Login setUserState={setUserState} />
              )}
            </BackgroundPage>
          }
        /> */}
        <Route
          path="/"
          element={
            <BackgroundPage>
              <Login setUserState={setUserState} />
            </BackgroundPage>
          }
        />

        <Route
          path="/login"
          element={
            <BackgroundPage>
              <Login setUserState={setUserState} />
            </BackgroundPage>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<UpdateForm />} />
        <Route
          path="/list"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <ListPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <AdminElement userState={userState}>
                <Navbar /> <Dashboard />
              </AdminElement>
            </>
          }
        />
        <Route path="/business" element={<AddBusiness />} />
        <Route path="/user" element={<AddUser />} />
        <Route path="/assigning" element={<AssignTask />} />
        <Route
          path="/validateform"
          element={
            <ValidateForm userName={userState.name} userId={userState._id} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function AdminElement({ children, userState }) {
  // console.log("AdminElement is rendering");

  if (!userState || typeof userState !== "object") {
    console.log("User state is not defined or not an object");
    return null;
  }

  // console.log("User state:", userState);

  if (userState.role.includes("admin")) {
    // console.log("User is an admin, rendering children");
    return <>{children}</>;
  } else {
    // console.log("User is not an admin, redirecting to /list");
    // console.log("User roles:", userState.role);
    return <Navigate to={"/list"} />;
  }
}

export default Routees;
