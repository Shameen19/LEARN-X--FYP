import React, { useState, useEffect, useRef } from "react";
import { TextField, Paper, Button } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import back from "./askanswer.svg";
import jwt from "jsonwebtoken";
import "./am.css";
const NQuestion = ({ id }) => {
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uemail, setuemail] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        const uem = localStorage.getItem("email");

        setuemail(uem);
        console.log(uem + " email at Single Question Add");
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  });

  async function addquestion(event) {
    event.preventDefault();
    if (selected.length != 0 && title != "" && description != "") {
      event.preventDefault();
      toast("Added Successful!");
      // alert("Question Added Successfully" + selected);
      alert(title + selected + description);
      const response = await fetch("http://localhost:1337/questions/addnew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          selected,
          uemail,
        }),
      });

      const data = await response.json();
      if (data.status == "ok") {
        toast.success("Question Added Successfully");
        navigate("/questions");
      } else {
        alert("Error in Adding Question");
      }
    } else {
      if (selected.length == 0) {
        alert("Please Select a Domain");
      } else if (title == "") {
        alert("Please Enter a Title");
      } else if (description == "") {
        alert("Please Enter a Description");
      }
    }
  }

  return (
    <div className="container">
      {/* <div
        className="header"
        style={{
          cursor: "pointer",
        }}
      >
        <img src={back} alt="logo" />
      </div> */}

      <div className="wrapper">
        <div className="ask-question">
          <Paper
            elevation={3}
            className="paper"
            style={{ backgroundColor: " #dfdfdf", minHeight: "55vh" }}
          >
            <form onSubmit={addquestion}>
              <div className="ask-question__form">
                <div>
                  <TextField
                    id="standard-basic"
                    label="Enter Question Title"
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                      marginTop: "20px",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <JoditEditor
                  ref={editor}
                  value={description}
                  onChange={(newContent) => {
                    setDescription(newContent);
                  }}
                />

                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="qdomain"
                    placeHolder="Enter Tags"
                  />
                </div>

                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    style={{ padding: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Submit</h5>
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </div>
        <div className="featured">
          <h1 classname="sg-text-bit">
            Ask Question to get instantly answered.
          </h1>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </div>
  );
};

export default NQuestion;
