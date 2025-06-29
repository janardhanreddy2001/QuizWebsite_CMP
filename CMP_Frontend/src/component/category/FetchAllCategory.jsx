import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Box,
  Grid,
} from "@mui/material";

export const FetchAllCategory = () => {
  const [categoryAll, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const response = await CmpService.fetchAllCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await CmpService.deleteCategory(categoryId);
      alert("Category deleted successfully");
      fetchAll();
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Something went wrong while deleting the category");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="All Categories"
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/createCategory")}
          >
            Add Category
          </Button>
        }
        sx={{ paddingBottom: 0 }}
      />

      {/* Back and Forward Buttons Below Header */}
      <Grid container justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(1)}
          endIcon={<ArrowForwardIcon />}
        >
          Forward
        </Button>
      </Grid>

      <CardContent>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>CategoryId</TableCell>
                <TableCell sx={{ color: "white" }}>CategoryType</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Points</TableCell>
                <TableCell sx={{ color: "white" }}>CreateDate</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedDate</TableCell>
                <TableCell sx={{ color: "white" }}>CreatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryAll.length > 0 ? (
                categoryAll.map((category) => (
                  <TableRow
                    key={category.categoryId}
                    hover
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(190, 50, 157, 0.1)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{category.categoryId}</TableCell>
                    <TableCell>{category.categoryType}</TableCell>
                    <TableCell>{category.discription}</TableCell>
                    <TableCell>{category.points}</TableCell>
                    <TableCell>{formatDate(category.createdAt)}</TableCell>
                    <TableCell>{formatDate(category.updatedAt)}</TableCell>
                    <TableCell>{category.createdBy}</TableCell>
                    <TableCell>{category.updatedBy}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => navigate(`/admin/updateCategory/${category.categoryId}`)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(category.categoryId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
