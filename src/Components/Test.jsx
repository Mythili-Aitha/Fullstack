import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Test() {
  const [uid, setUid] = useState("");

  function handleButton(event) {
    event.preventDefault();

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }), // Correct format
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
    <form onSubmit={handleButton}>
      <TextField
        variant="outlined"
        size="medium"
        sx={{ p: 1 }}
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <p>HI</p>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
