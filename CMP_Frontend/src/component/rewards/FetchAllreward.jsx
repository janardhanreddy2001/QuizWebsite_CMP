import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";

export const FetchAllreward = () => {
  const [rewardAll, setRewardAll] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const fetchAll = async () => {
    try {
      const response = await CmpService.fetchallReward();
      setRewardAll(response.data || []);
    } catch (error) {
      console.error("Error fetching rewards", error);
      showSnackbar("Error fetching rewards", "error");
    }
  };

  const confirmDelete = (rewardId) => {
    setSelectedRewardId(rewardId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await CmpService.deleteByIdReward(selectedRewardId);
      const status = response.data?.Status || response.data?.status;

      if (status?.toLowerCase() === "success") {
        showSnackbar("Reward deleted successfully", "success");
        fetchAll();
      } else {
        showSnackbar("Failed to delete reward", "error");
      }
    } catch (error) {
      console.error("Error deleting reward", error);
      showSnackbar("Something went wrong while deleting the reward", "error");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedRewardId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr || isNaN(new Date(dateStr))) return "Not updated";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const parseRewardType = (rewardType = "") => {
    if (typeof rewardType === "string") {
      const url = rewardType.split(" | ")[0];
      const project = rewardType.includes("Project:")
        ? rewardType.split("Project:")[1]?.split("|")[0]?.trim()
        : "";
      const desc = rewardType.includes("Description:")
        ? rewardType.split("Description:")[1]?.trim()
        : "";
      return { url, name: project, desc };
    } else if (typeof rewardType === "object" && rewardType !== null) {
      return {
        url: rewardType?.url ?? "",
        name: rewardType?.name ?? rewardType?.project ?? "N/A",
        desc: rewardType?.description ?? rewardType?.desc ?? "N/A",
      };
    }
    return { url: "", name: "N/A", desc: "N/A" };
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
       </Box>
    <Box
      sx={{
        backgroundColor: "#f0f4f8", // ✅ light background color
        minHeight: "100vh",
        py: 4,
        px: 2,
      }}
    >
      <Card
        sx={{
          margin: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff", // ✅ white card
        }}
      >
        <CardHeader
          title="All Rewards"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/admin/createReward")}
            >
              Add Reward
            </Button>
          }
        />
        <CardContent>
          <TableContainer component={Paper} elevation={1}>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Reward ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Image</TableCell>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                  <TableCell sx={{ color: "white" }}>Created At</TableCell>
                  <TableCell sx={{ color: "white" }}>Updated At</TableCell>
                  <TableCell sx={{ color: "white" }}>Created By</TableCell>
                  <TableCell sx={{ color: "white" }}>Updated By</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rewardAll.length > 0 ? (
                  rewardAll.map((reward) => {
                    const { url, name, desc } = parseRewardType(reward.rewardType);
                    return (
                      <TableRow key={reward.rewardId}>
                        <TableCell>{reward.rewardId}</TableCell>
                        <TableCell>
                          <img
                            src={url}
                            alt={name}
                            style={{
                              height: 100,
                              width: 100,
                              objectFit: "cover",
                              borderRadius: 8,
                              border: "1px solid #ccc",
                            }}
                          />
                        </TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{desc}</TableCell>
                        <TableCell>{formatDate(reward.createdAt)}</TableCell>
                        <TableCell>{formatDate(reward.updatedAt)}</TableCell>
                        <TableCell>{reward.createdBy ?? "N/A"}</TableCell>
                        <TableCell>{reward.updatedBy ?? "N/A"}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              color="warning"
                              size="small"
                              onClick={() =>
                                navigate(`/admin/updateReward/${reward.rewardId}`)
                              }
                            >
                              Update
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => confirmDelete(reward.rewardId)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No rewards available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reward? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};
