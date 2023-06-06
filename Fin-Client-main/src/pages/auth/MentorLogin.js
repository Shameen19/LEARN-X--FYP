import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Grid } from "@mui/material/";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import IMGE from "./Assets/tech.jpg";
const jwt = require("jsonwebtoken");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast("Login Successful!");
  async function loginUser(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please Enter Both Email and Password");
      return;
    } else {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // const jwtPayload = jwt.verify(data.user, "secret123");

      if (data.user) {
        localStorage.setItem("token", data.user);
        const user2 = jwt.decode(data.user);
        localStorage.setItem("username", user2.name);
        localStorage.setItem("profile", JSON.stringify(user2));
        localStorage.setItem("email", user2.email);
        localStorage.setItem("role", "Mentor");
        localStorage.setItem("userid", user2.userid);
        notify();
        window.location.href = "/dashboard";
      }
      if (data.error) {
        toast.error("Invalid Credentials Please Check your Email or Password");
      }
      if (data.status == "Invalid Password") {
        toast.error("Invalid Password");
      }
    }
  }

  return (
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
        style={{ marginLeft: "25%", marginTop: "20%", marginBottom: "20%" }}
      >
        <div className="container">
          <Grid>
            <Grid item xs={12}>
              <div className="left">
                <h1>Mentor Login</h1>
                <form onSubmit={loginUser}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="inp"
                  />
                  <br />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="inp"
                  />
                  <br />
                  <div style={{ textAlign: "left", marginLeft: "10px" }}>
                    <Link
                      to="/auth/reset-password"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <br />
                  {/* <input type="submit" className="but inplink" value="Login" /> */}
                  <Button
                    variant="outlined"
                    className="but inplink"
                    color="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                </form>

                <div>
                  <Link
                    to="/auth/register"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Don't have an Account? <strong>Signup</strong>
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
