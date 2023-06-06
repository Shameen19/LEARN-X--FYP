import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./forgotPass.scss";
import "./css/style.css";
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const notify = () => toast.success("Password Reset Link Sent to your Email");
  const navigate = useNavigate();
  async function resetpassword(event) {
    event.preventDefault();

    if (email === "") {
      toast.error("Please Enter Email");
      return;
    } else {
      const response = await fetch("http://localhost:1337/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (data.message == "Password reset requested") {
        toast.success("Password Reset Link Sent to your Email");
        navigate("/auth/login");
      }
      if (data.error) {
        toast.error("Invalid Credentials Please Check your Email or Password");
      }
    }
  }

  return (
    <>
      {/* <div
        style={{
          height: "100vh",
          backgroundImage:
            "url(" +
            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1600" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="ab">
          <div className="container-inner">
            <div class="form-style-5">
              <form onSubmit={resetpassword}>
                <fieldset>
                  <h1
                    style={{ "padding-top": "20px", "padding-bottom": "20px" }}
                  >
                    Forgot Password
                  </h1>

                  <input
                    type="email"
                    name="field2"
                    placeholder="Your Email *"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </fieldset>

                <input type="submit" value="Reset Password" />
              </form>

              <div className="linke">
                <Link to="/auth/login">Back to Login</Link>
              </div>
            </div>
          </div>

        </div>
      </div> */}

      <section
        className="forms"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="container">
          {/* logo */}
          <div className="logo">
            <a className="brand-logo" href="index.html">
              LEARN X
            </a>
          </div>
          {/* //logo */}
          <div className="forms-grid">
            {/* login */}
            <div className="login">
              <span className="fas fa-sign-in-alt" />
              <strong>Reset Password</strong>

              <form action="#" method="post" className="login-form">
                <fieldset>
                  <div className="form">
                    <div className="form-row">
                      <span className="fas fa-user" />
                      <label className="form-label" htmlFor="input">
                        Enter Your Email
                      </label>
                      <input
                        type="email"
                        required
                        className="form-text"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-row button-login">
                      <button className="btn btn-login" onClick={resetpassword}>
                        Reset <span className="fas fa-arrow-right" />
                      </button>
                    </div>

                    <div className="form-row" style={{ marginTop: "10px" }}>
                      <Typography variant="subtitle2">
                        <Link to="/auth/login">Back to Login</Link>
                      </Typography>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>

            {/* //login */}
            {/* register */}

            {/* //register */}
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
      </section>
    </>
  );
};

export default ForgotPass;
