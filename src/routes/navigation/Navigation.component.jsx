import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import NavbarItems from "./NavbarItems.component";
import ThemeSelectBox from "./ThemeSelectBox.component";

import useThemeStore from "../../store/themeStore";

import { useDialogControl } from "../../hooks/useDialogControl";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Logo from "../../assets/qualityCharging.png";

import "./Navigation.styles";

import {
  DRAWER_WIDTH,
  Main,
  AppBar,
  DrawerHeader,
  LogoImage,
  LogoContainerBox,
} from "./Navigation.styles";
import ManageAccount from "../../components/ManageAccount";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navigation = () => {
  const {
    palette: { secondary },
    spacing,
  } = useTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const themeKey = useThemeStore((state) => state.themeKey);

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useDialogControl();

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar id="drawer">
          <Box
            sx={{
              mb: { xs: -0.4, sm: -0.8 },
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                p: { xs: 0.5, sm: spacing(1) },
                margin: "auto 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
                edge="start"
                sx={{
                  ...(isDrawerOpen && { display: "none" }),
                }}
              >
                {isMobile ? <MenuIcon fontSize="small" /> : <MenuIcon />}
              </IconButton>

              <LogoContainerBox themeKey={themeKey} isMobile={isMobile}>
                <LogoImage src={Logo} alt="logo" />
              </LogoContainerBox>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "13px", sm: "15px" },
                  fontWeight: 600,
                }}
              >
                DocuMind
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeSelectBox />

              <ManageAccount />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "100%" : DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isDrawerOpen}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon sx={{ color: secondary.dark }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavbarItems isMobile={isMobile} handleCloseDrawer={closeDrawer} />
      </Drawer>
      <Main open={isDrawerOpen} isMobile={isMobile}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Navigation;
