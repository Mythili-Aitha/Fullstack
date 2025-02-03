import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  List,
  ListItem,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  ButtonGroup,
  Menu,
  Button,
  MenuItem,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const options = ["Ascending A-Z", "Descending Z-A"];

export default function Banking() {
  const [openDrawer, setOpenDrawer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { test } = useParams();

  // ✅ Fetch data from backend
  const fetchNotifications = () => {
    fetch("http://localhost:3000/api/notifications")
      .then((res) => res.json())
      .then((json) => {
        console.log("Notifications from backend:", json);
        if (json.data) setNotification(json.data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ Sort and Filter Logic
  const filteredItems = notification
    .filter(
      (item) =>
        item &&
        item.title &&
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      selectedIndex === 0
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  // ✅ Sorting Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    handleMenuClose();
  };

  // ✅ Drawer Logic
  const handleOpenDrawer = (item) => setOpenDrawer(item);
  const handleCloseDrawer = () => setOpenDrawer(null);

  function capitalizeFirstLetter(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  }

  return (
    <>
      {/* ✅ Back Button */}
      <Button
        sx={{ display: "flex", alignItems: "flex-start" }}
        onClick={() => {
          console.log("Previous Page");
          navigate(-1);
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>

      {/* ✅ Main Card */}
      <Card
        sx={{ padding: 3, maxWidth: "85%", margin: "auto", marginTop: "50px" }}
      >
        <Box>
          {/* ✅ Search & Sorting */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "4px 0",
            }}
          >
            {/* Search Bar */}
            <TextField
              sx={{
                width: "60%",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
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
            {/* Filter Button */}
            <ButtonGroup variant="text">
              <Button
                sx={{ display: "flex", justifyContent: "start" }}
                size="medium"
              >
                <FilterListIcon />
                Filter
              </Button>
            </ButtonGroup>

            {/* Sort Dropdown */}
            <ButtonGroup variant="text">
              <Button
                sx={{ display: "flex", justifyContent: "start" }}
                size="small"
                aria-controls={isMenuOpen ? "sort-menu" : undefined}
                aria-haspopup="menu"
                onClick={handleMenuOpen}
              >
                <SwapVertIcon />
                Sort
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

          {/* ✅ Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "400",
              paddingTop: 2,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {`${capitalizeFirstLetter(test)} Notification Templates`}
          </Typography>

          {/* ✅ Notification List */}
          <List>
            {filteredItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingX: 1,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: 1,
                    }}
                  >
                    {/* Recipient */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Recipient
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        {item.Recipient}
                      </Typography>
                    </Box>
                    {/* Type */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Type
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        {item.Type}
                      </Typography>
                    </Box>
                    {/* Verification */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Verification
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        {item.Verification}
                      </Typography>
                    </Box>

                    {/* Trigger Button (Opens Drawer) */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Trigger
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          flex: 1,
                          color: "#238fc6",
                          textTransform: "none",
                          fontWeight: "600",
                          cursor: "pointer", // Makes it clickable
                        }}
                        onClick={() => handleOpenDrawer(item)}
                      >
                        {item.Trigger}
                      </Typography>
                    </Box>
                    {/* Template */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography
                        vvariant="body2"
                        sx={{
                          flex: 1,
                          color: "#37960d",
                          textTransform: "none",
                          fontWeight: "600",
                          cursor: "pointer", // Makes it clickable
                        }}
                      >
                        <DescriptionIcon />
                        {item.Template}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* ✅ Drawer for Notification Details */}
        <Drawer
          anchor="right"
          open={Boolean(openDrawer)}
          onClose={handleCloseDrawer}
        >
          <Box sx={{ width: 350, padding: 3 }}>
            <Typography variant="h6">Notification Details</Typography>
            <Divider sx={{ marginY: 2 }} />

            {openDrawer && (
              <>
                <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                  Title:
                </Typography>
                <Typography>{openDrawer.title}</Typography>

                <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                  Recipient:
                </Typography>
                <Typography>{openDrawer.Recipient}</Typography>

                <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                  Type:
                </Typography>
                <Typography>{openDrawer.Type}</Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              padding: 2,
              borderTop: "1px solid #ddd",
              textAlign: "center",
              marginTop: "auto", // Pushes footer to bottom
              backgroundColor: "#f5f5f5",
            }}
          >
            <Button variant="contained" fullWidth onClick={handleCloseDrawer}>
              Close
            </Button>
          </Box>
        </Drawer>
      </Card>
    </>
  );
}
