import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";

// import Tag from "../../components/Tag Component/Tags";
const EditQuestion = () => {
  const [isload, setIsload] = useState(true);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uemail, setuemail] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
        setTitle(data.question.title);
        setSelected(data.question.tags);
        setDescription(data.question.description);
        setTimeout(() => setIsload(false), 1000);
      } else {
        alert("Error in Adding Question");
      }
    };
    getquestion();
  }, []);

  async function editquestion(event) {
    if (selected.length != 0 && title != "" && description != "") {
      event.preventDefault();

      // alert("Question Added Successfully" + selected);

      try {
        const response = await fetch(`http://localhost:1337/questions/edit/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            selected: selected,
            id: id,
          }),
        });

        const data = await response.json();
        if (data.status == "ok") {
          toast.success("Question Updated Successfully");
          navigate(`/questions/${id}`);
        } else {
          toast.error("Error in Updating Question");
        }
      } catch (err) {
        console.log(err.message);
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
    <>
      <div>
        {isload ? (
          <div
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
          <div className="container">
            <div
              className="header"
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              {/* <img src={back} alt="logo" /> */}
            </div>

            <div className="wrapper">
              <div className="ask-question">
                <Typography variant="h1" style={{ marginBottom: "20px" }}>
                  Edit Question
                </Typography>
                <Paper
                  elevation={3}
                  className="paper"
                  style={{ backgroundColor: " #dfdfdf", minHeight: "55vh" }}
                >
                  <form onSubmit={editquestion}>
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
                          value={title}
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
                          <h5 style={{ fontSize: "14px" }}>Edit</h5>
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
        )}
      </div>
    </>
  );
};

export default EditQuestion;
