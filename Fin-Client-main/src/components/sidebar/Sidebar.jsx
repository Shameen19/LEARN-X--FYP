import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WalletIcon from "@mui/icons-material/Wallet";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaBook } from "react-icons/fa";

import "./Sidebar.scss";

const Sidebar = () => {
  const initial_role = localStorage.getItem("role");

  const navigate = useNavigate();
  function logout() {
    toast.error("You Have been Logged Out");
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/auth/login");
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link className="nam2" to="/">
          <span className="logo">Learn</span>
          <span className="logo2">X</span>
        </Link>
      </div>
      <hr />
      {initial_role === "learner" ? (
        <div className="center">
          <p className="title" style={{ color: "black" }}>
            Learner{" "}
          </p>
          <div className="center">
            <ul>
              <p className="title">MAIN </p>
              <Link to="/dashboard">
                <li>
                  <DashboardIcon sx={{ fontSize: 24, color: "purple" }} />
                  <span>Dashboard</span>
                </li>
              </Link>

              <p className="title">Questions </p>
              <Link to="/questions/add">
                <li>
                  <AddCircleOutlineIcon
                    classname="icon"
                    sx={{ fontSize: 24, color: "purple" }}
                  />
                  <span>Ask a New Question</span>
                </li>
              </Link>
              <Link to="/questions/">
                <li>
                  <QuestionAnswerIcon
                    classname="icon"
                    sx={{ fontSize: 24, color: "purple" }}
                  />
                  <span>View All Questions</span>
                </li>
              </Link>
              <li>
                <QueryStatsIcon
                  classname="icon"
                  sx={{ fontSize: 24, color: "purple" }}
                />
                <span>View Stats</span>
              </li>
              <p className="title"> Services </p>
              <li>
                <WalletIcon
                  classname="icon"
                  sx={{ fontSize: 24, color: "purple" }}
                />
                <span>Wallet</span>
              </li>
              <Link to="/myprofile">
                <li>
                  <AccountBoxIcon
                    classname="icon"
                    sx={{ fontSize: 24, color: "purple" }}
                  />
                  <span>Learner Profile</span>
                </li>
              </Link>
              <li onClick={logout}>
                <LogoutIcon
                  classname="icon"
                  sx={{ fontSize: 24, color: "purple" }}
                />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="center">
            <p className="title" style={{ color: "black" }}>
              Mentor{" "}
            </p>
            <div className="center">
              <ul>
                <p className="title">MAIN </p>
                <Link to="/dashboard">
                  <li>
                    <DashboardIcon sx={{ fontSize: 24, color: "purple" }} />
                    <span>Dashboard</span>
                  </li>
                </Link>

                <p className="title">Questions </p>
                <Link to="#">
                  <li>
                    <Diversity3Icon
                      classname="icon"
                      sx={{ fontSize: 24, color: "purple" }}
                    />
                    <span>View Workspaces</span>
                  </li>
                </Link>
                <Link to="/questions/">
                  <li>
                    <QuestionAnswerIcon
                      classname="icon"
                      sx={{ fontSize: 24, color: "purple" }}
                    />
                    <span>View Asked Questions</span>
                  </li>
                </Link>
                <Link to="/answers/">
                  <li>
                    <FaBook
                      classname="icon"
                      style={{ fontSize: 24, color: "purple" }}
                    />
                    <span>My Answers</span>
                  </li>
                </Link>
                <Link to="#">
                  <li>
                    <TrendingUpRoundedIcon
                      classname="icon"
                      sx={{ fontSize: 24, color: "purple" }}
                    />
                    <span>Trending</span>
                  </li>
                </Link>

                <p className="title"> Services </p>
                <li>
                  <WalletIcon
                    classname="icon"
                    sx={{ fontSize: 24, color: "purple" }}
                  />
                  <span>Wallet</span>
                </li>
                <Link to="/myprofile">
                  <li>
                    <AccountBoxIcon
                      classname="icon"
                      sx={{ fontSize: 24, color: "purple" }}
                    />
                    <span>My Profile</span>
                  </li>
                </Link>
                <li onClick={logout}>
                  <LogoutIcon
                    classname="icon"
                    sx={{ fontSize: 24, color: "purple" }}
                  />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      <hr />
    </div>
  );
};

export default Sidebar;
