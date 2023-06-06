import React, { useState, useEffect } from "react";
// import DataTable from "../../components/datatable/Datatable";
// import Nabvar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Grid, CircularProgress } from "@mui/material";
// import useStyles from "./styles";
// import "./List.scss";
import QTemp from "./QTemp/QTemp";
import { height } from "@mui/system";
const List = () => {
  const [isload, setisload] = useState(true);
  const [questions, setquestions] = useState([]);

  const getallquestions = async () => {
    const response = await fetch("http://localhost:1337/questions/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.status == "ok") {
      setquestions(data.questions);
      setisload(false);
    } else {
      alert("Error in Adding Question");
    }
  };

  useEffect(() => {
    getallquestions();
  });

  //   {
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
    <div className="list">
      <div className="listContainer">
        User's Question
        <Grid>
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
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                  <QTemp post={post} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default List;
