import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Grid } from "@mui/material/";
import PasswordStrengthBar from "react-password-strength-bar";
import { TagsInput } from "react-tag-input-component";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import IMGE from "./Assets/tech.jpg";

const jwt = require("jsonwebtoken");

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(["react"]);
  const registerUser = async (event) => {
    event.preventDefault();

    if (name != "" && email != "" && password != "" && selected.length != 0) {
      try {
        const response = await fetch("http://localhost:1337/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            selected,
          }),
        });

        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        if (data.status === "ok") {
          await toast.success("Signup Successful");
          navigate("/auth/login");
        } else {
          toast.error(data.error);
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     backgroundImage:
    //       "url(" +
    //       "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1600" +
    //       ")",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
    //   <div className="cont">
    //     <div className="container">
    //       <div className="left">
    //         <h1>Register</h1>
    // <form onSubmit={registerUser}>
    //   <input
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     type="text"
    //     placeholder="Name"
    //     className="inp"
    //   />
    //   <br />
    //   <input
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     type="email"
    //     placeholder="Email"
    //     className="inp"
    //   />
    //   <br />
    //   <input
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     type="password"
    //     placeholder="Password"
    //     className="inp"
    //   />
    //   <br />

    //   <div
    //     style={{
    //       borderRadius: "50px",
    //       maxWidth: "300px",
    //       width: "300px",
    //     }}
    //   >
    //     <TagsInput
    //       value={selected}
    //       onChange={setSelected}
    //       name="qdomain"
    //       placeHolder="Your Skills"
    //     />
    //   </div>
    //   <br />
    //   {/* <input type="submit" className="inplink" value="Register" /> */}
    //   <Button
    //     variant="outlined"
    //     className="but inplink"
    //     color="secondary"
    //     type="submit"
    //   >
    //     Signup
    //   </Button>
    // </form>
    //         <div className="text" style={{ "margin-bottom": "40px" }}>
    //           <h2 className="headi">OR</h2>
    //         </div>
    //         <Link
    //           to="/auth/login"
    //           className="inplink"
    //           style={{ "text-decoration": "none" }}
    //         >
    //           Login
    //         </Link>
    //       </div>
    //       <div className="right">
    //         <img src={IMGE} width="300px" height="500px" alt="Logo" />
    //       </div>
    //     </div>
    //   </div>

    //   <ToastContainer
    //     position="top-right"
    //     autoClose={20000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />
    // </div>

    <div
      className="parent"
      style={{
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="cont"
        style={{ marginLeft: "25%", marginTop: "13%", marginBottom: "40%" }}
      >
        <div className="container">
          <Grid>
            <Grid item xs={12}>
              <div className="left" style={{ marginBottom: "30px" }}>
                <h1>Get Started</h1>
                <form onSubmit={registerUser}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="inp"
                    required
                  />
                  <br />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="inp"
                    required
                  />
                  <br />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="inp"
                  />
                  <PasswordStrengthBar
                    password={password}
                    style={{
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      color: "white",
                    }}
                    scoreWordStyle={{ color: "white" }}
                    minLength={6}
                  />
                  <br />

                  <div
                    style={{
                      borderRadius: "50px",
                      maxWidth: "300px",
                      width: "300px",
                    }}
                  >
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="qdomain"
                      placeHolder="Your Skills"
                      className="inp"
                    />
                  </div>
                  <br />
                  {/* <input type="submit" className="inplink" value="Register" /> */}
                  <Button
                    variant="outlined"
                    className="but inplink"
                    color="secondary"
                    type="submit"
                  >
                    Signup
                  </Button>
                </form>
                <div>
                  <Link
                    to="/auth/login"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Already have an Account? <strong>Login</strong>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
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
    </div>
  );
}

export default App;
