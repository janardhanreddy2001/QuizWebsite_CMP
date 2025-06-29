import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import {
  Card,
  CardHeader,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button as MuiButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const FetchUserHistory = () => {
  const [userHistories, setUserHistories] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUserHistory();
  }, []);

  const fetchAllUserHistory = async () => {
    try {
      const response = await CmpService.fetchAlluserHistory();
      setUserHistories(response.data);
    } catch (error) {
      alert("Something went wrong while fetching user history.");
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const filteredHistories = userHistories.filter(
    (uh) => uh.userId === parseInt(userId)
  );

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", padding: 3 }}>
      {/* ✅ Back Button */}
      <MuiButton
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          textTransform: "none",
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          color: "purple",
          borderColor: "purple",
          "&:hover": {
            backgroundColor: "#f3e5f5",
          },
        }}
      >
        Back
      </MuiButton>

      <Card sx={{ marginTop: 8, borderRadius: 2, boxShadow: 3 }}>
        <CardHeader title="Your Quiz History" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>#</TableCell>
                  <TableCell sx={{ color: "white" }}>Question</TableCell>
                  <TableCell sx={{ color: "white" }}>User Option</TableCell>
                  <TableCell sx={{ color: "white" }}>Each Question Points</TableCell>
                  <TableCell sx={{ color: "white" }}>Total Score</TableCell>
                  <TableCell sx={{ color: "white" }}>Attempted Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistories.length > 0 ? (
                  filteredHistories.map((uh, index) => (
                    <TableRow key={uh.historyId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{uh.responseContent?.question || "N/A"}</TableCell>
                      <TableCell>{uh.responseContent?.userOption?.toUpperCase()}</TableCell>
                      <TableCell>{uh.eachQuestionpoints}</TableCell>
                      <TableCell>{uh.totalScore}</TableCell>
                      <TableCell>{formatDate(uh.attemptedDate)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No history available for your account.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
