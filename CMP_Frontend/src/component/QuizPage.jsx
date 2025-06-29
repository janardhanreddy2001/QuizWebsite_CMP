import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CmpService } from "../service/CmpService";
import {
  Snackbar,
  Alert,
  Button as MuiButton,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  LinearProgress,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const userId = localStorage.getItem("userId");

export const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timers, setTimers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [username, setUsername] = useState("");
  const [scoreSnackbar, setScoreSnackbar] = useState({ open: false, score: 0 });

  const { categoryId, createdAt } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadQuiz(categoryId, createdAt);
  }, [categoryId, createdAt]);

  const loadQuiz = async (categoryId, createdAt) => {
    try {
      const response = await CmpService.quizType(categoryId, createdAt);
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const checkQuiz = {
          contentId: data[0].contentId,
          categoryId: parseInt(categoryId),
          userId: parseInt(userId),
          attemptedDate: new Date().toISOString().split("T")[0],
        };

        const eligibilityRes = await CmpService.quizEntire(checkQuiz);
        if (eligibilityRes.data.Status === "Fail") {
          alert(eligibilityRes.data.Message);
          navigate("/");
          return;
        }

        setQuizData(data);
        setTimers(data.map((q) => parseInt(q.content?.duration) || 0));

        const userRes = await CmpService.getUser(parseInt(userId));
        setUsername(userRes.data.firstName + " " + userRes.data.lastName || "User");
      } else {
        setQuizData([]);
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      alert("Error loading quiz.");
    }
  };

  const saveAnswer = async (answer) => {
    try {
      const res = await CmpService.createQuizAttempt(answer);
      console.log("Saved to backend:", res.data);
    } catch (error) {
      console.error("Error saving answer:", error.response?.data || error.message);
    }
  };

  const handleSubmitQuiz = async () => {
    let total = 0;
    for (let ans of allAnswers) {
      total += ans.totalScore;
      await saveAnswer(ans);
    }

    setScoreSnackbar({ open: true, score: total });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!timers[currentQuestionIndex] || timers[currentQuestionIndex] <= 0) return;

    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = Math.max(updated[currentQuestionIndex] - 1, 0);

        if (updated[currentQuestionIndex] === 0) {
          if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          } else {
            handleSubmitQuiz();
          }
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, timers]);

  const handleAnswerClick = (option) => {
    if (showResult || selectedAnswer) return;

    setSelectedAnswer(option);
    setShowResult(true);

    const question = quizData[currentQuestionIndex];
    const correct = question.content.correctOption?.toLowerCase();
    const isCorrect = option === correct;

    const answerData = {
      userId: parseInt(userId),
      contentId: question.contentId,
      responseContent: {
        question: question.content.text,
        userOption: option,
      },
      eachQuestionpoints: isCorrect ? question.points : 0,
      totalScore: isCorrect ? question.points : 0,
    };

    setAllAnswers((prev) => [...prev, answerData]);
  };

  const next = () => {
    if (showResult && currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previous = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const current = quizData[currentQuestionIndex]?.content || {};
  const options = current.options || {};
  const correctOption = current.correctOption?.toLowerCase();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "2rem", position: "relative" }}>
      <MuiButton
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          textTransform: "none",
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          color: "purple",
          borderColor: "purple",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "#f3e5f5",
          },
        }}
      >
        Back
      </MuiButton>

      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" align="center" fontWeight={700}>
            🎯 Quiz Time
          </Typography>

          {quizData.length > 0 ? (
            <Card sx={{ mt: 3, p: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Q{currentQuestionIndex + 1}: {current.text}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={((timers[currentQuestionIndex] || 0) / (parseInt(current.duration) || 1)) * 100}
                  sx={{ height: 10, mb: 2 }}
                />
                <Typography color="secondary">
                  ⏳ Time Left: {timers[currentQuestionIndex]} seconds
                </Typography>

                <List>
                  {Object.keys(options).map((key) => {
                    const isSelected = selectedAnswer === key;
                    const isCorrect = correctOption === key;

                    let bg = "#fff";
                    if (showResult) {
                      if (isCorrect) bg = "#d4edda";
                      else if (isSelected) bg = "#f8d7da";
                    }

                    return (
                      <ListItem disablePadding key={key}>
                        <ListItemButton
                          disabled={showResult}
                          onClick={() => handleAnswerClick(key)}
                          sx={{ backgroundColor: bg, borderRadius: 2, mb: 1 }}
                        >
                          <ListItemText primary={`${key.toUpperCase()}. ${options[key]}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

                {showResult && (
                  <Box mt={2} p={2} sx={{ backgroundColor: "#f0f4f8", borderRadius: 2 }}>
                    {selectedAnswer === correctOption ? (
                      <Typography color="success.main">✅ Correct!</Typography>
                    ) : (
                      <>
                        <Typography color="error.main">❌ Incorrect</Typography>
                        <Typography>
                          <strong>Explanation:</strong> {current.description || "No explanation available."}
                        </Typography>
                      </>
                    )}
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                <Box display="flex" justifyContent="space-between">
                  <Button onClick={previous} disabled={currentQuestionIndex === 0}>
                    ⬅️ Previous
                  </Button>
                  {currentQuestionIndex === quizData.length - 1 ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSubmitQuiz}
                      disabled={!showResult}
                    >
                      ✅ Submit
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={next} disabled={!showResult}>
                      Next ➡️
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography align="center" sx={{ mt: 4 }}>
              No quiz found.
            </Typography>
          )}
        </Card>

        <Snackbar
          open={scoreSnackbar.open}
          autoHideDuration={2500}
          onClose={() => setScoreSnackbar({ ...scoreSnackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setScoreSnackbar({ ...scoreSnackbar, open: false })}
            sx={{ fontWeight: "bold", fontSize: "1rem", width: "100%" }}
          >
            🎉 {username}, you scored {scoreSnackbar.score} points!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};
