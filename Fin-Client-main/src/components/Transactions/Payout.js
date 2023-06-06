import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

const useStyle = makeStyles({
  formStyle: {
    width: "auto",
    margin: "auto",
    padding: 20,
    paddingTop: 20,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  mybtn: {
    marginTop: 15,
    width: "10%",
  },
});

const Payout = () => {
  const classes = useStyle();
  const [bankaccountname, setbankaccountname] = useState();
  const [bankaccountnumber, setbankaccountnumber] = useState();
  const [postalcode, setpostalcode] = useState();
  const [isValidAccountNumber, setIsValidAccountNumber] = useState(false);
  const [isbankaccountname, setisbankaccountname] = useState(false);
  const [isbankaccountnumber, setisbankaccountnumber] = useState(false);
  const [ispostalcode, setispostalcode] = useState(false);
  const [checkme, setCheckme] = useState(false);
  let check = false;
  let count = 0;
  let checkit = false;

  const notify = () => toast("Payout Added Successfully!");
  const send = () => toast("Please enter payout details");

  const handleAccountNumber = () => {
    if (
      validator.isNumeric(bankaccountnumber) &&
      bankaccountnumber.length === 9
    ) {
      check = true;
    } else {
      check = false;
    }
  };
  useEffect(() => {
    alreadysubmitpayout();
    if (checkme) {
      toast.error("Your Payout details already exists");
    }
  }, [checkme]);

  const submitdata = async () => {
    const email = localStorage.getItem("email");
    try {
      handleAccountNumber();
      console.log(check);
      if (check) {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        const data = await axios.post(
          "http://localhost:1337/payout/addpayout",
          { email, bankaccountname, bankaccountnumber, postalcode },
          config
        );
        if (data.status === 203) {
          toast.error("Please Enter all required fields");
        } else if (data.status === 200) {
          notify();
        } else if (data.status === 201) {
          toast.error("Your payout already exists");
          setisbankaccountname(true);
          setisbankaccountnumber(true);
          setispostalcode(true);
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

  const alreadysubmitpayout = async () => {
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
      console.log(data.status);
      console.log("printing data");
      console.log(data.data);
      if (data.status === 200) {
        //toast.error("Your Payout details already exists");
        setisbankaccountname(true);
        setisbankaccountnumber(true);
        setispostalcode(false);
        setCheckme(true);
        checkit = true;
      } else if (data.status === 203) {
        setCheckme(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Payout Form</h1>
      <br></br>
      <FormGroup className={classes.formStyle}>
        {checkme ? (
          <>
            <FormControl>
              <InputLabel>Bank Account Name</InputLabel>
              <Input
                required
                disabled
                onChange={(e) => setbankaccountname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Bank Account Number</InputLabel>
              <Input
                required
                disabled
                onChange={(e) => setbankaccountnumber(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Postal Code</InputLabel>
              <Input
                required
                disabled
                onChange={(e) => setpostalcode(e.target.value)}
              />
            </FormControl>
          </>
        ) : (
          <>
            <FormControl>
              <InputLabel>Bank Account Name</InputLabel>
              <Input
                required
                onChange={(e) => setbankaccountname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Bank Account Number</InputLabel>
              <Input
                required
                onChange={(e) => setbankaccountnumber(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Postal Code</InputLabel>
              <Input required onChange={(e) => setpostalcode(e.target.value)} />
            </FormControl>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.mybtn}
          onClick={submitdata}
        >
          Submit
        </Button>
      </FormGroup>

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

export default Payout;
