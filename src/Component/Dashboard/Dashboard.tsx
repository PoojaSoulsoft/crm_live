import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Leads from "../Sidebar/Pages/Lead/Leads";
import { Button, Input, Container, Grid, Card } from "@mui/material";
import "./Dashboard.css";
import Login from "../Login/Login";
import axios from "axios";
import Booking from "../Sidebar/Pages/Booking/Booking";
import Cards from "./Components/Card/Cards";
import Main from "./Main1";
// import Main from "./Main";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("excel_file", file);

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.post("/api/leads/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully", response.data.msg);
      } else {
        console.log("Error uploading file", response.status);
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
        }}
      >
        <Header />
        <Container style={{ padding: "2px", marginTop: "4px" }}>
          {/* <Button onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </Button> */}
          {/* <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
          >
            Upload Excel
          </Button> */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Routes>
                <Route path="leads" element={<Leads />} />
                <Route path="booking" element={<Booking />} />
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="main" element={<Main/>}/>
                <Route path="*" element={<div>404 Not Found</div>} />{" "}
                {/* Fallback route */}
              </Routes>
            </Grid>
          </Grid>
        </Container>
        <Outlet /> {/* Renders nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;
