import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { CmpService } from "../service/CmpService";

export const QuizPageHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await CmpService.fetchAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchAll();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const navButtonStyle = {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 1,
    fontFamily: "Georgia, serif",
    fontVariant: "small-caps",
    color: "rgb(223, 97, 194)",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgb(230, 202, 219)",
    },
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, rgb(241, 236, 243))",
        boxShadow: 1,
        minHeight: "60px",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side: Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button_100456-6868.jpg"
            alt="Logo"
            style={{ height: "40px", width: "40px", borderRadius: "5px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Georgia, serif",
              fontVariant: "small-caps",
              color: "rgb(136, 59, 151)",
            }}
          >
            CMP
          </Typography>
        </Box>

        {/* Right Side: Navigation Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {userId && roleId === "2" && (
            <>
              <Button component={Link} to="/" sx={navButtonStyle}>
                Home
              </Button>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  ...navButtonStyle,
                  color: open ? "white" : "rgb(223, 97, 194)",
                  backgroundColor: open ? "rgb(196, 160, 199)" : "transparent",
                }}
              >
                QuizType
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.categoryId}
                    component={Link}
                    to={`/customer/quizType/${cat.categoryId}/${new Date()
                      .toISOString()
                      .split("T")[0]}`}
                    onClick={() => setAnchorEl(null)}
                  >
                    {cat.categoryType}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                component={Link}
                to="/customer/FetchUserHistory"
                sx={navButtonStyle}
              >
                My History
              </Button>

              <Button
                component={Link}
                to="/customer/fetchAllReward"
                sx={navButtonStyle}
              >
                Rewards
              </Button>

              <Button onClick={handleLogout} sx={navButtonStyle}>
                Logout
              </Button>
            </>
          )}

          {/* Always show Login/Signup if not logged in */}
          {!userId && (
            <>
              <Button component={Link} to="/login" sx={navButtonStyle}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={navButtonStyle}>
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
