import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginUser } from "../api"; // Make sure to implement loginUser function in your api module
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await loginUser(email, password);
console.log("Login userData:", userData);

      setLoading(false);
      console.log(userData);
      // Redirect the user or save the token to the state, etc.
      localStorage.setItem("jwt", userData.jwt);

      // Dispatch the loginSuccess action with the user data and JWT
      dispatch(login({ user: userData.user, jwt: userData.jwt }));

      navigate("/profile");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        const errorData = err.response.data.error;

        if (errorData.name === "ValidationError") {
          const errorMessages = errorData.details.errors
            .map((error) => error.message)
            .join(", ");
          setError(errorMessages);
          console.error(errorMessages);
        } else {
          const errorMessage = errorData.message;
          setError(errorMessage);
          console.error(errorMessage);
        }
      } else {
        const errorMessage = err.message || "An error occurred during login.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: "24px" }}
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: "16px" }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <MuiLink component={Link} to="/register" underline="hover">
                Register
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
