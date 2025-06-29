import React, { useEffect, useState } from "react";
import { CmpService } from "../../service/CmpService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  TablePagination,
  Button,
  Stack,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const CategoryContentTable = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [filteredContent, setFilteredContent] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await CmpService.fetchAllContent();
        const userId = Number(localStorage.getItem("userId"));

        const data = res.data.filter(
          (item) =>
            Number(item.categoryId) === Number(categoryId) &&
            Number(item.userId) === userId
        );

        setFilteredContent(data);
      } catch (error) {
        console.error("Failed to fetch content", error);
      }
    };

    fetchContent();
  }, [categoryId]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => alert(`Edit question ID: ${id}`);
  const handleDelete = (id) => alert(`Delete question ID: ${id}`);

  const getDisplayedContent = () =>
    filteredContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      {/* Back & Forward Buttons */}
      <Container maxWidth="md" sx={{ position: "relative", mb: 2 }}>
        <Box sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(1)}
          >
            Forward
          </Button>
        </Box>
      </Container>

      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Questions in Category {categoryId}
        </Typography>

        {filteredContent.length > 0 ? (
          <Paper elevation={2}>
            <Table>
              <TableHead sx={{ backgroundColor: "#000" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Question</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Options</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Correct</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getDisplayedContent().map((item) => (
                  <TableRow key={item.contentId}>
                    <TableCell>
                      {item.content?.text || item.content?.question || "—"}
                    </TableCell>
                    <TableCell>
                      {item.content?.options ? (
                        Array.isArray(item.content.options) ? (
                          item.content.options.join(" | ")
                        ) : (
                          <>
                            A: {item.content.options.a} | B: {item.content.options.b}
                            <br />
                            C: {item.content.options.c} | D: {item.content.options.d}
                          </>
                        )
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {item.content.correctOption || item.content.answer || "—"}
                    </TableCell>
                    <TableCell>{item.content.description || "—"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => handleEdit(item.contentId)}>
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(item.contentId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredContent.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Typography sx={{ mt: 2 }}>
            No questions found for this category and user.
          </Typography>
        )}
      </Container>
    </Box>
  );
};
