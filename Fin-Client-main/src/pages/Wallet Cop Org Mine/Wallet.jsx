import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../imported/native-components/theme";
// import Table from "./TransactionTable";
import CreditDisplay from "./CreditsDisplay";
import StatBox from "../../imported/native-components/components/StatBox";
import { FaDollarSign } from "react-icons/fa";
import Payout from "../Wallets-Payouts/Payout";

const Wallet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <div>
      <>
        <Typography variant="h3">Wallet</Typography>

        <div className="con22">
          <div
            className="row12"
            style={{ display: "flex", flexDirection: "row" }}
            backgroundColor={colors.primary[400]}
          >
            <div
              className="col1"
              style={{ display: "flex", flexDirection: "column", flex: 2 }}
            >
              <Box display="grid"></Box>
            </div>

            <div
              className="col1"
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <Box
                display="grid"
                style={{ marginRight: "50px", maxwidth: "100px" }}
              >
                <StatBox
                  title="1452"
                  subtitle="Available Credits"
                  icon={
                    <FaDollarSign
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                      size={28}
                      color={colors.greenAccent[600]}
                    />
                  }
                />
              </Box>
            </div>
          </div>

          <div className="row22">
            <div className="col2">
              <Payout />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Wallet;
