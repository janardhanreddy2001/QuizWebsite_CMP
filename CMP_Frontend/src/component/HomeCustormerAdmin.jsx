import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../service/CmpService";

export const HomeCustomerAdmin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login on every render
  useEffect(() => {
    const checkLogin = () => {
      const userId = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");

      if (userId) {
        setIsLoggedIn(true);
        setUserName(name || "Customer");
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();

    // Optional: keep checking login status periodically
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch categories only if logged in
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await CmpService.fetchAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    if (isLoggedIn) {
      fetchAll();
    }
  }, [isLoggedIn]);

  const cards = [
    {
      title: "Take a Quiz",
      image:
        "https://previews.123rf.com/images/maxborovkov/maxborovkov1808/maxborovkov180800303/111279969-quiz-time-sign-colorful-brush-design-vector-background.jpg",
      description: "Start a new quiz and test your knowledge!",
      onClick: () => {
        const today = new Date().toISOString().split("T")[0];
        if (categories.length > 0) {
          navigate(`/customer/quizType/${categories[0].categoryId}/${today}`);
        } else {
          alert("No quiz categories found.");
        }
      },
    },
    {
      title: "View Rewards",
      image:
        "https://st2.depositphotos.com/1005979/5957/i/450/depositphotos_59570981-stock-illustration-rewards-word-in-colorful-stars.jpg",
      description: "Check your earned rewards and achievements.",
      onClick: () => navigate("/customer/fetchAllReward"),
    },
    {
      title: "Quiz History",
      image:
        "https://www.mcqbits.com/wp-content/uploads/2021/04/HIstory-Quiz-General-Studies-Questions-For-All-Compititive-Exams.jpg",
      description: "Review your past quiz performance and scores.",
      onClick: () => navigate("/customer/FetchUserHistory"),
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "50vh",
        background: "linear-gradient(to right, rgb(212, 198, 210))",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
        />
        <Typography
          variant="h4"
          sx={{ color: "#6a1b9a", fontWeight: "bold", fontFamily: "Georgia" }}
        >
          {isLoggedIn ? `Welcome, ${userName}!` : "Welcome to Quiz App"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {isLoggedIn
            ? "What would you like to do today?"
            : "Please log in to access your dashboard."}
        </Typography>
      </Box>

      {isLoggedIn ? (
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={card.image}
                  alt={card.title}
                  sx={{ height: 200, objectFit: "contain", p: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4527a0" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={card.onClick}
                    sx={{
                      backgroundColor: "#7e57c2",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#673ab7",
                      },
                    }}
                  >
                    Go
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", mt: 6 }}>
  <img
    src="https://cdn-icons-png.flaticon.com/512/5957/5957057.png"
    alt="Login Required"
    style={{ width: "250px", marginBottom: "20px" }}
  />
  <Typography variant="h6" sx={{ color: "#6a1b9a", mb: 2 }}>
    You must log in to view this content.
  </Typography>
  <Button
    variant="contained"
    color="secondary"
    onClick={() => navigate("/login")}
  >
    Go to Login
  </Button>
</Box>

      )}
    </Box>
  );
};
