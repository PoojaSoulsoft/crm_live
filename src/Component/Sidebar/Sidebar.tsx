import React, { useState } from "react";
import { Button, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <List>
        <ListItem onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={() => navigate("/leads")}>
          <ListItemText primary="lead" />
        </ListItem>
        <ListItem onClick={() => navigate("/potentiallead")}>
          <ListItemText primary="Potential Lead" />
        </ListItem>
        <ListItem onClick={() => navigate("/booking")}>
          <ListItemText primary="Booking" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Installation" />
        </ListItem>
        <ListItem>
          <ListItemText primary="AMC" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
