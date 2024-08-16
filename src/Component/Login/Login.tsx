import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Login: React.FC = () => {
  const [loginUserName, setLoginUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        LoginUserName: loginUserName,
        Password: password,
      });

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.tokenDetails.idToken);
        setSuccess("Login successful! Redirecting..");
        setError("");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Invalid username or password");
        setSuccess("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred during login");
      }
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={loginUserName}
        onChange={(e) => setLoginUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Login;
