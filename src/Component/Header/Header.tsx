import React, { useState } from "react";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";
import Profiles from "./Profile/Profile";
import Sidebar from "../Sidebar/Sidebar";
import { red } from "@mui/material/colors";

const Header: React.FC = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      <AppBar className="header" style={{ backgroundColor: "#0071A6" }}>
        <Toolbar>
          <Typography variant="h6">SoulSoft CRM</Typography>
          <div className="profile-icon-container">
            <AccountCircleIcon
              className="profile-icon"
              onClick={handleProfileClick}
            />
          </div>
        </Toolbar>
      </AppBar>
      {showProfile && (
        <div className="profile-popup">
          <Profiles />
        </div>
      )}
    </div>
  );
};

export default Header;
