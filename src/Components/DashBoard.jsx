import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Box,
  Card,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const options = ["Ascending A-Z", "Descending Z-A"];

export default function DashBoard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // Stores fetched items
  const [sortedItems, setSortedItems] = useState([]); // Stores sorted items
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 for Ascending, 1 for Descending
  const { uid, setUid } = useContext(UserContext);

  // ✅ Fetch items from API
  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((json) => {
        console.log("Items from backend:", json);
        if (Array.isArray(json)) {
          setItems(json);
          setSortedItems(json); // ✅ Initialize sorted items
        }
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // ✅ Open/Close Sorting Menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    sortItems(index);
    handleMenuClose();
  };

  // ✅ Sorting logic (for array of strings)
  const sortItems = (index) => {
    const sorted = [...items].sort((a, b) =>
      index === 0 ? a.localeCompare(b) : b.localeCompare(a)
    );
    setSortedItems(sorted);
  };

  // ✅ Filter items based on search input
  const filteredItems = sortedItems.filter(
    (item) =>
      typeof item === "string" &&
      item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Split items into chunks for column display
  const chunkData = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunks = chunkData(filteredItems, 10); // Split into columns of 10 rows each

  return (
    <>
      {items.length > 0 ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "#b18c28",
              alignItems: "start",
              fontFamily: "initial",
              fontStyle: "italic",
              textTransform: "capitalize",
            }}
          >
            {`Welcome to SELF-HEAL ${uid}`}
          </Typography>
          <Card
            sx={{
              padding: 3,
              maxWidth: "85%",
              margin: "auto",
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              {/* ✅ Search Bar */}
              <TextField
                sx={{
                  width: "60%",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  "& .MuiInput-underline:before": { borderBottom: "none" },
                }}
                size="medium"
                variant="standard"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* ✅ Sort Dropdown */}
              <ButtonGroup variant="text">
                <Button
                  size="small"
                  aria-controls={anchorEl ? "sort-menu" : undefined}
                  aria-expanded={Boolean(anchorEl)}
                  aria-label="select sorting order"
                  aria-haspopup="menu"
                  onClick={handleMenuOpen}
                >
                  <SwapVertIcon /> Sort
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* ✅ Multi-Column List with Vertical Dividers */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {chunks.map((chunk, columnIndex) => (
                <React.Fragment key={columnIndex}>
                  <Box sx={{ flex: 1 }}>
                    <List
                      sx={{ bgcolor: "background.paper", borderRadius: "4px" }}
                    >
                      {chunk.map((item, rowIndex) => (
                        <React.Fragment key={`${columnIndex}-${rowIndex}`}>
                          <ListItem
                            sx={{
                              justifyContent: "space-between",
                              cursor: "pointer",
                            }}
                          >
                            <ListItemText
                              primary={item}
                              onClick={() => navigate(item.toLowerCase())}
                            />
                            <IconButton edge="end">
                              <ChevronRightIcon />
                            </IconButton>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                  {/* ✅ Add vertical divider between columns */}
                  {columnIndex < chunks.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        margin: "0 8px",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Card>
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 5 }}>
          No data available
        </Typography>
      )}
    </>
  );
}
