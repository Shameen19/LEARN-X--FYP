import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Avatar,
  Divider,
} from "@mui/material/";
import { DateTime } from "luxon";
import { FaRegClock, FaRegEye } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import InfoIcon from "@material-ui/icons/Info";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./single.css";

const SingleDisplay = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [usename, setusename] = useState("");
  const dateTime = DateTime.fromISO(post.createdAt, {
    zone: "Asia/Karachi",
  });
  const relativeTime = dateTime.toRelative();

  const navigate = useNavigate();

  useEffect(() => {
    getusername();
  }, []);
  const getTimeElapsed = (question) => {
    const createdAt = new Date(question.createdAt);
    const now = new Date();

    const timeDiff = Math.abs(now - createdAt);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };
  const getusername = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/questions/getusername/${post.uemail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "ok") {
        console.log("The user is" + data.user);
        setusename(data.user.name);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // function getRandomDarkColor() {
  //   // Generate random RGB values within a specific range
  //   var red = Math.floor(Math.random() * 56); // 0-55
  //   var green = Math.floor(Math.random() * 56); // 0-55
  //   var blue = Math.floor(Math.random() * 56); // 0-55

  //   // Convert RGB to hexadecimal representation
  //   var color =
  //     "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);

  //   return color;
  // }

  // function componentToHex(component) {
  //   var hex = component.toString(16);
  //   return hex.length === 1 ? "0" + hex : hex;
  // }
  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    // history.push(`/posts/${post._id}`);
    navigate(`/questions/${post._id}`);
  };
  return (
    <div style={{ marginLeft: "10px", padding: "25px" }}>
      <>
        <div onClick={openPost}>
          <Card
            style={{
              padding: "25px",
              minHeight: "200px",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
            }}
            className="job-card"
          >
            <CardContent>
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <FaRegClock style={{ marginRight: "5px" }} />
                  <Typography
                    variant="body2"
                    style={{
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    <strong>{moment(post.createdAt).fromNow()}</strong>
                  </Typography>
                </div>
                {user?.email === post?.uemail && (
                  <div name="edit">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{ color: "black" }}
                      size="small"
                    >
                      <MoreHorizIcon fontSize="default" />
                    </Button>
                  </div>
                )}
              </div>
              <Divider style={{ margin: "8px 0" }} /> */}
              <Typography
                variant="h5"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h6"
                  className="headtitle"
                  style={{
                    fontSize: "20px",
                    fontFamily: "Google Sans",

                    fontWeight: "500",
                  }}
                >
                  {post.title}
                </Typography>
              </Typography>
              <Divider style={{ margin: "8px 0" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  // alt={user?.result.name}
                  // src={user?.result.imageUrl}
                  style={{ backgroundColor: "purple" }}
                >
                  {usename.charAt(0)}
                </Avatar>

                <Typography
                  variant="body2"
                  className="usertitle"
                  style={{
                    marginLeft: "5px",
                    fontFamily: "Roboto",
                    fontSize: "15px",
                  }}
                >
                  <strong>{usename}</strong>
                </Typography>
              </div>

              <Divider style={{ margin: "8px 0" }} />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  margin: "8px -4px",
                  alignItems: "center",
                }}
              >
                {post.tags.map((tag) => (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{
                      // backgroundColor: "#e0e0e0",
                      backgroundColor: generateRandomColor(),
                      padding: "2px 8px",
                      margin: 4,
                      borderRadius: 4,
                      color: "white",
                      fontFamily: "Poppins",
                    }}
                    className="tagy"
                  >
                    # {tag}
                  </Typography>
                ))}
              </div>
            </CardContent>
            <CardActions>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Button style={{ color: "black", backgroundColor: "black" }}>
                    <Typography variant="body2">
                      <strong style={{ color: "white" }}>Answer</strong>
                    </Typography>
                  </Button>
                </div>
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FaRegEye style={{ color: "black" }} />
                  <Typography style={{ marginLeft: "10px" }}>
                    {post.totalviews}
                  </Typography>
                </div>
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdQuestionAnswer style={{ color: "black" }} />
                  <Typography style={{ marginLeft: "10px" }}>
                    {post.answers.length}
                  </Typography>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </>
    </div>
  );
};

export default SingleDisplay;
