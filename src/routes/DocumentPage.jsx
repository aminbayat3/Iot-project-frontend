import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocuments, getDocumentById } from "../api/documents";

const DocumentsPage = () => {
  const { palette, spacing, shape } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [docDetail, setDocDetail] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["documents", page, rowsPerPage],
    queryFn: () => getDocuments(page + 1, rowsPerPage),
    keepPreviousData: true,
  });

  const handleOpenMenu = (event, fileId) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocId(fileId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = async () => {
    if (selectedDocId) {
      const res = await getDocumentById(selectedDocId);
      setDocDetail(res);
      setOpenDialog(true);
    }
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDocDetail(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        p: spacing(4),
        backgroundColor: palette.background.default,
        minHeight: "55vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom color={palette.primary.main} mb={8}>
        Uploaded Documents
      </Typography>

      {/* 🔄 Loading Spinner */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: spacing(4) }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* ❌ Error State */}
      {isError && (
        <Alert severity="error" sx={{ mb: spacing(2) }}>
          {error?.response?.data?.message || "Failed to load documents"}
        </Alert>
      )}

      {/* ✅ Table (shown only if data exists and not loading/error) */}
      {!isLoading && !isError && (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: shape.borderRadius, boxShadow: 3 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ color: palette.primary.contrastText }}>
                  Filename
                </TableCell>
                <TableCell sx={{ color: palette.primary.contrastText }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: palette.primary.contrastText }}>
                  Uploaded At
                </TableCell>
                <TableCell sx={{ color: palette.primary.contrastText }}>
                  Sentiment
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: palette.primary.contrastText }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.documents?.map((doc, index) => (
                <TableRow
                  key={doc.fileId}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? palette.action.hover : "inherit",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: palette.action.selected,
                    },
                  }}
                >
                  <TableCell>{doc.filename}</TableCell>
                  <TableCell>
                    <Chip
                      label={doc.status}
                      color={doc.status === "completed" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(doc.uploadedAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: palette.primary.dark }}>
                    {doc.sentiment || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleOpenMenu(e, doc.fileId)}>
                      <MoreVertIcon sx={{ color: palette.info.main }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
              </Menu>
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data?.total || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </TableContainer>
      )}

      {/* 📄 Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            p: spacing(3),
            borderRadius: spacing(2),
            backgroundColor: palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ color: palette.primary.main }}>
          Document Details
        </DialogTitle>
        <DialogContent dividers>
          {docDetail ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: spacing(2) }}
            >
              <Typography>
                <strong>Filename:</strong> {docDetail.filename}
              </Typography>
              <Typography>
                <strong>File URL:</strong>{" "}
                <a
                  href={docDetail.fileUrl}
                  style={{ color: palette.primary.light, fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  {docDetail.fileUrl}
                </a>
              </Typography>
              <Typography>
                <strong>Sentiment:</strong> {docDetail.sentiment}
              </Typography>
              <Typography>
                <strong>Summary:</strong> {docDetail.summary}
              </Typography>
              <Typography>
                <strong>Status:</strong> {docDetail.status}
              </Typography>
              <Typography>
                <strong>Uploaded At:</strong>{" "}
                {new Date(docDetail.uploadedAt).toLocaleString()}
              </Typography>
              {docDetail.completedAt && (
                <Typography>
                  <strong>Completed At:</strong>{" "}
                  {new Date(docDetail.completedAt).toLocaleString()}
                </Typography>
              )}
              {docDetail.keywords?.length > 0 && (
                <Box>
                  <Typography>
                    <strong>Keywords:</strong>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: spacing(1),
                      mt: 1,
                    }}
                  >
                    {docDetail.keywords.map((kw, idx) => (
                      <Chip key={idx} label={kw} color="info" />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Typography>Loading details...</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DocumentsPage;
