import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import QuizIcon from "@mui/icons-material/Quiz";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import FilterListIcon from "@mui/icons-material/FilterList";

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "User Details",
      description: "Manage all registered users and their roles.",
      icon: <GroupIcon fontSize="large" />,
      path: "/admin/registerFetchAll",
    },
    {
      title: "Category",
      description: "Create, view and manage quiz categories.",
      icon: <CategoryIcon fontSize="large" />,
      path: "/admin/fetchAllCategory",
    },
    {
      title: "Content",
      description: "Add, update and review quiz content.",
      icon: <QuizIcon fontSize="large" />,
      path: "/admin/fetchAllContent",
    },
    {
      title: "User Quiz History",
      description: "Review quiz attempts and performance history.",
      icon: <HistoryIcon fontSize="large" />,
      path: "/admin/fetchAllUserhistory",
    },
    {
      title: "Rewards",
      description: "Manage and assign rewards catalog.",
      icon: <StarIcon fontSize="large" />,
      path: "/admin/fetchAllReward",
    },
    {
      title: "Category&Content",
      description: "View content filtered by category.",
      icon: <FilterListIcon fontSize="large" />,
      path: "/admin/CategorySelector",
    },
  ];

  const cardColors = [
    "#f9fbe7", "#e0f7fa", "#f3e5f5",
    "#fff3e0", "#e8f5e9", "#fce4ec", "#e3f2fd",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: 'url("https://images.unsplash.com/photo-1581093588401-8008ef7d9634")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "83vh",
        backgroundColor: "rgba(206, 199, 199, 0.7)", 
        py: 6,
      }}
    >
      {/* Light overlay box */}
      <Box
        sx={{
          backgroundColor: "rgba(206, 199, 199, 0.7)", // light color with opacity
          borderRadius: 2,
          mx: 4,
          py: 4,
          px: 2,
        }}
      >
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  onClick={() => navigate(feature.path)}
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(145deg, ${cardColors[index % cardColors.length]} 40%, #ffffff)`,
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ px: 2, py: 2 }}>
                    <Box textAlign="center" mb={2}>
                      <Box sx={{ fontSize: 40, color: "#424242" }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="subtitle1"
                      align="center"
                      fontWeight={600}
                      gutterBottom
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color="text.secondary"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
