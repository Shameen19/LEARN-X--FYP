import React from "react";
// import "./newsingle.css";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import parser from "html-react-parser";
const NewSingleAnswer = ({ answer }) => {
  return (
    <div>
      <div
        className="wrapper"
        style={{
          padding: "10px",
          borderColor: "green",
          border: "2px solid Green",
        }}
      >
        <div className="container">
          <div className="badge">Expert Answer</div>

          <div className="titlehead">
            <div className="Avatar">
              <Avatar>{answer.answeredby[0].toUpperCase()}</Avatar>
            </div>
            <div
              className="title"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span>{answer.answeredby}</span>
              <span style={{ fontSize: "12px", color: "gray" }}>
                {answer.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSingleAnswer;
