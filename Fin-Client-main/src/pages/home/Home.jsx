import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widget";
import Table from "../../components/table/Table";
import QTable from "../../components/qtable/Table";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import { ToastContainer, toast } from "react-toastify";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        const username1 = localStorage.getItem("username");
        setUsername(username1);
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, []);
  return (
    <div>
      <div>
        <div>
          <div className="main-title">
            <h1>Good Morning,</h1>
            <h1 className="user_name">{username}</h1>
          </div>

          <Grid spacing={3}>
            <div className="widgets">
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Widget type="tquestion" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Widget type="tanswer" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Widget type="credits" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Widget type="support" />
              </Grid>
            </div>
          </Grid>
          <div className="featured-content">
            <div className="listContainer">
              <div className="tablecontainer">
                <div className="t_title">
                  <WhatshotIcon sx={{ fontSize: 30, color: "red" }} />
                  <div className="listTitle">Top Domains This Week</div>
                </div>

                <Table />
              </div>
            </div>
            <div className="t-ques">
              <div className="t_title">
                <WhatshotIcon sx={{ fontSize: 30, color: "red" }} />
                <div className="listTitle">Top Questions This Week</div>
              </div>{" "}
              <QTable />
            </div>
          </div>

          <div className="grid-table"></div>

          <ToastContainer
            position="top-right"
            autoClose={20000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
