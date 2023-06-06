import React, { useState, useEffect } from "react";
import "./Edit.css";
import { Button, TextField, Avatar, Typography, Paper } from "@mui/material";
import { CloudinaryContext, Image } from "cloudinary-react";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";

const EditPr = () => {
  const [isedit, setisedit] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [selected, setSelected] = useState(["react"]);
  const [iselected, setiSelected] = useState(["angular"]);
  const [username, setusername] = useState(localStorage.getItem("username"));

  const getuserdata = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/get-profile", {
        method: "POST",
        body: JSON.stringify({
          uemail: localStorage.getItem("email"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.user) {
        var userobt = JSON.stringify(data.user);
        console.log("Obtained ProfilevvssVVV" + typeof data.user[0].skills);
        setusername(data.user[0].name);
        localStorage.setItem("username", data.user[0].name);
      } else {
        toast.error("Error in fetching profile");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ztv6qgu9");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dymzxmbty/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImageURL(data.secure_url);

    sendimage(imageURL);

    console.log("image url", imageURL);
  };

  const sendimage = async (imageURL) => {
    alert("image url", imageURL);
    const resp = await fetch(`http://localhost:1337/api/update-image`, {
      method: "POST",
      body: {
        uemail: localStorage.getItem("email"),
        picurl: imageURL,
      },
    });
    const data1 = await resp.json();

    if (data1.status == "success") {
      toast.success("Profile Image Updated Successfully");
    }
  };

  const handleupdate = async () => {
    try {
      const name = localStorage.getItem("username");
      const skills = selected;
      const interests = iselected;
      const avatar = imageURL;
      const data = { name, skills, interests, avatar };
      console.log(data);

      const res = await fetch("http://localhost:1337/api/update-profile", {
        method: "POST",
        body: JSON.stringify({
          uemail: localStorage.getItem("email"),

          uskills: skills,
          uinterests: interests,
          uname: username,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data1 = await res.json();

      if (data1) {
        alert("username", res.user.name);
        localStorage.setItem("username", res.user.name);

        toast.success("Profile Updated Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt.decode(token);
  //     if (!user) {
  //       localStorage.removeItem("token");
  //       navigate("/auth/login");
  //     } else {
  //       getallquestions();
  //     }
  //   } else {
  //     localStorage.removeItem("token");
  //     navigate("/auth/login");
  //   }
  // }, []);

  return (
    <div>
      <div
        className="wrapper"
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <Paper
          elevation={4}
          style={{ padding: "20px", borderRadius: "25px", width: "70%" }}
        >
          <div
            className="avatar"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="User Image"
              src={imageURL ? imageURL : ""}
              style={{
                backgroundColor: "purple",
                width: "86px",
                height: "86px",
              }}
            >
              {localStorage.getItem("username").charAt(0).toUpperCase()}
            </Avatar>
            <Button
              component="label"
              htmlFor="upload"
              style={{
                backgroundColor: "purple",
                padding: "6px",
                marginTop: "10px",
              }}
            >
              <Typography style={{ color: "white" }}>Update Avatar</Typography>
            </Button>
            <input
              type="file"
              accept="image/*"
              id="upload"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </div>

          <div className="papercard" style={{ marginTop: "20px" }}>
            <div className="form">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <strong>Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>
                </Typography>
                <TextField
                  variant="outlined"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                  disabled={isedit}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <strong>Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>
                </Typography>
                <TextField
                  variant="outlined"
                  style={{ width: "100%", marginBottom: "10px" }}
                  disabled="true"
                  value={localStorage.getItem("email")}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <strong>
                    Role &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </strong>
                </Typography>
                <TextField
                  variant="outlined"
                  style={{ width: "100%", marginBottom: "10px" }}
                  disabled={true}
                  value={localStorage.getItem("role")}
                />
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                  >
                    <strong>Skills &nbsp; &nbsp; &nbsp;</strong>
                  </Typography>
                  <div>
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="qdomain"
                      disabled={isedit}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                  >
                    <strong>Interests</strong>
                  </Typography>
                  <TagsInput
                    value={iselected}
                    onChange={setiSelected}
                    name="qdomain"
                    disabled={isedit}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </div>
              </div>

              <div
                className="button-container"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "purple",
                    color: "white",
                    width: "100%",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                  onClick={() => setisedit(!isedit)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "purple",
                    color: "white",
                    width: "100%",
                    marginTop: "10px",
                  }}
                  disabled={isedit}
                  onClick={handleupdate}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default EditPr;
