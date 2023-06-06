import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./transaction.css";

const makeStyle = (status) => {
  if (status === "credit") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "debit") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  }
};

export default function BasicTable() {
  const [getuserdata, setuserdata] = useState([]);
  const Viewdata = async (e) => {
    const email = localStorage.getItem("email");
    const res = await fetch(`http://localhost:5000/viewtransactions/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("Printing dataaa");
    console.log(data);
    if (res.status === 400 || !data) {
      //alert("Error reported while fetching the data.");
      console.log("error");
    } else {
      //alert("Complaint added");
      console.log("Get data");
      setuserdata(data);
    }
  };
  useEffect(() => {
    Viewdata();
  }, []);
  return (
    <div className="Table">
      <h3>Transaction Details</h3>
      <TableContainer
        className="TableContainer"
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          marginBottom: "200px",
          height: "300px",
          width: "auto",
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Transaction type</TableCell>
              <TableCell align="left">Credit count</TableCell>
              <TableCell align="left">Mode</TableCell>
              <TableCell align="left">Transaction Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {getuserdata.map((element, id) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id + 1}
                </TableCell>
                <TableCell align="left">{element.email}</TableCell>
                <TableCell align="left">{element.transactiontype}</TableCell>
                <TableCell align="left">{element.creditscount}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(element.mode)}>
                    {element.mode}
                  </span>
                </TableCell>
                <TableCell align="left">{element.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
