import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

import { center } from "../../styles/global.styles";
import { THEME_KEYS } from "../../constants/theme-keys.constant";

export const DRAWER_WIDTH = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  width: "85vw",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  // 🧭 Default margin when drawer is closed
  marginLeft: isMobile ? 0 : `-${DRAWER_WIDTH}px`,

  ...(open &&
    !isMobile && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
}));


export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.dark,
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const LogoImage = styled("img")(({ theme }) => ({
  width: theme.spacing(7),
  margin: theme.spacing(1),
}));

export const BadgeImage = styled("img")(({ theme }) => ({
  width: "22px",
  margin: theme.spacing(1),
}));

export const ModeIconGrid = styled(Grid)(center);

export const NavbarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
}));

export const LogoContainerBox = styled(Box, {
  shouldForwardProp: (prop) => !["themeKey", "isMobile"].includes(prop),
})(({ theme, themeKey, isMobile }) => {
  const useInfo =
    themeKey === THEME_KEYS.SMOKY_WINTER || themeKey === THEME_KEYS.SUNNY_NIGHT;
  const color = useInfo
    ? theme.palette.info.light
    : theme.palette.primary.light;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "30%",
    width: isMobile ? "60px" : "65px",
    height: isMobile ? "60px" : "65px",
    margin: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2.5)} `,
    backgroundColor: color,
    boxShadow: `0 0 0.3rem 0.3rem ${color} inset, 0 0 0.7rem 0.3rem ${color}`,
  };
});

export const ThemeIconContainerBox = styled(Box)({
  display: 'flex',
});

export const SelectTheme = styled(Select)(({ theme }) => ({
  color: 'white',
  border: `1px solid ${theme.palette.primary.light}`,
  '& .MuiSvgIcon-root': {
    color: 'white',
  }
}));
