import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Register
  const navigate = useNavigate();

  // ** Login State **
  const [uid, setUid] = useState("");
  const [pid, setPid] = useState("");
  const [loginError, setLoginError] = useState("");

  // ** Registration State **
  const [name, setName] = useState("");
  const [usid, setUsid] = useState("");
  const [psid, setPsid] = useState("");
  const [rpsid, setRpsid] = useState("");
  const [num, setNum] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // ✅ Handles tab switching
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setLoginError(""); // Clear errors
    setRegisterError("");
  };

  // ✅ Handles Login Functionality
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
      if (response.ok) {
        navigate("/dashboard"); // ✅ Navigate on successful login
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setLoginError("Network error, try again");
    }
  };

  // ✅ Handles Registration Functionality
  const handleRegister = async (event) => {
    event.preventDefault();

    if (psid !== rpsid) {
      setRegisterError("Passwords do not match");
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
        setTabIndex(0); // ✅ Switch to Login tab after successful registration
      } else {
        setRegisterError(data.error || "Registration failed");
      }
    } catch (error) {
      setRegisterError("Network error, try again");
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
      <h2 style={{ color: "#692dc6", fontSize: "24px", textAlign: "center" }}>
        Welcome ! Enter Credentials
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
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseUp={handleMouseUpPassword}
                      onMouseDown={handleMouseDownPassword} // Prevents focus loss
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="Re-Type Password"
              type="password"
              value={rpsid}
              onChange={(e) => setRpsid(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseUp={handleMouseUpPassword}
                      onMouseDown={handleMouseDownPassword} // Prevents focus loss
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
            <Divider />
            {registerError && (
              <Typography color="error">{registerError}</Typography>
            )}
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </form>
      )}
    </Card>
  );
}
