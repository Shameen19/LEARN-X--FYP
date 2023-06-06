import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button, Avatar, Menu, MenuItem, Grid } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import "./Navbar.scss";

const Navbar = () => {
  const name = localStorage.getItem("username");
  const picurl = localStorage.getItem("picurl");
  const [value, setvalue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const searchnow = (event) => {
    event.preventDefault();
    navigate(`/search/${value}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    // Handle settings logic here
    console.log("Settings clicked");
    handleMenuClose();
  };

  return (
    <Grid>
      <Grid className="navbar" style={{ justifyContent: "space-between" }}>
        <Grid
          item
          className="navbar__left"
          style={{ alignItems: "flex-start" }}
        >
          <div className="navbar">
            <div className="wrapper"></div>
          </div>
        </Grid>

        <Grid item>
          <div className="search">
            <form onSubmit={searchnow}>
              <input
                type="text"
                placeholder="Search...."
                onChange={(e) => setvalue(e.target.value)}
              />
              <Button variant="secondary" type="Submit">
                <SearchIcon color="purple" />
              </Button>
            </form>
          </div>
        </Grid>

        <Grid item>
          <div className="items">
            <div className="item">
              {picurl ? (
                <Avatar src={picurl} onClick={handleMenuOpen} />
              ) : (
                <Avatar
                  style={{ backgroundColor: "purple" }}
                  onClick={handleMenuOpen}
                >
                  {name[0]}
                </Avatar>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem onClick={handleSettingsClick}>
                  <SettingsBrightnessIcon sx={{ mr: 1 }} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <LanguageIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
