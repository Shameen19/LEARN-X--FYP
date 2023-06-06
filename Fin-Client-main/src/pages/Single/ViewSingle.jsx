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
import { ReactComponent as YourSvg } from "./Featured.svg";
import { FaRegClock, FaRegEye, FaFlag } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import parser from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import NSG from "../../../src/components/Answer/SingleAnswer";
import NNSG from "../../../src/components/Answer/NewSingleAnswer";
import moment from "moment";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import withReactContent from "sweetalert2-react-content";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
// import Answer from "../../components/Answer/Com";

import "./newview.css";
const ViewSingle = () => {
  const [isload, setisload] = useState(true);
  const [question, setquestion] = useState({});
  const [answers, setanswers] = useState([]);
  const [useranswer, setuseranswer] = useState("");
  const [title, settitle] = useState("");
  const [showReportForm, setShowReportForm] = useState(false);

  const [similarquestions, setsimilarquestions] = useState([]);

  const [relatedquestion, setrelatedquestion] = useState([]);
  const [recentquestion, setrecentquestion] = useState([]);
  const uemail = localStorage.getItem("email");
  const editor = useRef(null);
  const { id } = useParams();

  const [reportcontent, setreportcontent] = useState("");
  const [reportcategory, setreportcategory] = useState("");

  // const classes = useStyles();

  const navigate = useNavigate();
  const [userna, setuserna] = useState("");

  const MySwal = withReactContent(Swal);
  function handleReportClick() {
    setShowReportForm(true);
    alert("Report Clicked" + showReportForm);
  }

  function handleCloseClick() {
    setShowReportForm(false);
  }

  const handleCategoryChange = (event) => {
    setreportcategory(event.target.value);
  };

  const handleCommentChange = (event) => {
    setreportcontent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (reportcontent != "" && reportcategory != "") {
      // alert(
      //   "Report under" +
      //     reportcategory +
      //     "category has been submitted" +
      //     " also, content is " +
      //     reportcontent
      // );

      try {
        const response = await fetch(`http://localhost:1337/questions/report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quesid: id,
            reportcontent: reportcontent,
            reportcategory: reportcategory,
            reportedby: uemail,
            reportedagainst: question.uemail,
          }),
        });
        const data = await response.json();

        if (data.status == "Reported") {
          toast.success("Reported Successfully");
          setShowReportForm(false);
        } else {
          toast.error("Error Occured");
          setShowReportForm(false);
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please Fill all the Fields");
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
            setuserna(data.usname);

            setTimeout(() => setisload(false), 1000);
          } else {
            alert("Error in Getting Question");
          }
        };

        getquestion();
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [id]);

  // useEffect(() => {
  //   const getsimil = async () => {
  //     const similarquestions = await fetch(
  //       `http://localhost:5000/recommendations`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           questionid: id,
  //         }),
  //       }
  //     );

  //     const datay = await similarquestions.json();
  //     if (datay) {
  //       console.log("OBTAINED" + datay.result);
  //       alert(JSON.stringify(datay.result));
  //       const resultsont = JSON.stringify(datay.result);
  //       setsimilarquestions(resultsont);

  //       console.log("Simialr Questions are" + similarquestions);
  //     } else {
  //       console.log("NOT OBTAINED");
  //     }
  //   };

  //   getsimil();
  // }, [id]);

  useEffect(() => {
    const getsimil = async () => {
      try {
        const similarquestions = await fetch(
          `http://localhost:5000/recommendations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              questionid: id,
            }),
          }
        );

        const datay = await similarquestions.json();
        if (datay) {
          console.log("OBTAINED", datay.result);
          var arrayofques = datay.result;
          // alert(JSON.stringify(datay.result));

          var resultsont = [];
          for (var i = 0; i < arrayofques.length; i++) {
            resultsont.push(arrayofques[i]);
          }

          const response = await fetch(
            `http://localhost:1337/questions/relatedquestions/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                questionsids: resultsont,
              }),
            }
          );

          const data = await response.json();
          if (data.status == "ok") {
            setrelatedquestion(data.ques);
            console.log(data.ques);
          } else {
            alert("Error Occured" + data.error);
          }

          console.log("Similar Questions are", resultsont);
        } else {
          console.log("NOT OBTAINED");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getsimil();
  }, [id]);

  useEffect(() => {
    const getrelatedquestion = async () => {
      // const response = await fetch(
      //   `http://localhost:1337/questions/relatedquestions/${id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const response = await fetch(
        `http://localhost:1337/questions/relatedquestions/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionsids: similarquestions,
          }),
        }
      );

      const data = await response.json();
      if (data.status == "ok") {
        setrelatedquestion(data.ques);
        console.log(data.ques);
      } else {
        alert("Error Occured" + data.error);
      }
    };

    getrelatedquestion();
  }, [question]);

  useEffect(() => {
    updateuserinterests(id);
    const getrecentquestion = async () => {
      const response = await fetch(
        `http://localhost:1337/questions/recentquestions/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "ok") {
        setrecentquestion(data.quest);
        console.log(data.quest);
      } else {
        alert("Error Occured" + data.error);
      }
    };

    getrecentquestion();
  }, [relatedquestion]);

  const updateuserinterests = async (qid) => {
    try {
      const response = await fetch(
        `http://localhost:1337/interests/find/${uemail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Data response" + data.founduser);
      if (data.founduser == "yes") {
        var interestarray = data.interestuser.interest;
        console.log("Current previous" + interestarray);
        console.log("The type of array is" + typeof interestarray);
        console.log("Array length of " + interestarray.length);
        if (interestarray.includes(id)) {
          console.log("Already present");
        } else {
          if (interestarray.length < 5) {
            interestarray.push(qid);
          } else {
            interestarray.shift();
            interestarray.push(qid);
          }
          console.log("After shifting" + interestarray);

          const response = await fetch(
            `http://localhost:1337/interests/userchange`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: uemail,
                interest: interestarray,
              }),
            }
          );

          const data = await response.json();
        }
      } else {
        const response = await fetch(`http://localhost:1337/interests/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            useremail: uemail,
            questionId: qid,
          }),
        });

        const data = await response.json();
      }
    } catch (e) {
      console.log("Error Occured while finding user interest" + e.message);
    }
  };

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
      const urole = localStorage.getItem("role");

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
            urole,
          }),
        });
        const data = await response.json();
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
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
      {isload ? (
        <div
          className="loader"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="question">
              Featured Content
              {isload ? (
                <div> </div>
              ) : (
                <>
                  <div className="question">
                    <Paper
                      elevation={1}
                      style={{
                        width: "87%",
                        padding: "30px",
                        marginTop: "180px",
                      }}
                    >
                      <div
                        className="questiontitle"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            fontFamily: "Roboto",
                            fontSize: "24px",
                            fontWeight: "500",
                          }}
                        >
                          {question.title}
                        </Typography>
                      </div>
                      <Divider style={{ margin: "10px 0" }} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        className="actionsandavatar"
                      >
                        <div
                          className="nameavatar"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar style={{ backgroundColor: "#3f51b5" }}>
                            {userna.charAt(0)}
                          </Avatar>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "16px",
                                fontWeight: "700",
                                marginTop: "10px",
                              }}
                            >
                              {userna} {""}
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "5px" }}
                            >
                              <span style={{ fontSize: "12px" }}>
                                {moment(question.createdAt).fromNow()}
                              </span>
                            </Typography>
                          </div>
                        </div>
                        {question.uemail == localStorage.getItem("email") && (
                          <div
                            className="questionaction"
                            style={{ marginTop: "10px" }}
                          >
                            <Button
                              size="medium"
                              style={{
                                backgroundColor: "#001242",
                                color: "white",
                                borderRadius: "15px",
                              }}
                              onClick={editquestion}
                            >
                              <EditIcon fontSize="small" color="blue" /> &nbsp;
                            </Button>
                            <Button
                              size="medium"
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#0094C6",
                                color: "white",
                                borderRadius: "15px",
                              }}
                              onClick={confdel}
                            >
                              <DeleteIcon fontSize="small" /> &nbsp;
                            </Button>
                          </div>
                        )}
                      </div>
                      <Divider style={{ margin: "10px 0" }} />
                      <div className="questiondescription">
                        <Typography variant="h4">
                          <strong>Details: &nbsp;</strong>
                        </Typography>
                        <Typography variant="h5">
                          {parser(question.description)}
                        </Typography>
                      </div>
                      <Divider style={{ margin: "10px 0" }} />
                      <div className="questiontags">
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
                                  fontSize: "16px",
                                  fontWeight: "700",
                                  color: "black",
                                  fontFamily: "Poppins",
                                }}
                              >
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                  }}
                                  to={`/search/${tag}`}
                                >
                                  # {tag}
                                </Link>
                              </Typography>
                            </>
                          ))}
                        </div>
                      </div>

                      <Divider style={{ margin: "10px 0" }} />

                      <div
                        className="questionstats"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <FaRegEye size={25} style={{ color: "black" }} />
                            <Typography style={{ marginLeft: "10px" }}>
                              {question.totalviews}
                            </Typography>
                          </div>
                          <div
                            style={{
                              marginLeft: "20px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <MdQuestionAnswer
                              size={25}
                              style={{ color: "black" }}
                            />
                            <Typography style={{ marginLeft: "10px" }}>
                              {question.answers.length}
                            </Typography>
                          </div>
                        </div>
                        <div
                          style={{
                            marginLeft: "20px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            border: "1px solid black",
                            padding: "5px",
                          }}
                          // onClick={() => {
                          //   toast.success("Reported Successfully");
                          // }}
                          // onClick={handleReportClick}
                          onClick={() => {
                            setShowReportForm(true);
                          }}
                        >
                          <FaFlag size={15} style={{ color: "black" }} />
                          <Typography style={{ marginLeft: "10px" }}>
                            Report
                          </Typography>
                        </div>
                      </div>
                    </Paper>
                  </div>

                  <div
                    className="submmitanswer"
                    style={{
                      padding: "20px",
                      width: "90%",
                      marginTop: "-50px",
                    }}
                  >
                    <div className="title">
                      <Paper style={{ padding: "30px", marginTop: "40px" }}>
                        <Typography variant="h4">Submit Your Answer</Typography>
                        <div className="answerform">
                          <div className="answer-title">
                            <TextField
                              label="Title"
                              fullWidth
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              onChange={(e) => {
                                settitle(e.target.value);
                              }}
                            />
                            <div className="editor">
                              <JoditEditor
                                ref={editor}
                                value={useranswer}
                                onChange={(newContent) => {
                                  setuseranswer(newContent);
                                }}
                              />
                            </div>

                            <div
                              className="answer-button"
                              style={{
                                marginTop: "10px",
                                marginRight: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  marginLeft: "10px",
                                }}
                                onClick={submitanswer}
                              >
                                Submit Answer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="recommendations" style={{}}>
              {/* <div
                className="heady"
                style={{
                  position: "absolute",
                  top: "10",
                  minHeight: "300px",
                  backgroundColor: "#ebf2fa",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    marginTop: "10px",
                    marginLeft: "2px",
                    marginRight: "2px",
                  }}
                >
                  <Typography style={{ fontSize: "24px", color: "black" }}>
                    <strong>Related Questions</strong>
                  </Typography>
                </div>
                {relatedquestion?.map((post) => (
                  <div
                    style={{
                      padding: "8px",
                      marginTop: "3px",
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ color: "black", fontSize: "14px" }}
                    >
                      <Link
                        style={{ color: "black" }}
                        to={`/questions/${post._id}`}
                      >
                        {post.title}
                      </Link>
                    </Typography>
                    <Divider style={{ marginTop: "5px", color: "black" }} />
                  </div>
                ))}

                <div className="flexyy" style={{}}></div>
              </div> */}

              <div
                className="heady"
                style={{
                  position: "absolute",
                  top: "10",
                  minHeight: "300px",
                  backgroundColor: "#ebf2fa",
                  borderRadius: "10px",
                  padding: "10px",
                  marginRight: "20px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    marginTop: "10px",
                    marginLeft: "2px",
                    marginRight: "2px",
                  }}
                >
                  <Typography style={{ fontSize: "24px", color: "black" }}>
                    <strong>Related Questions</strong>
                  </Typography>
                </div>
                {relatedquestion?.map((post) => (
                  <div
                    style={{
                      padding: "8px",
                      marginTop: "3px",
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ color: "black", fontSize: "14px" }}
                    >
                      <Link
                        style={{ color: "black" }}
                        to={`/questions/${post._id}`}
                      >
                        {post.title.substring(0, 50)} ...
                      </Link>
                    </Typography>
                    <Divider style={{ marginTop: "5px", color: "black" }} />
                  </div>
                ))}

                <div className="flexyy" style={{}}>
                  <div
                    style={{
                      padding: "8px",
                      marginTop: "10px",
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                  >
                    <Typography style={{ fontSize: "24px", color: "black" }}>
                      <strong>Recent Questions</strong>
                    </Typography>
                  </div>
                  {recentquestion?.map((post) => (
                    <div
                      style={{
                        padding: "8px",
                        marginTop: "3px",
                        marginLeft: "2px",
                        marginRight: "2px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        <Link
                          style={{ color: "black" }}
                          to={`/questions/${post._id}`}
                        >
                          {post.title.substring(0, 50)} ...
                        </Link>
                      </Typography>
                      <Divider style={{ marginTop: "5px", color: "black" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {showReportForm && (
            <div className="report-form-overlay">
              <div className="report-form">
                <button className="close-button" onClick={handleCloseClick}>
                  <Typography style={{ color: "black", fontSize: "12px" }}>
                    Close
                  </Typography>
                </button>
                <form onSubmit={handleSubmit}>
                  <Typography
                    style={{
                      color: "black",
                      fontSize: "22px",
                      textAlign: "center",
                    }}
                  >
                    <strong>Report Question</strong>
                  </Typography>
                  <label>
                    Category:
                    <select
                      name="category"
                      value={reportcategory}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Hate-Speech">Hate Speech</option>
                      <option value="Spam">Spam</option>
                      <option value="Inappropriate-Content">
                        Inappropriate Content
                      </option>
                    </select>
                  </label>

                  <label>
                    Comment:
                    <textarea
                      name="comment"
                      value={reportcontent}
                      onChange={handleCommentChange}
                    />
                  </label>
                  <br />
                  <button type="submit">Submit Report</button>
                </form>
              </div>
            </div>
          )}

          {/* <div className="report-form-overlay">
            <div className="report-form">
              <button className="close-button" onClick={handleCloseClick}>
                <Typography style={{ color: "black", fontSize: "12px" }}>
                  Close
                </Typography>
              </button>
              <form onSubmit={handleSubmit}>
                <Typography
                  style={{
                    color: "black",
                    fontSize: "22px",
                    textAlign: "center",
                  }}
                >
                  <strong>Report Question</strong>
                </Typography>
                <label>
                  Category:
                  <select
                    name="category"
                    value={reportcategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Hate-Speech">Hate Speech</option>
                    <option value="Spam">Spam</option>
                    <option value="Inappropriate-Content">
                      Inappropriate Content
                    </option>
                  </select>
                </label>

                <label>
                  Comment:
                  <textarea
                    name="comment"
                    value={reportcontent}
                    onChange={handleCommentChange}
                  />
                </label>
                <br />
                <button type="submit">Submit Report</button>
              </form>
            </div>
          </div> */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "65px",
            }}
          >
            <div
              className="answers"
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "5",
                marginTop: "190px",
              }}
            >
              <div className="answers" style={{ width: "97%" }}>
                <Typography variant="h4">
                  <strong>Answers</strong>
                </Typography>
                {answers?.map((post) => (
                  <NSG answer={post} />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flex: "3" }}></div>
          </div>
        </div>
      )}
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

export default ViewSingle;
