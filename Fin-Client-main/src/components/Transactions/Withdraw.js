import React, { useRef, useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
} from "@material-ui/core";
import "./Withdraw.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import ReCAPTCHA from "react-google-recaptcha";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";

const SITE_KEY = "6LddxYYlAAAAAEokBlyD-2g2ijHALCHSumVk7_eX";
const useStyle = makeStyles({
  formStyle: {
    width: "auto",
    margin: "auto",
    marginTop: 40,
    padding: 30,
    paddingTop: 20,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  mybtn: {
    marginTop: 15,
    width: "10%",
  },
  first: {
    width: "auto",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "95%",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Withdraw = () => {
  const classes = useStyle();
  const [recaptchavalue, setrecaptchavalue] = useState("");
  const captchaRef = useRef();
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [bankingname, setBankname] = useState();
  const [bankaccountnumber, setBankaccountnumber] = useState();
  const [postal, setPostal] = useState();
  let check = false;
  let checkamount = false;
  const [mycredits, setCredits] = useState();

  const [bankingname2, setBankname2] = useState();
  const [bankaccountnumber2, setBankaccountnumber2] = useState();
  const [postal2, setPostal2] = useState();

  const [editbankname, seteditbankname] = useState();
  const [editbanknumber, seteditbanknumber] = useState();
  const [editpostalcode, seteditpostalcode] = useState();
  const [withdraw, setwithdraw] = useState(false);

  let em;
  let bankname;
  let banknumber;
  let postalcode;

  let em2;
  let bankname2;
  let banknumber2;
  let postalcode2;
  let editcheck = false;
  let withdrawamount = false;

  const [amount, setAmount] = useState();

  const notify = () => toast("Payout Updated Successfully!");
  const notify2 = () => toast("Credits have been withdrawn from your account!");
  const notify3 = () => toast("A confirmation email has been sent to you!");
  const notify4 = () => toast("Payout details not found!");

  const handleOpen = () => {
    setOpen1(true);
  };

  const handleClickOpen = () => {
    checkdataedit();
    if (editcheck) {
      setOpen(true);
    }
  };

  const checkdataedit = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/payout/alreadysubmitpayout",
        { email },
        config
      );
      console.log("data at edit payout is ", data);
      if (data.status === 203) {
        notify4();
        editcheck = false;
      } else if (data.status === 200) {
        editcheck = true;
      }
    } catch (e) {
      console.log("Error at edit payout", e);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };

  const handleSubmit = () => {
    captchaRef.current.reset();
  };
  const onChange = (value) => {
    setrecaptchavalue(value);
  };

  const handleAccountNumber = () => {
    if (validator.isNumeric(editbanknumber) && editbanknumber.length === 9) {
      check = true;
    } else {
      check = false;
    }
  };

  const checknumeric = () => {
    if (validator.isNumeric(amount) && amount >= 0) {
      checkamount = true;
    } else {
      checkamount = false;
    }
  };

  const viewdata = async () => {
    handleOpen();
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/payout/alreadysubmitpayout",
        { email },
        config
      );
      console.log("Data is ", data);
      if (data.status === 203) {
        notify4();
      } else if (data.status === 200) {
        bankname = data.data.BankAccountName;
        banknumber = data.data.BankAccountNumber;
        postalcode = data.data.PostalCode;

        setBankname(bankname);
        setBankaccountnumber(banknumber);
        setPostal(postalcode);
        console.log("printing");
        console.log(bankname);
        console.log(banknumber);
        console.log(postalcode);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkdata = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/payout/alreadysubmitpayout",
        { email },
        config
      );
      bankname2 = data.data.BankAccountName;
      banknumber2 = data.data.BankAccountNumber;
      postalcode2 = data.data.PostalCode;

      setBankname2(bankname2);
      setBankaccountnumber2(banknumber2);
      setPostal2(postalcode2);
      console.log("Printing withdrawing form data");
      console.log(bankname2);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    checkdata();
  });

  const submiteditdata = async () => {
    const email = localStorage.getItem("email");
    try {
      handleAccountNumber();
      if (check) {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        const data = await axios.post(
          "http://localhost:1337/payout/editpayout",
          { email, editbankname, editbanknumber, editpostalcode },
          config
        );
        if (data.status === 203) {
          toast.error("Please Enter all required fields");
        } else if (data.status === 200) {
          handleClose();
          notify();
        } else if (data.status === 404) {
          toast.error("Error occured");
        }
      } else {
        toast.error("Please enter valid account number");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occured while recording payouts");
    }
  };

  const handleData = async () => {
    const email = localStorage.getItem("email");
    try {
      checknumeric();
      if (checkamount) {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        const data = await axios.post(
          "http://localhost:1337/withdraw/withdrawamount",
          { email, amount, recaptchavalue },
          config
        );
        if (data.status === 203) {
          toast.error("Please enter the amount");
        }
        if (data.status === 204) {
          toast.error("Please check the captcha box");
        }
        if (data.status == "unaut") {
          toast.error("At Least 100 Credits are required to withdraw");
        }
        if (data.status === 205) {
          toast.error("Insufficent balance");
        } else if (data.status === 206) {
          notify2();
          notify3();
          handleClose();
        }
        console.log(data);
      } else {
        toast.error("Please enter numeric amount greater than zero");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occured while withdrawing");
    }
  };

  const getcredits = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/withdraw/viewdata",
        { email },
        config
      );
      console.log(data);
      setCredits(data.data.credits);
      console.log("PRINTING");
      console.log(mycredits);
    } catch (err) {
      console.log(err);
      toast.error("Error occured while withdrawing");
    }
  };

  useEffect(() => {
    getcredits();
  });

  const checkdatawithdraw = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/payout/alreadysubmitpayout",
        { email },
        config
      );
      console.log("data at edit payout is ", data);
      if (data.status === 203) {
        //notify4();
        withdrawamount = false;
        console.log("Withdraw value", withdrawamount);
      } else if (data.status === 200) {
        setwithdraw(true);
        console.log("Withdraw value", withdrawamount);
      }
    } catch (e) {
      console.log("Error at edit payout", e);
    }
  };

  useEffect(() => {
    checkdatawithdraw();
  });
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ height: "60%" }}>
          <Card sx={{ maxWidth: 330 }}>
            <CardContent>
              <h3 style={{ color: "#2F9599 " }}>Current Balance</h3>
              <br></br>
              <AccountBalanceIcon
                variant="outlined"
                color="success"
              ></AccountBalanceIcon>
              <Typography
                style={{ display: "inline-flex", color: "black" }}
                value={mycredits}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {mycredits}
              </Typography>
              <Button
                variant="outlined"
                style={{ marginLeft: 200 }}
                color="primary"
                onClick={viewdata}
              >
                View Payout Details
              </Button>
              {!bankingname && !bankaccountnumber && !postal ? (
                <>
                  <Dialog
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Payout details"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No payout details have been found
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <>
                  <Dialog
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Payout details"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Following are the details of your payout
                      </DialogContentText>
                      <Typography>
                        Your bank account name is: {`${bankingname}`}
                      </Typography>
                      <Typography>
                        Your bank account number is: {`${bankaccountnumber}`}
                      </Typography>
                      <Typography>
                        Your bank account number is: {`${postal}`}
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} style={{ height: "60%" }}>
          <Card sx={{ maxWidth: 330 }}>
            <CardContent>
              <h3 style={{ color: "#45ADA8" }}>Edit your payout details</h3>
              <br></br>
              <EditIcon variant="outlined" color="success"></EditIcon>
              <Typography style={{ display: "inline-flex", color: "black" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Edit Payout details
              </Typography>

              <Button
                variant="outlined"
                onClick={handleClickOpen}
                style={{ marginLeft: 300, padding: 5 }}
                color="primary"
              >
                Edit Payout
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Payout Details</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To edit your payout details, please fill the form below
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Bank Account Name"
                    type="text"
                    fullWidth
                    onChange={(e) => seteditbankname(e.target.value)}
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Bank Account Number"
                    fullWidth
                    onChange={(e) => seteditbanknumber(e.target.value)}
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Postal Code"
                    fullWidth
                    onChange={(e) => seteditpostalcode(e.target.value)}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={submiteditdata} color="primary">
                    Edit
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {withdraw ? (
        <>
          <FormGroup className={classes.formStyle}>
            <FormControl>
              <Input
                required
                value={bankingname2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                required
                value={bankaccountnumber2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                required
                value={postal2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Credits you want to withdraw</InputLabel>
              <Input required onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
            <br></br>
            <div className="form-group mt-2">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={onChange}
                ref={captchaRef}
              />
            </div>

            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.mybtn}
                  onClick={handleData}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
        </>
      ) : (
        <>
          <FormGroup className={classes.formStyle}>
            <FormControl>
              <Input
                required
                value={bankingname2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                required
                value={bankaccountnumber2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                required
                value={postal2}
                disabled
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Credits you want to withdraw</InputLabel>
              <Input required onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
            <br></br>
            <div className="form-group mt-2">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={onChange}
                ref={captchaRef}
              />
            </div>

            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.mybtn}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.mybtn}
                  onClick={handleData}
                  disabled
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
        </>
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
    </div>
  );
};

export default Withdraw;
