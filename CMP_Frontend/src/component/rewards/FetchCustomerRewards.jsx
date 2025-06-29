import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  Button as MuiButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const FetchCustomerRewards = () => {
  const [rewardAll, setRewardAll] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const response = await CmpService.fetchallReward();
      setRewardAll(response.data || []);
    } catch (error) {
      console.error("Error fetching rewards", error);
    }
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
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 2}}>
      {/* ✅ Back Button - fixed to top-left */}
      <MuiButton
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "fixed",
          top: 80,
          left: 20,
          zIndex: 1000,
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

      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          🎁 Available Rewards
        </Typography>
        <Grid container spacing={4}>
          {rewardAll.length > 0 ? (
            rewardAll.map((reward) => {
              const { url, name, desc } = parseRewardType(reward.rewardType);

              return (
                <Grid item key={reward.rewardId} xs={12} sm={6} md={4}>
                  <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={url || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={name}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box textAlign="center" width="100%" mt={4}>
              <Typography variant="h6" color="text.secondary">
                No rewards available.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
