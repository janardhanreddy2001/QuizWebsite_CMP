import { useState } from "react";
import { CmpService } from "../service/CmpService";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Snackbar, Alert, Button as MuiButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Login = () => {
  const [logIn, setLogIn] = useState({
    emailId: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const onHandling = (e) => {
    const { name, value } = e.target;
    setLogIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validation = () => {
    const newError = {};
    if (!logIn.emailId.trim()) {
      newError.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(logIn.emailId)) {
      newError.emailId = "Invalid email format";
    }

    if (!logIn.password.trim()) {
      newError.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        logIn.password
      )
    ) {
      newError.password =
        "Password must be at least 6 characters with 1 letter, 1 number, and 1 special character";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const onSubmitHandling = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const response = await CmpService.logInCreate(logIn);
      const { Status, Message, roleId, userId, Name } = response.data;

      if (Status === "Success") {
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", Name);

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          navigate(roleId === 1 ? "/admin" : "/");
        }, 2000);

        setLogIn({ emailId: "", password: "" });
      } else if (Status === "Fail") {
        const errorMessage = Message || "Incorrect email or password";

        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });

        if (errorMessage.toLowerCase().includes("not found")) {
          setTimeout(() => navigate("/register"), 2000);
        }
      } else {
        setSnackbar({
          open: true,
          message: "Unexpected response. Please try again.",
          severity: "warning",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong during login.",
        severity: "error",
      });
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative", // Important for absolute button
      }}
    >
      
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

      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img
              src="https://img.freepik.com/free-photo/view-3d-button_23-2149917544.jpg"
              alt="Login Illustration"
              style={{
                width: "100%",
                height: "500px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Card
              className="shadow p-4 mx-auto"
              style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={onSubmitHandling}>
                  <FormGroup className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="email"
                      name="emailId"
                      placeholder="Enter your email"
                      value={logIn.emailId}
                      onChange={onHandling}
                      isInvalid={!!error.emailId}
                    />
                    <FormText className="text-danger">{error.emailId}</FormText>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={logIn.password}
                      onChange={onHandling}
                      isInvalid={!!error.password}
                    />
                    <FormText className="text-danger">{error.password}</FormText>
                  </FormGroup>

                  <FormGroup className="mb-3 d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <a href="#" style={{ fontSize: "0.9rem" }}>
                      Forgot Password?
                    </a>
                  </FormGroup>

                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Login
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/register">Sign Up</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
