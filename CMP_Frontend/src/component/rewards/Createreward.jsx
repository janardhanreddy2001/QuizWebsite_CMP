import { useState } from "react";
import { CmpService } from "../../service/CmpService";
import { Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import {
  Paper,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

export const Createreward = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rewardType: {
      name: "",
      url: "",
      description: "",
    },
    userId: userId,
  });

  const [errors, setErrors] = useState({});

  // Snackbar states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showSuccess = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const validateFields = () => {
    const newErrors = {};
    const { name, url, description } = form.rewardType;

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
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const payload = {
      rewardType: form.rewardType,
      userId: userId,
    };

    try {
      const response = await CmpService.createreward(payload);
      if (response.data?.Status?.toLowerCase() === "seccuss") {
        showSuccess("Reward created successfully");
        setTimeout(() => navigate("/admin/fetchAllreward"), 1500);
      } else {
        alert("Failed to create reward");
      }
    } catch (error) {
      console.error("Error creating reward:", error);
      alert("Something went wrong");
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
       </Box>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Reward
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
            />
            <Form.Text className="text-danger">{errors.description}</Form.Text>
          </FormGroup>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Submit
          </Button>
        </Form>
      </Paper>

      {/* Snackbar Success Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
    </Box>
  );
};
