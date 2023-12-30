import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Transactions from "./pages/Transactions/Transactions";
import Reports from "./pages/Reports/Reports";
import Goals from "./pages/Goals/Goals";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import Forbidden from "../forbidden";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const App = () => {
  const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/forbidden ");
      }
    }, [navigate]);

    return (
      <>
        <div style={{ display: "flex" }}>
          <SideBar style={{ order: 2 }} />
          <div style={{ flexGrow: 1, order: 1 }}>
            <NavBar />
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Forbidden" element={<Forbidden />} />

        <Route path="/" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route
            path="/Goals"
            element={
              <ProtectedRoute element={<Goals />} role="financial manager" />
            }
          />
          <Route
            path="/Transactions"
            element={
              <ProtectedRoute element={<Transactions />} role="accountant" />
            }
          />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Reports" element={<Reports />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute element={<Users />} role="admin" />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
