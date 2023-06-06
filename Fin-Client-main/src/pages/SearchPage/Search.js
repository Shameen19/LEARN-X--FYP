import React, { useState, useEffect } from "react";
import DataTable from "../../components/datatable/Datatable";
import Nabvar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Typography } from "@mui/material";
import { Grid, CircularProgress, Button } from "@mui/material";
import { useParams } from "react-router-dom";
// import useStyles from "./styles";
import "./Search.scss";
import QTemp from "../list/QTemp/QTemp";
import { height } from "@mui/system";
import SingleDisplay from "../../pages/AllQuestions/SingleComp/SingleDisplay";
const Search = () => {
  const [isload, setisload] = useState(true);
  const [questions, setquestions] = useState([]);
  // const classes = useStyles();

  const [questionscount, setquestionscount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { query } = useParams();

  const getallquestions = async () => {
    const response = await fetch(
      `http://localhost:1337/questions/se?query=${query}&page=${page}`,
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
      setPageCount(data.pagination.pageCount);
      setisload(false);
    } else {
      alert("Error in Search");
    }
  };
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
    getallquestions();
  }, []);

  //     _id: "6392171f1096433f3ce2d1ad",
  //     title: "hello 11",
  //     description:
  //       "hello hello hello hello hello hello hello hello hello hello hello hello hello hello ",
  //     tags: ["hello", "hello"],
  //     createdAt: "Thu Dec 29 2011 20:14:56 GMT-0600 (CST)",
  //   },
  //   {
  //     _id: "6392171f1096433f3ce2d1af",
  //     title: "hello 12",
  //     description:
  //       "hello hello hello hello hello hello hello hello hello hello hello hello ",
  //     tags: ["hello", "hello"],
  //     createdAt: "Thu Dec 29 2011 20:14:56 GMT-0600 (CST)",
  //   },
  //   {
  //     _id: "6392171f1096433f3ce2d1ae",
  //     title: "hello 13",
  //     description:
  //       "hello hello hello hello hello hello hello hello hello hello hello ",
  //     tags: ["hello", "hello"],
  //     createdAt: "Thu Dec 29 2011 20:14:56 GMT-0600 (CST)",
  //   },
  // ];
  return (
    <div>
      <div>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          <strong>Results for " {query} "</strong>
        </Typography>
      </div>

      <div className="wrapper">
        <div className="LeftBar">
          <div>
            <div className="disp" style={{ position: "sticky", top: "0" }}>
              <div style={{ marginTop: "30px" }}>
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
        </div>

        <div className="center">
          {isload ? (
            <>
              <div>
                <CircularProgress
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
            </>
          ) : (
            <Grid container alignItems="stretch" spacing={3}>
              {questions?.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={12} lg={12}>
                  <SingleDisplay post={post} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        {/* <div className="rightbar">
          <div className="rcomp" style={{ backgroundColor: "grey" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              <strong>Right Side</strong>
            </Typography>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Search;
