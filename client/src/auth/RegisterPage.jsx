import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Link as MuiLink } from "@mui/material";
import { registerUser } from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call your register function here with username, email, and password
      const userData = await registerUser(username, email, password);
      setLoading(false);
      console.log(userData); // You can remove this line after verifying that registration works
      // Redirect the user or save the token to the state, etc.
      navigate('/profile');

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        const errorData = err.response.data.error;

        if (errorData.name === 'ValidationError') {
          const errorMessages = errorData.details.errors.map((error) => error.message).join(', ');
          setError(errorMessages);
          console.error(errorMessages);
        } else {
          const errorMessage = errorData.message;
          setError(errorMessage);
          console.error(errorMessage);
        }
      } else {
        const errorMessage = err.message || "An error occurred during registration.";
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
          />
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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <br />

          <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" underline="hover">
                Login
              </MuiLink>
            </Typography>

        </Box>
      </form>
    </Box>
  );
};

export default RegisterPage;
