import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { AccountCircle, Message } from "@mui/icons-material";
import "./explore.css";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  var mewl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-uqW2WpIYhMfSGng_wN9ILJd67S4Ni9ZRxkV9aaciw&s";

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("/api/mentors"); // Replace with your API endpoint for fetching mentors
        setMentors(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMentors();
  }, []);

  const [searchquery, setsearchquery] = useState("");

  const searchmentors = async (whattosearch) => {
    const response = await fetch(`http://localhost:1337/api/search-mentors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchquery: whattosearch }),
    });

    const data = await response.json();
    if (data.status == "ok") {
      // setMentors(data.mentors);
      // console.log("mentors recevied" + data.searchedmentors);
    } else {
      console.log("Error in fetching record");
    }
  };

  const getmentorratig = async (uemail) => {
    try {
      const response = await fetch(
        `http://localhost:9006/getmentor/${uemail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      return data.totalRating;
    } catch (err) {
      console.log("er");
    }
  };

  const generateRandomColor = () => {
    const colors = ["#FFCC80", "#B2EBF2", "#FF8A80", "#C5E1A5", "#FFAB91"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleSkillsChange = (event) => {
    setsearchquery(event.target.value);
  };

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <TextField
          label="Search Mentors by skills"
          variant="outlined"
          style={{ marginRight: "16px", width: "300px", borderRadius: "20px" }}
          value={searchquery}
          onChange={handleSkillsChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: "120px" }}
          onClick={searchmentors}
        >
          Search
        </Button>
      </div>
      <Grid container spacing={2}>
        {mentors.map((mentor) => (
          <Grid key={mentor._id} item xs={12} sm={6} md={4}>
            <Card className="mentor-card">
              <CardContent>
                <div
                  className="mentor-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    className="mentor-name"
                  >
                    {mentor.name}
                  </Typography>
                  {mentor.picurl != "" ? (
                    <>
                      <Avatar
                        alt={mentor.name}
                        src={mewl}
                        className="mentor-avatar"
                        style={{
                          height: "70px",
                          width: "70px",
                          backgroundColor: generateRandomColor,
                        }}
                      >
                        {mentor.name[0]}
                      </Avatar>
                    </>
                  ) : (
                    <>
                      <Avatar
                        alt={mentor.name}
                        src={mentor.picurl}
                        className="mentor-avatar"
                        style={{
                          height: "70px",
                          width: "70px",
                          backgroundColor: generateRandomColor,
                        }}
                      >
                        {mentor.name[0]}
                      </Avatar>
                    </>
                  )}
                </div>

                <div
                  className="emailuser"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdEmail
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    className="mentor-name"
                    style={{ marginLeft: "10px" }}
                  >
                    {mentor.email}
                  </Typography>
                  {/* {getmentorratig(mentor.email)} */}
                </div>
                <div className="mentor-skills">
                  <Typography style={{}} variant="h6">
                    Skills:
                  </Typography>
                  {mentor.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="skill"
                      style={{ backgroundColor: generateRandomColor() }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mentor-button"
                startIcon={<Message />}
                onClick={() => {
                  window.open(`http://localhost:3006/Chatsy/${mentor._id}`);
                }}
              >
                Message Him
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MentorList;
