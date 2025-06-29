import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import { Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Paper, Typography, Container, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const UpdateReward = () => {
  const loggedInUserId = localStorage.getItem("userId");
  const { rewardId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rewardType: {
      name: "",
      url: "",
      description: ""
    },
    userId: loggedInUserId
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (rewardId) {
      CmpService.getByIdReward(rewardId)
        .then((res) => {
          const reward = res.data;
          setForm({
            rewardType: {
              name: reward.rewardType?.name || "",
              url: reward.rewardType?.url || "",
              description: reward.rewardType?.description || ""
            },
            userId: loggedInUserId  // ✅ Always use logged-in user's ID
          });
        })
        .catch((err) => {
          console.error("Error loading reward:", err);
          alert("Failed to load reward details.");
          navigate("/admin/fetchAllreward");
        });
    }
  }, [rewardId, navigate, loggedInUserId]);

  const validateFields = () => {
    const { name, url, description } = form.rewardType;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!url) newErrors.url = "URL is required.";
    if (!description) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      rewardType: {
        ...prev.rewardType,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const payload = {
      rewardType: form.rewardType,
      userId: form.userId
    };

    try {
      const response = await CmpService.updateByIdReward(rewardId, payload);
      if (response.data.Status?.toLowerCase() === "seccuss") {
        alert("Reward updated successfully");
        navigate("/admin/fetchAllreward");
      } else {
        alert("Failed to update reward");
        navigate("/admin/fetchAllreward");
      }
    } catch (error) {
      console.error("Error updating reward:", error);
      alert("Something went wrong");
    }
  };

  return (
     <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Reward
        </Typography>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Reward URL</FormLabel>
            <FormControl
              type="url"
              name="url"
              value={form.rewardType.url}
              onChange={handleChange}
              isInvalid={!!errors.url}
              placeholder="https://quizchamp.com/rewards/gift"
            />
            <Form.Text className="text-danger">{errors.url}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Reward Name</FormLabel>
            <FormControl
              type="text"
              name="name"
              value={form.rewardType.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Gift Card"
            />
            <Form.Text className="text-danger">{errors.name}</Form.Text>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Reward Description</FormLabel>
            <FormControl
              as="textarea"
              name="description"
              value={form.rewardType.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Enter a short reward description"
            />
            <Form.Text className="text-danger">{errors.description}</Form.Text>
          </FormGroup>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Update Reward
          </Button>
        </Form>
      </Paper>
    </Container>
    </Box>
  );
};
