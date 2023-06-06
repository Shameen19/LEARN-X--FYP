import {
  Box,
  IconButton,
  useTheme,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useNavigate, useState } from "react";
import { ColorModeContext, tokens } from "../../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const StyledSwitch = styled(Switch)({
  marginLeft: "auto",
});

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [value, setvalue] = useState("");

  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "Learner"
  );

  const switchroleby = async (email, role) => {
    try {
      const response = await fetch("http://localhost:1337/api/updaterole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: email,
          userrole: role,
        }),
      });

      if (response.status == "ok") {
        console.log("User role updated successfully");
        // Handle success, such as displaying a success message or refreshing user data
      } else {
        console.error("Failed to update user role");
        // Handle error, such as displaying an error message
      }
    } catch (error) {
      console.error("An error occurred", error);
      // Handle error, such as displaying an error message
    }
  };
  const handleSwitchToggle = () => {
    // alert("Before User role:" + userRole);

    // const newRole = userRole === "Learner" ? "Mentor" : "Learner";
    // alert("New User Role" + newRole);
    // localStorage.setItem("role", newRole);
    // setUserRole(newRole);
    // window.location.reload();

    var newRole = "";
    if (userRole === "learner") {
      newRole = "mentor";
      let useremail = localStorage.getItem("email");
      switchroleby(useremail, newRole);
    } else {
      newRole = "learner";
      let useremail = localStorage.getItem("email");
      switchroleby(useremail, newRole);
    }

    alert("New User Role" + newRole);
    localStorage.setItem("role", newRole);
    setUserRole(newRole);
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />

        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={() => {
            if (value.length > 0) {
              window.open(`http://localhost:3000/search/${value}`, "_blank");
            }
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledSwitch
              checked={userRole === "mentor"}
              onChange={handleSwitchToggle}
            />
            <Typography style={{ fontSize: "12px" }}>Mentor</Typography>
          </div>
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
