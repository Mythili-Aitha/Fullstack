import React, { useState } from "react";
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
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const options = ["Ascending A-Z", "Descending Z-A"];

export default function DashBoard({ itemsGet }) {
  const navigate = useNavigate();
  const items = itemsGet;
  console.log("vachai items", itemsGet);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedItems, setSortedItems] = useState(items);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 for Ascending, 1 for Descending

  useEffect(() => {
    sortItems(selectedIndex); // Sort initially based on selection
  }, [items]);
  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    sortItems(index);
    handleMenuClose();
  };

  // Sorting logic
  const sortItems = (index) => {
    const sorted = [...items].sort((a, b) =>
      index === 0 ? a.localeCompare(b) : b.localeCompare(a)
    );
    setSortedItems(sorted);
  };

  // Filtered items
  const filteredItems = sortedItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split items into chunks for columns
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
      {items ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "#b18c28",
              alignItems: "start",
              fontFamily: "initial",
              fontStyle: "italic",
            }}
          >
            SELF-HEAL
          </Typography>
          <Card
            sx={{
              padding: 3,
              maxWidth: "85%",
              margin: "auto",
              marginTop: "50px",
            }}
          >
            {/* Combined Horizontal Layout for Search Bar and Sort */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              {/* Search Bar */}
              <TextField
                sx={{
                  width: "60%",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  "& .MuiInput-underline:before": {
                    borderBottom: "none", // Remove the default underline
                  },
                }}
                size="meduim"
                padding="2"
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

              {/* Sort Dropdown */}
              <ButtonGroup variant="text">
                <Button
                  size="small"
                  aria-controls={isMenuOpen ? "sort-menu" : undefined}
                  aria-expanded={isMenuOpen ? "true" : undefined}
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
                open={isMenuOpen}
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

            {/* Multi-Column List with Vertical Divider */}
            <Box
              sx={{
                display: "flex",
                gap: 2, // Add space between columns
              }}
            >
              {chunks.map((chunk, columnIndex) => (
                <React.Fragment key={columnIndex}>
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <List
                      sx={{
                        bgcolor: "background.paper",
                        borderRadius: "4px",
                      }}
                    >
                      {chunk.map((item, rowIndex) => (
                        <React.Fragment key={`${columnIndex}-${rowIndex}`}>
                          <ListItem
                            sx={{
                              justifyContent: "space-between",
                              display: "flex",
                              alignItems: "center",
                              padding: 0.5,
                              cursor: "pointer",
                            }}
                          >
                            <ListItemText
                              primary={item}
                              onClick={() => {
                                navigate(item.toLowerCase());
                                console.log(`CLICKED: ${item}`);
                              }}
                            />
                            <IconButton
                              edge="end"
                              aria-label="Next"
                              onClick={() => {
                                console.log(`Icon clicked for: ${item}`);
                              }}
                            >
                              <ChevronRightIcon />
                            </IconButton>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                  {/* Add a vertical divider between columns */}
                  {columnIndex < chunks.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderColor: "rgba(0, 0, 0, 0.1)", // Light gray color
                        margin: "0 8px", // Add space around the divider
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Card>
        </>
      ) : (
        <p>Inka data rale</p>
      )}
    </>
  );
}
