import React, { useState, useEffect } from "react";
import { height } from "@mui/system";
import {
  Typography,
  Paper,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Grid, CircularProgress } from "@mui/material";
import SingleDisplay from "./SingleComp/SingleDisplay";
import ImGG from "./MANE.png";
import "./Questions.css";

const Questions = () => {
  const [isload, setisload] = useState(true);
  const [questions, setquestions] = useState([]);
  const [questionscount, setquestionscount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [recn, setrecn] = useState(1);
  const [viewsort, setviewsort] = useState(1);

  const navigate = useNavigate();

  const getallquestions = async (pagenumber, recent, sort) => {
    const response = await fetch(
      `http://localhost:1337/questions/all?page=${pagenumber}&recency=${recent}&viewsort=${sort}`,
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
      setquestionscount(data.questions.length);
      //   alert(data.pagination.pageCount);
      //   alert(
      //     "Page Count is " +
      //       data.pagination.count +
      //       " and Page is " +
      //       data.pagination.pageCount
      //   );

      setPageCount(data.pagination.pageCount);

      setisload(false);
    } else {
      toast.error("No Questions Found");
    }
  };

  const getmostrecent = async () => {
    // const response = await fetch(
    //   "http://localhost:1337/questions/most-recent",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const data = await response.json();
    // if (data.status == "ok") {
    //   setquestions(data.questions);
    //   setquestionscount(data.questions.length);
    //   setisload(false);
    // } else {
    //   toast.error("No Questions Found");
    // }

    getallquestions(page, -1, 1);
  };

  const getmostviewed = async () => {
    // const response = await fetch(
    //   "http://localhost:1337/questions/most-viewed",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const data = await response.json();
    // if (data.status == "ok") {
    //   setquestions(data.questions);
    //   setquestionscount(data.questions.length);
    //   setisload(false);
    // } else {
    //   toast.error("No Questions Found");
    // }

    getallquestions(page, 1, -1);
  };

  // const getmostanswered = async () => {
  //   const response = await fetch(
  //     "http://localhost:1337/questions/most-answered",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await response.json();
  //   if (data.status == "ok") {
  //     setquestions(data.questions);
  //     setquestionscount(1);
  //     setisload(false);
  //   } else {
  //     toast.error("No Questions Found");
  //   }
  // };

  //   function handlePrevious() {
  //     setPage((prevPage) => {
  //       if (prevPage === 1) {
  //         return prevPage;
  //       }
  //       return prevPage - 1;
  //     });
  //   }

  //   function handleNext() {
  //     setPage((prevPage) => {
  //       if (prevPage === pageCount) {
  //         return prevPage;
  //       }
  //       return prevPage + 1;
  //     });
  //   }
  function handlePrevious() {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      if (newPage < 1) {
        return 1;
      }
      return newPage;
    });
  }

  function handleNext() {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      if (newPage > pageCount) {
        return pageCount;
      }
      return newPage;
    });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        getallquestions(page, recn, viewsort);
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [page]);
  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <Typography
          variant="h2"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <strong>All Questions </strong>
        </Typography>
      </div>

      <div className="conty" style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="lefty"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 3,
            marginLeft: "-20px",
          }}
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
              <div
                className="pagination"
                style={{
                  flexDirection: "row",
                  marginLeft: "60px",
                  marginTop: "30px",
                }}
              >
                <Button
                  disabled={page === 1}
                  // variant="outlined"
                  variant="contained"
                  color="secondary"
                  onClick={handlePrevious}
                >
                  <Typography variant="h6">Previous</Typography>
                </Button>

                <Button>
                  <strong>{page}</strong>
                </Button>

                <Button
                  disabled={page === pageCount}
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                >
                  <Typography variant="h6">Next</Typography>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="centry"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            marginLeft: "-40px",
          }}
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
                {questionscount == 0 ? (
                  <>
                    <Typography variant="h3">
                      <strong>No Questions Found</strong>
                    </Typography>
                  </>
                ) : (
                  <>
                    {questions?.map((post) => (
                      <div style={{ marginBottom: "-20px" }}>
                        <SingleDisplay post={post} />
                      </div>
                    ))}
                  </>
                )}
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
            style={{ padding: "20px", position: "sticky", top: "0" }}
          >
            <Typography variant="h6" style={{ textAlign: "center" }}>
              <strong>Sponsored Ads</strong>

              <div className="featured-content">
                <div>
                  <img src={ImGG} width={350} height={600} />
                </div>
              </div>
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

      {/* <div className="pagination" style={{ flexDirection: "row" }}>
        <Button
          disabled={page === 1}
          variant="outlined"
          onClick={handlePrevious}
        >
          <Typography variant="h6">Previous</Typography>
        </Button>

        <Button>
          <strong>{page}</strong>
        </Button>

        <Button
          disabled={page === pageCount}
          variant="outlined"
          onClick={handleNext}
        >
          <Typography variant="h6">Next</Typography>
        </Button>
      </div> */}
    </div>
  );
};

export default Questions;
