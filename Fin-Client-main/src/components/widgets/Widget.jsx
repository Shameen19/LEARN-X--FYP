import React from "react";
import "./widgets.scss";
import { Link } from "react-router-dom";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Widget = ({ type }) => {
  let data;
  var credits = 25630;
  var open_cases = 9;
  var total_asked = 54;
  var answered = 23;
  switch (type) {
    case "tquestion":
      data = {
        title: "Total Questions",
        value: "1.2k",
        icon: (
          <MarkChatReadIcon
            sx={{ fontSize: 55, color: "purple" }}
            classname="icon"
          />
        ),
        link: "/questions",
      };
      break;
    case "tanswer":
      data = {
        title: "Answers Obtained",
        value: "1.2k",
        icon: (
          <MenuBookIcon
            sx={{ fontSize: 55, color: "orange" }}
            classname="icon"
          />
        ),
        link: "/answers",
      };
      break;
    case "credits":
      data = {
        title: "Available Credits",
        icon: (
          <MonetizationOnIcon
            sx={{ fontSize: 55, color: "green" }}
            classname="icon"
          />
        ),
        link: "/credits",
      };
      break;
    case "support":
      data = {
        title: "Opened Cases",
        value: "1.2k",
        icon: (
          <SupportAgentIcon
            sx={{ fontSize: 55, color: "blue" }}
            classname="icon"
          />
        ),
        link: "/support",
      };
      break;
    default:
      data = {
        title: "T Questions",
        value: "1.2k",
        icon: (
          <MarkChatReadIcon
            sx={{ fontSize: 55, color: "purple" }}
            classname="icon"
          />
        ),
        link: "/questions",
      };
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="titlee">{data.title}</span>
        <span className="counter">{credits}</span>
        <span className="link">
          <Link to={data.link} style={{ textDecoration: "none" }}>
            See More
          </Link>
        </span>
      </div>
      <div className="right">
        <div className="iconz">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
