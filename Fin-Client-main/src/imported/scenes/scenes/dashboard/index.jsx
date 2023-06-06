import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../../native-components/theme";
import { mockTransactions } from "../../../native-components/data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { TfiCommentAlt, TfiComments } from "react-icons/tfi";
import Charts from "./Charts";
// import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { FaCommentAlt } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../native-components/components/Header";
import LineChart from "../../../native-components/components/LineChart";
import GeographyChart from "../../../native-components/components/GeographyChart";
import BarChart from "../../../native-components/components/BarChart";
import StatBox from "../../../native-components/components/StatBox";
import ProgressCircle from "../../../native-components/components/ProgressCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Donut from "../../../../components/DonutChart/Donut.jsx";
import TOPWEEK from "../../../../components/TopWeekQuestion/TopWeek.jsx";
import DialogTitle from "@mui/material/DialogTitle";

import "./ind.css";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [credits, setCredits] = useState();
  const [loggedin, setloggedin] = useState(false);
  const [automaticclose, setautomaticclose] = useState(true);

  const [message, setmessage] = useState("");
  const [username, setUsername] = useState("");

  const [qasked, setqasked] = useState(0);
  const [qanswered, setqanswered] = useState(0);
  const [tcomp, settcomp] = useState(0);
  const [toptags, settoptags] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  let dynamiccredits;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        const username1 = localStorage.getItem("username");
        setUsername(username1);
      }
    } else {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, []);

  const getchartdata = async () => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://localhost:1337/questions/question-answer-count"
      ); // assuming you have created the backend route
      setQuestionCount(res.data.questionCount);
      setAnswerCount(res.data.answerCount);
    };

    fetchData();
  };

  useEffect(() => {
    const gettotal = async () => {
      const email = localStorage.getItem("email");
      const response = await fetch(
        `http://localhost:1337/answers/totalbyuser/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.stat == "ok") {
        setqasked(data.totalquestions);
        setqanswered(data.totalanswers);
        settcomp(data.totalcomplaints);
      } else {
        toast.error(data.message);
      }
    };

    gettotal();
    gettoptags();
  }, [username]);

  const gettoptags = async () => {
    try {
      const response = await fetch(`http://localhost:1337/questions/tags/top`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.stat == "ok") {
        settoptags(data.toptags);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Shameen new Fetch code

  useEffect(() => {
    getcheckvalue();
    if (loggedin === false) {
      if (automaticclose === false) {
        handleClose();
      }
      setTimeout(() => {
        handleClickOpen();
      }, 1000);
    } else if (loggedin === true) {
      handleClose();
    }
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getcheckvalue = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:1337/credits/getcheckvalue",
        { email },
        config
      );
      setloggedin(res.data.check);
    } catch (error) {
      console.log("Error occured");
    }
  };

  const updatecredits = async () => {
    const email = localStorage.getItem("email");
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:1337/credits/assigncredits",
        { email },
        config
      );
      console.log("printing res now");
      console.log(res.data.check);
      setloggedin(res.data.check);
      console.log("printing logged in now ");
      console.log(loggedin);
      console.log("printing credits now");
      console.log(res.data.credits);
      setautomaticclose(false);
    } catch (error) {
      console.log("Error occured");
    }
  };

  // useEffect(() => {
  //    getallloaded();
  // })

  useEffect(() => {
    gettingcredits();
  });

  const gettingcredits = async () => {
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
      console.log("Dta at dashborrd is", data);
      dynamiccredits = data.data.credits;
      console.log("Credits i have got are ", dynamiccredits);
      setCredits(dynamiccredits);
    } catch (err) {
      console.log("Error recorded", err);
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={message} subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {!loggedin ? (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Credits Awarded 10
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span style={{ fontWeight: "bold" }}>Congratulations!!</span>
              </DialogContentText>
              <p>
                On your first sign up with us, Its a hundred credits gift from
                us.
              </p>
              <p>Happy to have you on board</p>
              <p>Click on "Claim" button to have your reward</p>
              <p>Happy learning and teaching!!!</p>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="success"
                onClick={updatecredits}
              >
                Claim
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="boxy"
        >
          <StatBox
            title={qasked}
            subtitle="Questions Asked"
            icon={
              <MdAddComment
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                size={28}
                color={colors.greenAccent[600]}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="boxy"
        >
          <StatBox
            title={qanswered}
            subtitle="Questions Answered"
            icon={
              <FaCommentAlt
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                size={28}
                color={colors.greenAccent[600]}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="boxy"
        >
          <StatBox
            title={credits}
            subtitle="Credits"
            progress="0.30"
            increase="+5%"
            icon={
              <GiMoneyStack
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                size={28}
                color={colors.greenAccent[600]}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="boxy"
        >
          <StatBox
            title={tcomp}
            subtitle="Complaints Initiated"
            progress="0.80"
            increase="+43%"
            icon={
              <BiSupport
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                size={28}
                color={colors.greenAccent[600]}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          className="boxy"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              ></Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Activity & Contributions (Last 8 Month)
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
            {/* <Charts /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          className="boxy"
          style={{ paddingRight: "14px", paddingLeft: "14px" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Top Domains This Week
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            // p="6px"
            style={{ paddingLeft: "15px", paddingRight: "15px" }}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Field Name
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Question Asked
            </Typography>{" "}
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Action
            </Typography>
          </Box>
          {toptags.map((tag) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              {/* <Box>
                <Typography color={colors.grey[100]}>{1}</Typography>
              </Box> */}
              <Box>
                <Typography
                  // color={colors.greenAccent[500]}
                  color="black"
                  variant="h5"
                  fontWeight="600"
                >
                  {tag._id.toUpperCase()}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{tag.count}</Box>
              <Box
                p="5px 10px"
                borderRadius="4px"
                backgroundColor="#70D8BD"
                onClick={() => {
                  navigate(`/search/${tag._id}`);
                }}
              >
                View
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          className="boxy"
        >
          <Typography variant="h5" fontWeight="600">
            Top Skills Among Users
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography> */}
            <Donut />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          className="boxy"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Top Questions Viewed This Week
          </Typography>

          <TOPWEEK />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
