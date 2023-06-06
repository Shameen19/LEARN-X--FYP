import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Grid, Typography } from "@mui/material/";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./resetpass.scss";
function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    // Verify the JWT
    axios
      .get(`/reset/${token}`)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to the server to reset the password
    axios
      .post(`http://localhost:1337/api/reset/${token}`, { password })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  if (error) {
    // return <div>{error}</div>;
    toast.error(error);
  }

  if (success) {
    // return <div>Your password has been successfully reset!</div>;
    toast.success("Your password has been successfully reset!");
    window.location.href = "/auth/login";
  }

  return (
    // <div className="resetpass">
    //   <div className="form-container">
    //     <form onSubmit={handleSubmit}>
    //       <label htmlFor="password">New Password:</label>
    // <input
    //   type="password"
    //   id="password"
    //   value={password}
    //   onChange={(event) => setPassword(event.target.value)}
    // />
    //       <button type="submit">Reset Password</button>
    //     </form>
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
    <section className="forms">
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
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "25px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div className="form-row button-login">
                    <button className="btn btn-login" onClick={handleSubmit}>
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
  );
}

export default ResetPasswordForm;
