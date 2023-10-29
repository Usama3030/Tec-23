import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import ListPage from "./Components/List/ListPage";
import ValidateForm from "./Components/Form/validateform";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddBusiness from "./Components/Dashboard/AddBusiness/AddBusiness";

function App() {
  const [userState, setUserState] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userState && userState._id ? (
                <Navigate to="/list" />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business" element={<AddBusiness />} />
          <Route
            path="/validateform"
            element={
              <ValidateForm userName={userState.name} userId={userState._id} />
            } // Pass userName prop
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
