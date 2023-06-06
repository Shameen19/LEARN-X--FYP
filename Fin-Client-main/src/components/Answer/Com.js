import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Avatar,
  TextField,
  Button,
} from "@mui/material/";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert } from "@mui/material";
import {
  Star,
  StarHalfOutlined,
  StarOutlineOutlined,
} from "@material-ui/icons";

import Popup from "reactjs-popup";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";

import parser from "html-react-parser";
import "./style.scss";

const Answer = ({ answer }) => {
  const [currentId, setCurrentId] = useState(0);
  const [isauthor, setisauthor] = useState(false);
  const [editanswer, seteditanswer] = useState("");
  const [title, settitle] = useState(answer.title);
  const [isupdate, setisupdate] = useState(false);
  const editor = useRef(null);
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const uid = localStorage.getItem("userid");
    if (uid == answer.uid) {
      setisauthor(true);
    }
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
  return (
    <div>
      <Paper elevation={3}>
        {isauthor && (
          <Alert variant="filled" severity="info">
            Your Answer
          </Alert>
        )}
        <Paper
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "none",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <Avatar alt="Remy Sharp" />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Typography variant="subtitle1">
                <strong>Answered by: </strong>
              </Typography>
              <Typography>{answer.answeredby}</Typography>
            </div>
          </div>
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                // paddingTop: "20px",
                // paddingBottom: "20px",
                // paddingLeft: "5px",
                // paddingRight: "5px",
                padding: "15px",
                backgroundColor: "#d2d2d4",
                borderRadius: "35px",
              }}
            >
              <StarOutlineOutlined color="yellow" style={{ color: "orange" }} />
            </div>
          </div>
        </Paper>

        <Divider style={{ margin: "20px 0" }} />

        <Typography variant="subtitle1">
          <strong> {answer.title}</strong>
        </Typography>

        {isauthor && (
          <>
            <Divider style={{ margin: "20px 0" }} />
            <div style={{ display: "flex" }}>
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
                        style={{ backgroundColor: "red", marginLeft: "20px" }}
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
                size="medium"
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#0094C6",
                  color: "white",
                }}
                onClick={delquestion}
              >
                <DeleteIcon fontSize="small" /> &nbsp; Delete
              </Button>
            </div>
          </>
        )}

        <Divider style={{ margin: "20px 0" }} />

        <Typography variant="subtitle1">
          <strong>Detail: </strong>
          {parser(answer.description)}
        </Typography>

        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="subtitle1">
          <strong>Answered by: </strong>
          {answer.answeredby}
        </Typography>

        <Divider style={{ margin: "20px 0" }} />
      </Paper>
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
    </div>
  );
};

export default Answer;
