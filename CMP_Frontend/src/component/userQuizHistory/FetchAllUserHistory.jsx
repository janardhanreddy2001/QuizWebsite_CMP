import { useEffect, useState } from "react";
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
  Button,
  Box,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export const FetchAllUserHistory = () => {
  const [userHistories, setUserHistories] = useState([]);
  const [userMap, setUserMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUserHistory();
  }, []);

  const fetchAllUserHistory = async () => {
    try {
      const response = await CmpService.fetchAlluserHistory();
      setUserHistories(response.data);
      fetchUserNames(response.data);
    } catch (error) {
      alert("Something went wrong while fetching user history.");
    }
  };

  const fetchUserNames = async (histories) => {
    const uniqueIds = [...new Set(histories.map((h) => h.userId))];
    const map = {};

    await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const res = await CmpService.getUser(id);
          const user = res.data;
          map[id] = `${user.firstName} ${user.lastName}`;
        } catch (err) {
          map[id] = "Unknown User";
        }
      })
    );

    setUserMap(map);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Box sx={{backgroundColor: "#f5f5f5"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
           backgroundColor: "#f5f5f5",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(1)}
        >
          Forward
        </Button>
      </Box >
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 , backgroundColor: "#f5f5f5",}}>
      {/* Navigation Buttons */}
      

      {/* User History Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 3,backgroundColor: "#f5f5f5" }}>
        <CardHeader title="User Quiz History" />
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
                  <TableCell sx={{ color: "white" }}>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userHistories.length > 0 ? (
                  userHistories.map((uh, index) => (
                    <TableRow key={uh.historyId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{uh.responseContent?.question || "N/A"}</TableCell>
                      <TableCell>{uh.responseContent?.userOption?.toUpperCase()}</TableCell>
                      <TableCell>{uh.eachQuestionpoints}</TableCell>
                      <TableCell>{uh.totalScore}</TableCell>
                      <TableCell>{formatDate(uh.attemptedDate)}</TableCell>
                      <TableCell>{userMap[uh.userId] || "Loading..."}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No history available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
    </Box>
  );
};
