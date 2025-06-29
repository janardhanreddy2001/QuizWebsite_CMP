import React, { useEffect, useState } from "react";
import { CmpService } from "../../service/CmpService";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Button,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const cardColors = [
  "#e3f2fd", "#fce4ec", "#e8f5e9", "#fff3e0", "#f3e5f5", "#e0f7fa", "#f9fbe7"
];

export const CategorySelector = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CmpService.fetchAllCategory();
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      {/* Back and Forward Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="outlined" endIcon={<ArrowForwardIcon />} onClick={() => navigate(1)}>
          Forward
        </Button>
      </Box>

      {/* Main Category Cards */}
      <Container sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Browse by Category
        </Typography>

        <Grid container spacing={4}>
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={6} md={4} key={cat.categoryId}>
              <Card
                onClick={() => navigate(`/admin/categoryContent/${cat.categoryId}`)}
                sx={{
                  height: "100%",
                  p: 2,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${cardColors[index % cardColors.length]} 30%, #ffffff)`,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <CardContent>
                  <Box textAlign="center" mb={2}>
                    <CategoryIcon fontSize="large" color="primary" />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight={600}
                    gutterBottom
                  >
                    {cat.categoryType}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                  >
                    Click to explore quizzes in this category
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
