import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "../api/documents";

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    palette: { secondary },
    spacing,
  } = useTheme();

  const {
    mutate: upload,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: uploadDocument,
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    upload(selectedFile);
  };

  return (
    <Box
      sx={{
        px: spacing(4),
        py: spacing(6),
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        width: "100%",
        background: secondary.light,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: spacing(4),
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          borderRadius: spacing(2),
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Upload a PDF Document
        </Typography>

        <input
          accept="application/pdf"
          type="file"
          id="upload-file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ mt: spacing(2), py: spacing(1.5) }}
            startIcon={<CloudUploadIcon />}
          >
            Choose PDF
          </Button>
        </label>

        {selectedFile && (
          <Typography
            variant="subtitle2"
            sx={{ mt: spacing(1.5), wordBreak: "break-all" }}
          >
            {selectedFile.name}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          disabled={!selectedFile || isPending}
          onClick={handleUpload}
          sx={{ mt: spacing(3), py: spacing(1.5) }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload"
          )}
        </Button>

        {isSuccess && (
          <Alert severity="success" sx={{ mt: spacing(3) }}>
            Document uploaded successfully! File Name: {data.filename}
          </Alert>
        )}

        {isError && (
          <Alert severity="error" sx={{ mt: spacing(3) }}>
            {error?.response?.data?.message || "Upload failed"}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default HomePage;
