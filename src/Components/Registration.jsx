import { Box, Button, Card, Divider, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");
  const [usid, setUsid] = useState("");
  const [psid, setPsid] = useState("");
  const [rpsid, setRpsid] = useState("");
  const [num, setNum] = useState("");
  const [error, setError] = useState("");
  function handleButton(event) {
    event.preventDefault();
    if (psid !== rpsid) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Passwords Match! Proceeding with Registration...");
    let user = { name, usid, psid, rpsid, num };
    fetch("http://localhost:3000/api/register", {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "flex-start",
        padding: 3,
        justifyContent: "center",
        backgroundColor: "#d4dd96",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <h2>Welcome to Self-Heal !!</h2>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ p: 1 }}
        />

        <TextField
          size="small"
          variant="outlined"
          placeholder="Username"
          type="text"
          value={usid}
          onChange={(e) => setUsid(e.target.value)}
          sx={{ p: 1 }}
        />

        <TextField
          size="small"
          variant="outlined"
          placeholder="Password"
          type="password"
          value={psid}
          onChange={(e) => setPsid(e.target.value)}
          sx={{ p: 1 }}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Re-Type Password"
          type="password"
          value={rpsid}
          onChange={(e) => setRpsid(e.target.value)}
          sx={{ p: 1 }}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Phone Number..."
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          sx={{ p: 1 }}
        />
        <Divider />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" onClick={handleButton}>
          Register
        </Button>
      </Box>
    </Card>
  );
}
