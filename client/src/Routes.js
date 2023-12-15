import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ListPage from "./Components/List/ListPage";
import ValidateForm from "./Components/Form/validateform";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddBusiness from "./Components/Dashboard/AddBusiness/AddBusiness";
import AddUser from "./Components/Dashboard/AddUser/AddUsers";
import AssignTask from "./Components/Dashboard/AssignTask/AssignTask";

function Routees({ userState, setUserState }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userState && userState._id ? (
              userState.role.includes("admin") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/list" />
              )
            ) : (
              <Login setUserState={setUserState} />
            )
          }
        />
        <Route path="/login" element={<Login setUserState={setUserState} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business" element={<AddBusiness />} />
        <Route path="/user" element={<AddUser />} />
        <Route path="/assigning" element={<AssignTask />} />
        <Route
          path="/validateform"
          element={
            <ValidateForm userName={userState.name} userId={userState._id} />
          } // Pass userName prop
        />
      </Routes>
    </Router>
  );
}

export default Routees;
