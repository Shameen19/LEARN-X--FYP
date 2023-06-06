import React, { useState, useEffect, useRef } from "react";
import "./SAns.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, Divider } from "@material-ui/core";
import parser from "html-react-parser";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Popup from "reactjs-popup";
import { FaThumbsUp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const SingleAnswer = ({ answer }) => {
  const [hasuservoted, setHasUserVoted] = useState(false);
  const uemail = localStorage.getItem("email");
  const [editanswer, seteditanswer] = useState(answer.description);
  const [title, settitle] = useState(answer.title);
  const MySwal = withReactContent(Swal);
  const [isauthor, setisauthor] = useState(false);
  const [totalups, settotalupvotes] = useState(0);
  const [check2, setcheck2] = useState(false);
  const [rating, setrating] = useState(0);

  const editor = useRef(null);

  const checkupvote = async () => {
    const res = await fetch(
      `http://localhost:1337/answers/checkupvote/${answer._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: uemail,
        }),
      }
    );
    const data = await res.json();
    if (data.message == "upvoted") {
      setHasUserVoted(true);
    }
  };

  useEffect(() => {
    checkrating();
  }, []);

  const checkrating = async () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    console.log("Printing info", user);
    console.log("Printing user email", user.email);
    const useremail = user.email;
    const userrole = user.role;
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:9006/checkrating",
        { useremail },
        config
      );
      // console.log("Successful", data);
      setrating(data.data);
      console.log("Rating is ", rating);
      //&& userrole === "mentor"
      if (rating > 4) {
        setcheck2(true);
      }
    } catch (e) {
      console.log("Error occured", e);
    }
  };

  const totalupvotes = async () => {
    const res = await fetch(
      `http://localhost:1337/answers/totalupvotes/${answer._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    settotalupvotes(data.total);
  };

  const upvote = async () => {
    const res = await fetch(
      `http://localhost:1337/answers/${answer._id}/upvote/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: uemail,
        }),
      }
    );
    const data = await res.json();
    if (data.message == "success") {
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);

      toast("Upvoted Successfully");
    } else {
      toast("Error" + data.message);
    }
  };

  useEffect(() => {
    checkupvote();
    totalupvotes();
  });

  const updatequestion = async () => {
    try {
      const res = await fetch(
        `http://localhost:1337/answers/update/${answer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description: editanswer,
          }),
        }
      );
      const data = await res.json();
      if (data.status == "updated") {
        toast.success("Answer has been successfully updated");
        window.location.reload(false);
      } else {
        toast.error("Error" + data.message);
      }
    } catch (err) {
      // alert("Error" + err.message);
      toast.error("Error" + err.message);
    }
  };

  const delquestion = () => {
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
        `http://localhost:1337/answers/delete/${answer._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status == "deleted") {
        toast.success("Answer has been successfully deleted");
        window.location.reload(false);
      } else {
        toast.error("Error" + data.message);
      }
    } catch (err) {
      toast.error("Error" + err.message);
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("userid");
    if (uid == answer.uid) {
      setisauthor(true);
    }
  });

  // const checkupvote = async () => {
  //   const res = await fetch(
  //     `http://localhost:1337/answers/checkupvote/${answer._id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: uemail,
  //       }),
  //     }
  //   );
  //   const data = await res.json();
  //   if (data.message == "upvoted") {
  //     setHasUserVoted(true);
  //   }
  // };

  // const upvote=async ()=>{

  //     const res = await fetch(
  //       `http://localhost:1337/answers/upvote/${answer._id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: uemail,
  //         }),
  //       }
  //     );
  //     const data = await res.json();
  //     if (data.message == "upvoted") {
  //       setHasUserVoted(true);
  //     }

  // }

  // useEffect(() => {
  //   checkupvote();
  // });
  return (
    <div style={{ padding: "10px" }}>
      <div className="holder">
        <div
          className="AnswerBoxLayout-module__box--FSknG AnswerBoxLayout-module__boxExpertVerified--2Erh3"
          style={{}}
        >
          {answer.role == "mentor" && (
            <>
              <div className="AnswerBoxLayout-module__header--xXagb">
                <div className="AnswerBoxHeaderSemanticScore-module__grid--3hB1x AnswerBoxHeaderSemanticScore-module__verified--fNTA9">
                  <div className="sg-flex AnswerBoxHeaderSemanticScore-module__icon--TmvoU">
                    <div className="sg-flex IconVerified-module__wrapper--lEXIZ">
                      <svg
                        width={26}
                        id="verified__Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 26.65 26.66"
                        aria-labelledby="verified__title_1"
                        role="img"
                      >
                        <path
                          className="IconVerified-module__fill--jQ4mh IconVerified-module__rotate--IJvHU"
                          d="M25.99,8.4l-3.22-1.6-.56-3.33c-.17-.77-.89-1.29-1.67-1.2l-3.5,.53L14.51,.4c-.55-.53-1.42-.53-1.97,0l-2.79,2.4-3.5-.53c-.38-.07-.78,.02-1.09,.25-.32,.23-.53,.57-.59,.95l-.56,3.33-3.22,1.6c-.67,.35-.98,1.16-.7,1.87l1.67,3.07-1.52,3.07c-.26,.68-.03,1.44,.56,1.87l3.22,1.6,.56,3.33c.17,.77,.9,1.29,1.68,1.2l3.5-.53,2.52,2.4c.54,.53,1.41,.53,1.96,0l2.5-2.4,3.5,.53c.38,.07,.78-.02,1.1-.24,.32-.23,.53-.57,.59-.96l.56-3.33,3.22-1.6c.34-.16,.59-.45,.69-.81,.11-.36,.06-.74-.14-1.06l-1.24-3.07h0l1.54-3.07c.25-.68,.03-1.44-.56-1.87Z"
                          fill="#24a865"
                        />
                        <polyline
                          className="IconVerified-module__stroke--hNOKg IconVerified-module__draw--Nm8RZ"
                          points="8.3 12.8 12.5 17 18.7 10.8"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.75px"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="sg-flex sg-flex--align-items-center AnswerBoxHeaderSemanticScore-module__headline--b6jcu">
                    <h2 className="sg-headline sg-headline--medium">
                      Expert-Verified Answer
                      <div>
                        <div className="OutsideClickController-module__wrapper--DhUYY">
                          <div>
                            <div className="Tooltip-module__brn-tooltip-children--xJ9AG">
                              <div className="sg-icon sg-icon--icon-black sg-icon--x16">
                                <svg
                                  className="sg-icon__svg"
                                  role="img"
                                  aria-labelledby="title-question-smetdw"
                                  focusable="false"
                                >
                                  Hello
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            className="AnswerBoxLayout-module__author--h9VOX"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="AnswerBoxAuthor-module__wrapper--gJpul">
              <div className="AnswerBoxAuthor-module__avatar--bC9Kj">
                <div className="sg-flex sg-flex--margin-right-s">
                  <div className="OutsideClickController-module__wrapper--DhUYY">
                    <div>
                      <div className="Tooltip-module__brn-tooltip-children--xJ9AG">
                        <label className="sg-text sg-text--link sg-text--bold sg-text--link-label">
                          <Avatar>{answer.answeredby[0].toUpperCase()}</Avatar>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="AnswerBoxAuthor-module__description--2xJD0">
                <div className="sg-flex">
                  <div>
                    <label className="sg-text sg-text--small sg-text--link sg-text--bold sg-text--text-black sg-text--link-label sg-text--bold">
                      <span> {answer.answeredby} </span>
                    </label>
                  </div>
                </div>
                <div className="sg-animation-fade-in-fast">
                  <>{answer.role}</>
                </div>
              </div>
              <div />
              <div className="AnswerBoxAuthor-module__labels--xTWWr" />
            </div>
            <div>
              {answer.uemail == localStorage.getItem("email") && (
                <div
                  className="questionaction"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {/* <Button
                    size="small"
                    style={{
                      backgroundColor: "#001242",
                      color: "white",
                      borderRadius: "15px",
                    }}
                    // onClick={editquestion}
                  >
                    <EditIcon fontSize="small" color="blue" /> &nbsp;
                  </Button> */}
                  <Popup
                    trigger={
                      <Button
                        size="medium"
                        style={{
                          backgroundColor: "#001242",
                          color: "white",
                        }}
                      >
                        <EditIcon fontSize="small" color="blue" /> &nbsp; Edit
                      </Button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div
                        className="modal"
                        style={{
                          padding: "20px",
                          backgroundColor: "lightgray",
                        }}
                      >
                        {/* <button className="close" onClick={close}>
                      &times;
                    </button> */}
                        <div className="header" style={{ fontSize: "20px" }}>
                          {" "}
                          Edit Answer{" "}
                        </div>
                        <div className="content">
                          <TextField
                            label="Title"
                            fullWidth
                            value={title}
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
                            value={answer.description}
                            onChange={(newContent) => {
                              seteditanswer(newContent);
                            }}
                          />
                        </div>
                        <div className="actions">
                          <Popup position="top center" nested></Popup>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={updatequestion}
                          >
                            Update Answer
                          </Button>
                          {/* <button
                        className="button"
                        onClick={() => {
                          console.log("modal closed ");
                          close();
                        }}
                      >
                        close modal
                      </button> */}
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{
                              backgroundColor: "red",
                              marginLeft: "20px",
                            }}
                            onClick={() => {
                              close();
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    )}
                  </Popup>
                  <Button
                    size="small"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "15px",
                    }}
                    onClick={delquestion}
                  >
                    <DeleteIcon fontSize="small" /> &nbsp;
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div></div>
          <div
            className="AnswerBoxLayout-module__content--bMldb"
            style={{ marginTop: "10px" }}
          >
            <div>
              <div>
                <div className="sg-text sg-text--break-words AnswerBoxContent-module__richContent--XAbww">
                  <div
                    className="flexy"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography>
                      <strong>Answer:</strong>
                    </Typography>
                    <div>{parser(answer.description)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sg-animation-fade-in-fast AnswerBoxLayout-module__searchEntryPoint--1MhG5">
            {hasuservoted ? (
              <div
                className="flexy"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    backgroundColor: "#006e90",
                    padding: "5px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <strong>Already Upvoted</strong>
                </Typography>
                <Typography style={{ marginLeft: "10px" }}>
                  <strong>{totalups} Upvotes</strong>
                </Typography>
              </div>
            ) : (
              <>
                <div
                  className="flexy"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={upvote}
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#f18f01",
                      color: "white",
                    }}
                  >
                    Helpful?
                    <FaThumbsUp style={{ marginLeft: "10px" }} />
                  </Button>
                  <Typography style={{ marginLeft: "10px" }}>
                    <strong>{totalups} Upvotes</strong>
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAnswer;
