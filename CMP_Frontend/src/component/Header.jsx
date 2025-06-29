import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navLinks = [
    { label: "Home", path: "/admin" },
    { label: "User Details", path: "/admin/registerFetchAll" },
    { label: "Category", path: "/admin/fetchAllCategory"  },
    { label: "Content", path: "/admin/fetchAllContent" },
    { label: "User Quiz History", path: "/admin/fetchAllUserhistory" },
    { label: "Grant User Gift", path: "/admin/fetchAllAssigned" },
    { label: "Rewards", path: "/admin/fetchAllReward" },
    {label:"Filter content", path:"/admin/CategorySelector"}
  ];

  const isActive = (path) => currentPath === path;

  const handleLogout = () => {
    // Clear any auth if needed (e.g., localStorage.removeItem("token"))
    localStorage.clear(); // optional: remove userId/token
    navigate("/"); // Redirect to user home
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
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1,
                fontFamily: "Georgia, serif",
                fontVariant: "small-caps",
                color: isActive(link.path) ? "white" : "rgb(223, 97, 194)",
                backgroundColor: isActive(link.path)
                  ? "rgb(196, 160, 199)"
                  : "transparent",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: isActive(link.path)
                    ? "rgb(196, 160, 199)"
                    : "rgb(230, 202, 219)",
                },
              }}
            >
              {link.label}
            </Button>
          ))}

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1,
              fontFamily: "Georgia, serif",
              fontVariant: "small-caps",
              color: "white",
              backgroundColor: "rgb(223, 97, 194)",
              "&:hover": {
                backgroundColor: "rgb(196, 160, 199)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
