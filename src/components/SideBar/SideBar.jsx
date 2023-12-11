import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../SideBar/logo.png";
import iconD from "../SideBar/iconD.png";
import iconT from "../SideBar/iconT.png";
import iconG from "../SideBar/iconG.png";
import iconR from "../SideBar/iconR.png";
import iconU from "../SideBar/iconU.png";
import { jwtDecode } from "jwt-decode";
import "./SideBar.css";

const SideBar = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [userRoles, setUserRoles] = useState("");

  const getUserRoles = () => {
    try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUserRoles(decoded.role);
  }
    catch(e) {
      console.log(e);
  };
  }
  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  return (
    <div className="main">
      <img className="sidebar-logo" src={logo} alt="" />
      <div className="sidebar">
        <div className="sidebar-buttons">
          <Link
            to={"/"}
            onClick={() => handleLinkClick(0)}
            className={selectedLink === 0 ? "selected" : ""}
          >
            <h3 className="dashboard">
              <img className="icon" src={iconD} alt="" />
              <span className="dash">|</span>
              <span className="sidebar-label">Dashboard</span>
            </h3>
          </Link>
          {(userRoles === "accountant" || userRoles === "admin") && (
            <Link
              to={"/Transactions"}
              onClick={() => handleLinkClick(1)}
              className={selectedLink === 1 ? "selected" : ""}
            >
              <h3 className="transactions">
                <img className="icon" src={iconT} alt="" />
                <span className="dash">|</span>
                <span className="sidebar-label">Transactions</span>
              </h3>
            </Link>
          )}
          {(userRoles === "financial manager" || userRoles === "admin") && (
            <Link
              to={"/Goals"}
              onClick={() => handleLinkClick(2)}
              className={selectedLink === 2 ? "selected" : ""}
            >
              <h3 className="Goals">
                <img className="icon" src={iconG} alt="" />
                <span className="dash">|</span>
                <span className="sidebar-label">Goals</span>
              </h3>
            </Link>
          )}
            <Link
              to={"/Reports"}
              onClick={() => handleLinkClick(3)}
              className={selectedLink === 3 ? "selected" : ""}
            >
              <h3 className="Reports">
                <img className="icon" src={iconR} alt="" />
                <span className="dash">|</span>
                <span className="sidebar-label">Reports</span>
              </h3>
            </Link>
          {userRoles === "admin" && (
            <Link
              to={"/Users"}
              onClick={() => handleLinkClick(4)}
              className={selectedLink === 4 ? "selected" : ""}
            >
              <h3 className="Users">
                <img className="icon" src={iconU} alt="" />
                <span className="dash">|</span>{" "}
                <span className="sidebar-label">Users</span>
              </h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
