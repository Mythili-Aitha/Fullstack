import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [uid, setUid] = useState("");
  const [pid, setPid] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleButton(event) {
    event.preventDefault();
    let user = { uid, pid };
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Correct format
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response Data:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Invalid username or password");
      });
  }

  return (
    <form onSubmit={handleButton}>
      <h2>Welcome ! Enter Credentials</h2>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Username"
          type="text"
          sx={{ p: 1 }}
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Password"
          type="password"
          sx={{ p: 1 }}
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
        <br />
        {message && <Typography color="error">{message}</Typography>}
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </form>
  );
}
