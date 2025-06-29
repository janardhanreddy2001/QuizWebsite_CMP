import { useEffect, useState } from "react";
import { CmpService } from "../../service/CmpService";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const FetchAllGift = () => {
  const [rewardList, setRewardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllRewards();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const loadAllRewards = async () => {
    try {
      const response = await CmpService.fetchAllAssigned();
      setRewardList(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      alert("Failed to fetch rewards");
    }
  };

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

      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          title="All Rewards Assigned"
          action={
            <Button variant="contained" color="primary" onClick={() => navigate("/admin/createAssigned")}>
              Add Reward
            </Button>
          }
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>AssignedID</TableCell>
                  <TableCell sx={{ color: "white" }}>AssignedDate</TableCell>
                  <TableCell sx={{ color: "white" }}>HistoryID</TableCell>
                  <TableCell sx={{ color: "white" }}>RewardID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rewardList.length > 0 ? (
                  rewardList.map((reward) => (
                    <TableRow
                      key={reward.giftAssignedId}
                      hover
                      sx={{ "&:hover": { backgroundColor: "rgba(190, 50, 157, 0.1)" } }}
                    >
                      <TableCell>{reward.giftAssignedId}</TableCell>
                      <TableCell>{formatDate(reward.assigned)}</TableCell>
                      <TableCell>{reward.historyId || "N/A"}</TableCell>
                      <TableCell>{reward.rewardId || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No rewards found
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
