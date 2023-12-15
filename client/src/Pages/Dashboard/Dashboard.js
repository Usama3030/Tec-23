import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaList, FaBuilding, FaTasks, FaUser } from "react-icons/fa";
import Navbar from "../../Components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  // Prevent login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 w-full mx-1">
      <div className="list mx-auto rounded-lg overflow-hidden shadow-md">
        {/* <Navbar /> */}
        <div className="body-container p-6 mx-auto">
          <div className="body-content">
            <div className="form-header mb-10 mt-10">
              <h3 className="font-bold text-4xl">Dashboard</h3>
            </div>
            <div className="body_navigation grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* NavLink Cards */}
              <NavLinkCard
                to="/list"
                icon={<FaList className="text-4xl mb-2" />}
                title="List of Checklist"
                color="blue"
              />
              <NavLinkCard
                to="/business"
                icon={<FaBuilding className="text-4xl mb-2" />}
                title="Create Businesses"
                color="green"
              />
              <NavLinkCard
                to="/assigning"
                icon={<FaTasks className="text-4xl mb-2" />}
                title="Assign Task"
                color="yellow"
              />
              <NavLinkCard
                to="/user"
                icon={<FaUser className="text-4xl mb-2" />}
                title="Create Users"
                color="indigo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom NavLinkCard component
const NavLinkCard = ({ to, icon, title, color }) => {
  return (
    <NavLink
      className={`card_navigation flex flex-col items-center justify-center bg-${color}-500 hover:bg-${color}-600 text-white p-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md`}
      to={to}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default Dashboard;
