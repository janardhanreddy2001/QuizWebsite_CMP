import { useState, useEffect } from "react";
import { CmpService } from "../../service/CmpService";
import { Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const CreateContent = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [contents, setContents] = useState([
    {
      content: {
        questionId: "",
        text: "",
        options: { a: "", b: "", c: "", d: "" },
        correctOption: "",
        duration: "",
        description: "",
      },
      userId: userId,
    },
  ]);

  const [categoryId, setCategoryId] = useState("");
  const [categoryAll, setCategory] = useState([]);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const response = await CmpService.fetchAllCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...contents];
    updated[index].content[field] = value;
    setContents(updated);
  };

  const handleOptionChange = (index, option, value) => {
    const updated = [...contents];
    updated[index].content.options[option] = value;
    setContents(updated);
  };

  const addQuestionBlock = () => {
    setContents([
      ...contents,
      {
        content: {
          questionId: "",
          text: "",
          options: { a: "", b: "", c: "", d: "" },
          correctOption: "",
          duration: "",
          description: "",
        },
        userId: userId,
      },
    ]);
  };

  const removeQuestionBlock = (index) => {
    const updated = [...contents];
    updated.splice(index, 1);
    setContents(updated);
  };

  const onSubmitHandling = async (e) => {
    e.preventDefault();

    const finalData = contents.map((item) => ({
      ...item,
      categoryId: categoryId,
    }));

    try {
      for (const contentObj of finalData) {
        const payload = {
          content: contentObj.content,
          userId: userId,
          categoryId: categoryId,
        };

        const jsonSize = JSON.stringify(payload).length;
        if (jsonSize > 50000) {
          alert(`A question is too large. Please shorten it.`);
          return;
        }

        await CmpService.createContent(payload);
      }

      alert("All questions created successfully");
      navigate("/admin/fetchAllContent");
    } catch (error) {
      console.error("Error submitting contents:", error);
      alert("Something went wrong while creating questions");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 2 }}>
      {/* Top Navigation Buttons */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          py: 2,
          px: 0,
          position: "relative",
        }}
      >
        <Container maxWidth="md">
          {/* Back Button - Left Corner */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
            }}
          >
            <Button
              style={{
                backgroundColor: "purple",
                borderColor: "purple",
                color: "white",
                fontWeight: "600",
                fontFamily: "Georgia, serif",
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon /> Back
            </Button>
          </Box>

          {/* Forward Button - Right Corner */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
            }}
          >
            <Button
              variant="outline-dark"
              onClick={() => navigate(1)}
            >
              Forward <ArrowForwardIcon />
            </Button>
          </Box>
        </Container>
      </Box>

      <Typography variant="h5" align="center" color="black" gutterBottom>
        Create Multiple Questions
      </Typography>

      {/* Form Section */}
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Card sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
          <CardContent>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Form onSubmit={onSubmitHandling}>
                <FormGroup className="mb-4">
                  <FormLabel>Select Category</FormLabel>
                  <FormControl
                    as="select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {categoryAll.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryType}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                {contents.map((item, index) => (
                  <Paper elevation={1} sx={{ p: 3, mb: 3 }} key={index}>
                    <Typography variant="h6" gutterBottom>
                      Question {index + 1}
                    </Typography>

                    <FormGroup className="mb-3">
                      <FormLabel>Question ID</FormLabel>
                      <FormControl
                        type="text"
                        value={item.content.questionId}
                        onChange={(e) =>
                          handleContentChange(index, "questionId", e.target.value)
                        }
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <FormLabel>Question Text</FormLabel>
                      <FormControl
                        type="text"
                        value={item.content.text}
                        onChange={(e) =>
                          handleContentChange(index, "text", e.target.value)
                        }
                        required
                      />
                    </FormGroup>

                    {["a", "b", "c", "d"].map((opt) => (
                      <FormGroup className="mb-3" key={opt}>
                        <FormLabel>Option {opt.toUpperCase()}</FormLabel>
                        <FormControl
                          type="text"
                          value={item.content.options[opt]}
                          onChange={(e) =>
                            handleOptionChange(index, opt, e.target.value)
                          }
                          required
                        />
                      </FormGroup>
                    ))}

                    <FormGroup className="mb-3">
                      <FormLabel>Correct Option</FormLabel>
                      <FormControl
                        type="text"
                        value={item.content.correctOption}
                        onChange={(e) =>
                          handleContentChange(index, "correctOption", e.target.value)
                        }
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <FormLabel>Duration (seconds)</FormLabel>
                      <FormControl
                        type="number"
                        value={item.content.duration}
                        onChange={(e) =>
                          handleContentChange(index, "duration", e.target.value)
                        }
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <FormLabel>Description</FormLabel>
                      <FormControl
                        as="textarea"
                        rows={3}
                        value={item.content.description}
                        onChange={(e) =>
                          handleContentChange(index, "description", e.target.value)
                        }
                        required
                      />
                    </FormGroup>

                    {contents.length > 1 && (
                      <Button
                        variant="danger"
                        onClick={() => removeQuestionBlock(index)}
                        className="mt-2"
                      >
                        Remove Question
                      </Button>
                    )}
                  </Paper>
                ))}

                <Button variant="secondary" onClick={addQuestionBlock} className="w-100 mb-3">
                  + Add Another Question
                </Button>

                <Button variant="primary" type="submit" className="w-100">
                  Submit All Questions
                </Button>
              </Form>
            </Paper>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
  