import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // ✅ Import icons
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function AuthPage() {
  const [tabIndex, setTabIndex] = useState(1); // 0 = Login, 1 = Register
  const navigate = useNavigate();

  // ** Login State **
  const { uid, setUid } = useContext(UserContext);
  const [pid, setPid] = useState("");
  const [loginError, setLoginError] = useState("");

  // ** Registration State **
  const [name, setName] = useState("");
  const [usid, setUsid] = useState("");
  const [psid, setPsid] = useState("");
  const [rpsid, setRpsid] = useState("");
  const [num, setNum] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ✅ Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // ✅ Handles tab switching
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setLoginError("");
    setRegisterError("");
    setPasswordError("");
  };

  // ✅ Handles Login
  const handleLogin = async (event) => {
    event.preventDefault();
    let user = { uid, pid };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      //   console.log("Login Response:", data);
      if (response.ok) {
        navigate("/dashboard"); // ✅ Navigate on successful login
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setLoginError("Network error, try again");
    }
  };

  // ✅ Handles Registration
  const handleRegister = async (event) => {
    event.preventDefault();

    if (psid !== rpsid) {
      setPasswordError("Passwords do not match!");
      return;
    }

    let user = { name, usid, psid, num };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        setRegisterError("Registration successful! Please log in.");
        setTabIndex(0);
        setPasswordError(""); // ✅ Reset error on success
      } else {
        if (data.error.includes("already exsists")) {
          setRegisterError("User already registered. Please log in!!");
        } else {
          setRegisterError(data.error || "Registration failed");
        }
      }
    } catch (error) {
      setRegisterError("Network error, try again");
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
      <h2 style={{ color: "#692dc6", fontSize: "24px", textAlign: "center" }}>
        Welcome To Self-Heal !!
      </h2>

      {/* ✅ Tabs for Login & Register */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {/* ✅ Login Form */}
      {tabIndex === 0 && (
        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Username"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Password"
              type="password"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
            />
            {loginError && <Typography color="error">{loginError}</Typography>}
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </form>
      )}

      {/* ✅ Registration Form */}
      {tabIndex === 1 && (
        <form onSubmit={handleRegister}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Username"
              value={usid}
              onChange={(e) => setUsid(e.target.value)}
            />

            {/* ✅ Password Field with Eye Icon */}
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={psid}
              onChange={(e) => setPsid(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ✅ Confirm Password Field with Error Handling */}
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Re-Type Password"
              type={showConfirmPassword ? "text" : "password"}
              value={rpsid}
              onChange={(e) => setRpsid(e.target.value)}
              error={!!passwordError} // ✅ Red border when error
              helperText={passwordError} // ✅ Shows error message below field
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Phone Number"
              type="tel" // ✅ Use tel instead of number
              value={num}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // ✅ Remove non-numeric characters
                if (value.length <= 10) {
                  setNum(value);
                }
              }}
              error={num.length > 0 && num.length !== 10} // ✅ Show red border if not 10 digits
              helperText={
                num.length > 0 && num.length !== 10
                  ? "Phone number must be 10 digits"
                  : ""
              }
              inputProps={{ maxLength: 10 }} // ✅ Prevent entering more than 10 digits
            />

            <Divider />
            {registerError && (
              <Typography color="error">{registerError}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={!!passwordError}
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </Card>
  );
}
