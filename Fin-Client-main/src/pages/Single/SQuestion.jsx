import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Avatar,
  Button,
  Grid,
  TextField,
} from "@mui/material/";

import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import withReactContent from "sweetalert2-react-content";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate, Link } from "react-router-dom";
import Answer from "../../components/Answer/Com";
import parser from "html-react-parser";
// import useStyles from "./style";
import "./Sq.css";

const SQuestion = () => {
  const [isload, setisload] = useState(true);
  const [question, setquestion] = useState({});
  const [answers, setanswers] = useState([]);
  const [useranswer, setuseranswer] = useState("");
  const [title, settitle] = useState("");
  const uemail = localStorage.getItem("email");
  const editor = useRef(null);
  const { id } = useParams();
  // const classes = useStyles();
  const navigate = useNavigate();
  const username = "Original One";

  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const getquestion = async () => {
      const response = await fetch(
        `http://localhost:1337/questions/view/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "ok") {
        setquestion(data.question);
        setanswers(data.answers);
        setisload(false);
      } else {
        alert("Error in Adding Question");
      }
    };
    getquestion();
    console.log(question.tags);
  }, []);

  const editquestion = () => {
    navigate(`/questions/edit/${id}`);
  };

  const submitanswer = async () => {
    if (useranswer == "") {
      toast.error("Please Enter the Answer");
    } else {
      const answeredby = localStorage.getItem("username");
      const uemail = localStorage.getItem("email");
      const description = useranswer;
      const uid = localStorage.getItem("userid");
      try {
        const response = await fetch(`http://localhost:1337/answers/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            answeredby,
            uemail,
            uid,
          }),
        });
        const data = await response.json();
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const confdel = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this todo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deletequestion();
      }
    });
  };
  const deletequestion = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/questions/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "deleted") {
        //  setquestion(data.question);
        //  setisload(false);
        alert("Question is Deleted");
        navigate("/questions");
      } else {
        alert("Error in Deleting Question");
      }
    } catch (err) {
      alert("Error Occured while processing the request");
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="top qxqy">
            {isload ? (
              <div>
                {" "}
                <CircularProgress />
              </div>
            ) : (
              <>
                <Grid
                  container
                  spacing={4}
                  elevation={0}
                  style={{ paddingBottom: "40px" }}
                >
                  <Grid item xs={8} sm={7} md={8} lg={8} elevation={0}>
                    <Paper
                      style={{
                        padding: "20px",
                        width: "100%",
                        borderRadius: "15px",
                      }}
                      elevation={1}
                    >
                      <div style={{ marginLeft: "25px", width: "100" }}>
                        <div style={{ marginLeft: "25px", width: "100" }}>
                          <Typography variant="h3" component="h2">
                            {question.title}
                          </Typography>
                          <Typography variant="body1"></Typography>

                          <Divider style={{ margin: "20px 0" }} />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar

                            // alt={user?.result.name}
                            // src={user?.result.imageUrl}
                            >
                              {username.charAt(0)}
                            </Avatar>

                            <Typography
                              variant="h6"
                              style={{ marginLeft: "5px" }}
                            >
                              {username} {""}
                              <span style={{ fontSize: "12px" }}>
                                {moment(question.createdAt).fromNow()}
                              </span>
                            </Typography>
                          </div>
                          <div>
                            <Divider style={{ margin: "8px 0" }} />
                          </div>
                          <div>
                            <Typography style={{ fontSize: "18px" }}>
                              <strong>Actions</strong>
                            </Typography>
                            <div style={{ display: "flex" }}>
                              <Button
                                size="medium"
                                style={{
                                  backgroundColor: "#001242",
                                  color: "white",
                                }}
                                onClick={editquestion}
                              >
                                <EditIcon fontSize="small" color="blue" />{" "}
                                &nbsp; Edit
                              </Button>
                              <Button
                                size="medium"
                                style={{
                                  marginLeft: "10px",
                                  backgroundColor: "#0094C6",
                                  color: "white",
                                }}
                                onClick={confdel}
                              >
                                <DeleteIcon fontSize="small" /> &nbsp; Delete
                              </Button>
                            </div>
                          </div>
                          {/* <Typography
                      gutterBottom
                      variant="h6"
                      color="textSecondary"
                      component="h2"
                    >
                      {question.tags.map((tag) => `#${tag} `)}
                    </Typography> */}
                          <Divider style={{ margin: "8px 0" }} />
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "8px -4px",
                              alignItems: "center",
                            }}
                          >
                            <strong>Tags:</strong>
                            {question.tags.map((tag) => (
                              <>
                                <Typography
                                  key={tag}
                                  variant="body2"
                                  style={{
                                    backgroundColor: "#e0e0e0",
                                    padding: "2px 8px",
                                    margin: 4,
                                    borderRadius: 4,
                                  }}
                                >
                                  <Link to={`/search/${tag}`}>{tag}</Link>
                                </Typography>
                              </>
                            ))}
                          </div>

                          <Divider style={{ margin: "20px 0" }} />
                          <Typography style={{ fontSize: "24px" }}>
                            <strong>Description</strong>
                          </Typography>
                          <Typography
                            paragraph
                            gutterBottom
                            variant="body1"
                            component="p"
                          >
                            {question.description}
                          </Typography>
                        </div>

                        {/* <div className={classes.imageSection}>
                    <img
                      className={classes.media}
                      src={
                        question.selectedFile ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                      alt={question.title}
                    />
                  </div> */}
                      </div>
                      {/* {!!recommendedPosts.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">
                You might also like:
              </Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {recommendedPosts.map(
                  ({ title, name, message, likes, selectedFile, _id }) => (
                    <div
                      style={{ margin: "20px", cursor: "pointer" }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes: {likes.length}
                      </Typography>
                      <img src={selectedFile} width="200px" />
                    </div>
                  )
                )}
              </div>
            </div>
          )} */}
                    </Paper>
                  </Grid>
                  <Grid>
                    <Paper
                      style={{
                        padding: "30px",
                        marginLeft: "20px",
                        backgroundColor: "#8ecae6",
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{ fontWeight: "bold" }}
                      >
                        Submit Your Answer
                      </Typography>

                      <Divider />

                      <TextField
                        label="Title"
                        fullWidth
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                      />
                      <Divider />
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{ fontweight: "600" }}
                      >
                        Description
                      </Typography>
                      <JoditEditor
                        ref={editor}
                        value={useranswer}
                        onChange={(newContent) => {
                          setuseranswer(newContent);
                        }}
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        style={{ marginTop: "10px" }}
                        onClick={submitanswer}
                      >
                        Submit Answer
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid container alignItems="stretch" spacing={3}>
                    {answers?.map((post) => (
                      <Grid key={post._id} item xs={12} sm={9} md={8} lg={8}>
                        <Answer answer={post} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </div>
      </div>
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
    </>
  );
};

export default SQuestion;
