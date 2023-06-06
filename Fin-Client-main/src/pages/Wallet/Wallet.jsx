import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../imported/native-components/theme";
import Table from "./TransactionTable";
import CreditDisplay from "./CreditsDisplay";
import StatBox from "../../imported/native-components/components/StatBox";
import { FaDollarSign } from "react-icons/fa";
import "./index.css";
import { radiansToDegrees } from "@nivo/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import CreditScoreSharpIcon from "@mui/icons-material/CreditScoreSharp";
import RedeemIcon from "@mui/icons-material/Redeem";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SmallCharts from "./SmallCharts";
import Charts from "../../components/Transactions/Charts";

import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Payout from "../../components/Transactions/Payout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate } from "react-router-dom";
import Withdraw from "../../components/Transactions/Withdraw";
import { Navigation } from "@material-ui/icons";

const Wallet = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const navigateion = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const navigateme = () => {
    navigateion("/redeem");
  };
  const pricingplan = () => {
    navigateion("/pricing");
  };
  return (
    <>
      <div className="body">
        <br />
        <div>
          <h2 style={{ marginLeft: "20px", marginTop: "10px" }}>Wallet</h2>
        </div>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Box
            display="grid"
            sx={{
              width: ["100%", "280px"],
              height: "130px",
              marginLeft: "2px",
              backgroundColor: "#45b4d0",
              borderRadius: 2,
              color: "white",
              marginBottom: "10px",
            }}
            className="boxy"
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2
                  style={{
                    marginTop: "40px",
                    marginLeft: "20px",
                    width: "180px",
                  }}
                >
                  View Pricing Plan
                </h2>
                <p
                  style={{
                    marginLeft: "10px",
                    marginTop: "25px",
                    width: "auto",
                    fontSize: "14px",
                  }}
                >
                  You can buy credits here.
                </p>
              </div>
              <div
                style={{
                  width: "60px",
                  marginTop: "50px",
                  marginBottom: "40px",
                }}
              >
                <Button
                  variant="text"
                  startIcon={
                    <PaidIcon sx={{ color: "white", fontSize: 150 }} />
                  }
                  style={{
                    width: "auto",
                    marginRight: "189px",
                    marginBottom: "100px",
                    paddingBottom: "20px",
                  }}
                  onClick={pricingplan}
                ></Button>
              </div>
            </div>
          </Box>

          <Box
            display="grid"
            sx={{
              width: ["100%", "280px"],
              height: "130px",
              marginLeft: "2px",
              backgroundColor: "#FFAA33",
              borderRadius: 2,
              color: "white",
              marginBottom: "10px",
            }}
            className="boxy"
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2
                  style={{
                    marginTop: "40px",
                    marginLeft: "20px",
                    width: "180px",
                  }}
                >
                  Withdraw Credits
                </h2>
                <p
                  style={{
                    marginLeft: "10px",
                    marginTop: "25px",
                    width: "auto",
                    fontSize: "14px",
                  }}
                >
                  Withdraw your credits as cash
                </p>
              </div>
              <div
                style={{
                  width: "60px",
                  marginTop: "50px",
                  marginBottom: "40px",
                }}
              >
                <Button
                  variant="text"
                  startIcon={
                    <CreditScoreSharpIcon
                      sx={{ color: "white", fontSize: 150 }}
                    />
                  }
                  style={{
                    width: "auto",
                    marginRight: "189px",
                    marginBottom: "100px",
                    paddingBottom: "20px",
                  }}
                  onClick={handleClickOpen2}
                ></Button>
              </div>
            </div>
          </Box>

          <Box
            display="grid"
            sx={{
              width: ["100%", "280px"],
              height: "130px",
              marginLeft: "2px",
              backgroundColor: "#DE3163",
              borderRadius: 2,
              color: "white",
              marginBottom: "10px",
            }}
            className="boxy"
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2
                  style={{
                    marginTop: "40px",
                    marginLeft: "20px",
                    width: "180px",
                  }}
                >
                  Gift Cards
                </h2>
                <p
                  style={{
                    marginLeft: "10px",
                    marginTop: "25px",
                    width: "auto",
                    fontSize: "14px",
                  }}
                >
                  Redeem your credits as gift cards
                </p>
              </div>
              <div
                style={{
                  width: "60px",
                  marginTop: "50px",
                  marginBottom: "40px",
                }}
              >
                <Button
                  variant="text"
                  startIcon={
                    <RedeemIcon sx={{ color: "white", fontSize: 150 }} />
                  }
                  style={{
                    width: "auto",
                    marginRight: "189px",
                    marginBottom: "100px",
                    paddingBottom: "20px",
                  }}
                  onClick={navigateme}
                ></Button>
              </div>
            </div>
          </Box>

          <Box
            display="grid"
            sx={{
              width: ["100%", "280px"],
              height: "130px",
              marginLeft: "2px",
              backgroundColor: "#29AB87",
              borderRadius: 2,
              color: "white",
              marginBottom: "10px",
            }}
            className="boxy"
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2
                  style={{
                    marginTop: "40px",
                    marginLeft: "20px",
                    width: "180px",
                  }}
                >
                  Add Payout
                </h2>
                <p
                  style={{
                    marginLeft: "10px",
                    marginTop: "25px",
                    width: "auto",
                    fontSize: "14px",
                  }}
                >
                  Add your bank details here
                </p>
              </div>
              <div
                style={{
                  width: "60px",
                  marginTop: "50px",
                  marginBottom: "40px",
                }}
              >
                <Button
                  variant="text"
                  startIcon={
                    <AccountBalanceIcon
                      sx={{ color: "white", fontSize: 150 }}
                    />
                  }
                  style={{
                    width: "auto",
                    marginRight: "189px",
                    marginBottom: "100px",
                    paddingBottom: "20px",
                  }}
                  onClick={handleClickOpen}
                ></Button>
              </div>
            </div>
          </Box>
        </div>

        <br />
        <br />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{
            width: "auto", // Increase the width to 90%
            height: "auto", // Increase the height to 90%
          }}
          fullWidth={true}
        >
          <DialogContent>
            <Payout />
          </DialogContent>
        </Dialog>

        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{
            width: "auto", // Increase the width to 90%
            height: "auto", // Increase the height to 90%
          }}
          fullWidth={true}
        >
          <DialogContent>
            <Withdraw />
          </DialogContent>
        </Dialog>

        <Dialog
          open={open3}
          onClose={handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{
            width: "auto", // Increase the width to 90%
            height: "auto", // Increase the height to 90%
          }}
          fullWidth={true}
        >
          <DialogContent>
            <Charts />
          </DialogContent>
        </Dialog>

        <div
          className="row12"
          style={{ display: "flex", flexDirection: ["column", "row"] }}
        >
          <div
            className="col1"
            style={{ display: "flex", flexDirection: "column", flex: 2 }}
          >
            <h3 style={{ marginLeft: "20px", marginTop: "10px" }}>
              Transaction History
            </h3>
            <Box display="grid">
              <Table />
            </Box>
          </div>

          <div
            style={{
              marginTop: "30px",
              height: ["300px"],
              width: ["100%", "auto"],
              marginLeft: ["0px", "20px"],
            }}
            className="boxy"
          >
            <Tooltip title="Click button to view Charts">
              <Button
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
                onClick={handleClickOpen3}
              >
                Statistics
              </Button>
            </Tooltip>
            <SmallCharts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
