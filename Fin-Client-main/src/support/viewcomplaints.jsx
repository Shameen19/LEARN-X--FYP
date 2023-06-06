import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink } from "react-router-dom";

import Chat from "./Chatbot";
function Viewcomplaints() {
  const navigate = useNavigate;
  const [getuserdata, setuserdata] = useState([]);
  const [getcomplaintdata, setcomplaintdata] = useState([]);

  const Viewdata = async (e) => {
    const uemail = localStorage.getItem("email");
    const res = await fetch(
      `http://localhost:1337/complaints/viewdata/${uemail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    console.log(data);
    if (res.status === 422 || !data) {
      alert("Error reported while registering complaint.Please try again.");
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

  const GetComplaints = async (e) => {
    const uemail = localStorage.getItem("email");
    const res = await fetch(
      `http://localhost:1337/questions/getreports/${uemail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    console.log(data);
    if (data.status != "ok") {
      alert("Error reported while registering complaint.Please try again.");
      console.log("error");
    } else {
      //alert("Complaint added");
      setcomplaintdata(data.reports);
    }
  };

  useEffect(() => {
    GetComplaints();
  }, [getuserdata]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            variant="h4"
            style={{
              paddingLeft: "5px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#033F63",
              marginTop: "20px",
            }}
          >
            All Complaints
          </Typography>{" "}
        </div>
        <div
          style={{
            marginRight: "20px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#033F63",
            padding: "10px",
            borderRadius: "10px",
          }}
          onClick={() => {
            // window.location.href = "/addcomplaint";
            window.open(`http://localhost:3000/addcomplaint`, "_blank");
          }}
        >
          <div style={{ marginRight: "5px" }}>
            <MdOutlineAddCircleOutline size={24} color={"white"} />
          </div>
          <div>
            <Typography variant="h4" style={{ color: "white" }}>
              New Complaint
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Subject
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Status
                  </Typography>
                </TableCell>
                {/* <TableCell align="right">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {getuserdata.length > 0 ? (
                <>
                  {getuserdata.map((element, id) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {id + 1}
                      </TableCell>
                      <TableCell align="right">
                        <Typography style={{ fontSize: "14px" }}>
                          {element.subject}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {element.status == "no actions" ? (
                          <div>
                            <div>
                              <Typography
                                style={{
                                  color: "Orange",
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                }}
                              >
                                Pending
                              </Typography>{" "}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div>
                              <Typography
                                style={{
                                  color: "Green",
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                }}
                              >
                                Resolved
                              </Typography>{" "}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      {/* <TableCell align="right">Action</TableCell> */}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  textAlign="center"
                  align="center"
                >
                  <Typography
                    align="center"
                    style={{
                      paddingLeft: "20px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    No Complaints to Show
                  </Typography>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="secondtable" style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              variant="h4"
              style={{
                paddingLeft: "5px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#033F63",
                marginTop: "20px",
              }}
            >
              Community Voilations
            </Typography>{" "}
          </div>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      SR#
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Question ID
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Report Type
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Status
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {getcomplaintdata.map((element, id) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Typography style={{ fontSize: "14px" }} align="left">
                        {id + 1}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {element.questionId}
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ fontSize: "14px" }}>
                        {element.reportype}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {element.status == "In-Review" ? (
                        <div>
                          <div>
                            <Typography
                              style={{
                                color: "Orange",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              In Review
                            </Typography>{" "}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <Typography
                              style={{
                                color: "Green",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Resolved
                            </Typography>{" "}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    {/* <TableCell align="right">Action</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div>
        {/* <CHAT /> */}
        <Chat />
      </div>
    </>
  );
}

export default Viewcomplaints;
