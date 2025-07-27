import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react";
import useAuthStore from "../../store/authStore";

import { auth, provider } from "../../firebase";
import AuthLayout from "./AuthLayout";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";


const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(false);
  const {
    palette: { info, background, primary, getContrastText },
    spacing,
  } = useTheme();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      setToken(token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console for more info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: background.default,
        p: spacing(2),
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: spacing(4),
          borderRadius: spacing(2),
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} color={primary.main}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" mb={4} color="text.secondary">
          Login to your account
        </Typography>

        <Button
          onClick={handleGoogleLogin}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: info.main,
            color: info.contrastText,
            fontWeight: "bold",
            py: 1.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: info.dark,
              color: getContrastText(info.dark),
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login with Google"}
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
