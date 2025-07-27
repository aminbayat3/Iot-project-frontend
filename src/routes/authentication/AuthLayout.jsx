import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import logo from "../../assets/qualityCharging.png";

const AuthLayout = ({ title, subtitle, children }) => {
  const theme = useTheme();
  const { info, primary, background } = theme.palette;

  // we use this hook for js logic responsive layouts not for padding like you see here but it's just for the sake of learning it.
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        backgroundColor: background.default,
      }}
    >
      <Card
        sx={{
          width: "100%",
          minHeight: isSmall ? 300 : 450,
          maxWidth: 420,
          p: isSmall ? 3 : 4,
          borderRadius: 3,
          backgroundColor: primary.light,
          boxShadow: `0 4px 24px ${info.main}`,
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              display: "block",
              maxWidth: "100%",
              height: "auto",
              width: "105px",
              mx: "auto",
              mb: 1,
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {children}
      </Card>
    </Box>
  );
};

export default AuthLayout;
