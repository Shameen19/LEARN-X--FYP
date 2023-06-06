import React, { useState, useEffect } from "react";

import SingleDisplay from "../../AllQuestions/SingleComp/SingleDisplay";
import { ToastContainer, toast } from "react-toastify";
import { Grid, CircularProgress, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./List.scss";
const ViewAnswer = () => {
  const [isload, setisload] = useState(true);
  const [questions, setquestions] = useState([]);
  const [questionscount, setquestionscount] = useState(0);
  const navigate = useNavigate();

  const getmostrecent = async () => {
    const uid = localStorage.getItem("userid");
    const response = await fetch(
      `http://localhost:1337/answers/answeredby-mostrecent/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status == "ok") {
      setquestions(data.questions);

      setisload(false);
    } else {
      toast.error("No Questions Found");
    }
  };

  const getmostviewed = async () => {
    const uid = localStorage.getItem("userid");
    const response = await fetch(
      `http://localhost:1337/answers/answeredby-mostviewed/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status == "ok") {
      setquestions(data.questions);

      setisload(false);
    } else {
      toast.error("No Questions Found");
    }
  };

  const getallquestions = async () => {
    const uid = localStorage.getItem("userid");
    try {
      const response = await fetch(
        `http://localhost:1337/answers/answeredby/${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "ok") {
        setquestions(data.questions);
        setisload(false);
      } else {
        alert("Error in Loading Questions");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        getallquestions();
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, []);

  return (
    <div>
      <div>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          <strong>My Asked Questions</strong>
        </Typography>
      </div>

      <div className="conty" style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="lefty"
          style={{ display: "flex", flexDirection: "column", flex: 3 }}
        >
          <div className="disp" style={{ position: "sticky", top: "0" }}>
            <div style={{ marginTop: "30px" }}>
              <div className="papery">
                <div
                  style={{
                    marginLeft: "50px",
                    marginRight: "20px",
                    padding: "40px",
                    width: "70%",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <div className="filter1">
                    <Typography variant="h5">
                      <strong>Sort By</strong>
                    </Typography>

                    {/* <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={selectedValue}
                        name="radio-buttons-group"
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="dateorder"
                          control={<Radio />}
                          label="Most Recent"
                        />
                        <FormControlLabel
                          value="mviewed"
                          control={<Radio />}
                          label="Most Viewed"
                        />
                        <FormControlLabel
                          value="manswered"
                          control={<Radio />}
                          label="Most Answered"
                        />
                      </RadioGroup>
                    </FormControl> */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        textAlign: "left",
                        alignItems: "left",
                        justifyContent: "left",
                      }}
                    >
                      <Button
                        style={{ marginTop: "10px" }}
                        variant="outlined"
                        onClick={getmostrecent}
                      >
                        <Typography variant="h6">
                          <strong>Most Recent</strong>
                        </Typography>
                      </Button>
                      <Button
                        style={{ marginTop: "10px" }}
                        color="primary"
                        variant="outlined"
                        onClick={getmostviewed}
                      >
                        <Typography variant="h6">
                          <strong>Most Viewed</strong>
                        </Typography>
                      </Button>
                      {/* <Button
                        style={{ marginTop: "10px" }}
                        variant="outlined"
                        onClick={getmostanswered}
                      >
                        <Typography variant="h6">
                          <strong>Most Answered</strong>
                        </Typography>
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="centry"
          style={{ display: "flex", flexDirection: "column", flex: 6 }}
        >
          <div className="questi">
            {isload ? (
              <>
                <div>
                  <CircularProgress
                    style={{
                      display: "flex",
                      flex: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <>
                  {questions?.map((post) => (
                    <div>
                      <SingleDisplay post={post} />
                    </div>
                  ))}
                </>
              </>
            )}
          </div>
        </div>

        <div
          className="righty"
          style={{ display: "flex", flexDirection: "column", flex: 3 }}
        >
          <div
            className="conte"
            style={{ padding: "200px", position: "sticky", top: "0" }}
          >
            <Typography variant="h4" style={{ textAlign: "center" }}>
              <strong>Questions Count</strong>
            </Typography>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
};

export default ViewAnswer;
