import React, { useEffect, useState } from "react";
import "./myfile.css";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { FaRegClock, FaRegEye } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { Card, CardContent, Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Grid, CircularProgress } from "@mui/material";
import SingleDisplay from "./SingleComp/FSingleDisplay";
const UserPersonalization = () => {
  const [isload, setisload] = useState(true);
  const [questions, setquestions] = useState([]);
  const useremail = localStorage.getItem("email");
  const [finalquestion, setfinalquestion] = useState([]);
  const [questionscount, setquestionscount] = useState(0);
  const [userrecentactivity, setuserrecentactivity] = useState([]);

  useEffect(() => {
    fetchuseractivity();
  }, []);

  const fetchuseractivity = async () => {
    const response = await fetch(
      `http://localhost:1337/interests/userinterest/${useremail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status == "ok") {
      //  setquestions(data.questions);
      console.log(data.interestuser.interest);
      setuserrecentactivity(data.interestuser.interest);
      fetchquestions(data.interestuser.interest);
      // alert(userrecentactivity);
      console.log("User's Recent Activity:" + userrecentactivity);
    } else {
      toast.error("No Questions Found");
    }
  };

  const fetchquestions = async (userasked) => {
    try {
      const response = await fetch(`http://localhost:5000/batches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: userasked,
        }),
      });

      const data = await response.json();

      if (data) {
        console.log("User Recommendations" + data.result);
        setquestions(data.result);
        getrecommendedquestions(data.result);
        // console.log(data);
        // setquestions(data);
        // setisload(false);
      }
    } catch (err) {
      console.log("User Personalization Screen" + err.message);
    }
  };

  const getrecommendedquestions = async (questions) => {
    const response = await fetch(
      `http://localhost:1337/questions/getinterest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions,
        }),
      }
    );

    const data = await response.json();

    if (data.status == "ok") {
      console.log("Final Questions" + data.questions);
      setfinalquestion(data.questions);

      // console.log(data);
      // setquestions(data);
      // setisload(false);
    } else {
      console.log("Final Questions error" + data.error);
    }
  };

  return (
    <>
      <div>
        <div className="Heading">
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Based on Recent Activity & Interests
          </Typography>
        </div>

        <div className="cards-actions">
          {finalquestion?.map((post) => (
            <div style={{ marginBottom: "-20px" }}>
              <SingleDisplay post={post} />
            </div>
          ))}
        </div>

        <div className="Heading">
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Based on Interests
          </Typography>
        </div>
        <div className="cards-actions">
          {finalquestion?.map((post) => (
            <div style={{ marginBottom: "-20px" }}>
              <SingleDisplay post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPersonalization;
