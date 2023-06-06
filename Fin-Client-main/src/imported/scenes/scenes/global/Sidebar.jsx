import { useState, useEffect } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import { Button, Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import { FaWpexplorer } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { BsWalletFill } from "react-icons/bs";
import "./glb.css";
import { ToastContainer, toast } from "react-toastify";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initial_role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [islogged, setIslogged] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const picurl = localStorage.getItem("picurl");
  const name = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  function logout() {
    // toast.error("You Have been Logged Out");
    // localStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/auth/login");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIslogged(true);
    }
  });

  const handleClick = () => {
    window.open(
      `http://localhost:3006/login/${localStorage.getItem("email")}`,
      "_blank"
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} className="sidee">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  LEARNX
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* {picurl ? (
                  <Avatar src={picurl} />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "purple", padding: "20px" }}
                  >
                    {name[0]}
                  </Avatar>
                )} */}
                {islogged ? (
                  picurl ? (
                    <Avatar src={picurl} />
                  ) : (
                    <Avatar
                      style={{ backgroundColor: "purple", padding: "20px" }}
                    >
                      {name[0]}
                    </Avatar>
                  )
                ) : null}
              </Box>
              <Box textAlign="center">
                <Typography
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  style={{
                    fontFamily: "Open Sans",
                    fontSize: "22px",
                    fontWeight: "600",
                  }}
                >
                  {name}
                </Typography>
                <Typography color={colors.greenAccent[500]}>{role}</Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Questions
            </Typography>
            {role == "learner" && (
              <Item
                title="Ask a Question"
                to="/questions/add"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {role == "learner" && (
              <Item
                title="Asked Questions"
                to="/questions/myquestions"
                icon={<MdOutlineQuestionAnswer />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="View Questions"
              to="/questions/"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {role == "mentor" && (
              <Item
                title="Answered Questions"
                to="/answers"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {/* {role == "learner" && (
              <Item
                title="Answered Questions"
                to="/answers"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )} */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Services
            </Typography>
            {role == "learner" && (
              <Item
                title="Explore"
                to="/explore"
                icon={<FaWpexplorer />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <div onClick={handleClick}>
              <Item
                title="My Workspace"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                onClick={handleClick}
              />
            </div>
            {role == "learner" && (
              <Item
                title="Personalized Experience"
                to="/personalized"
                icon={<BiCustomize />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <Item
              title="Wallet"
              to="/wallet/"
              icon={<BsWalletFill />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Support"
              to="/complaints"
              icon={<BiSupport />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Profile"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title=""
              to="#"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <div onClick={logout}>
              <Item
                title="Logout"
                to="/auth/login"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
