import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { NavbarLink } from "./Navigation.styles";
import { NAV_ITEMS } from "./navigation.utils";

const NavbarItems = ({ isMobile, handleCloseDrawer }) => {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {NAV_ITEMS.map(({ title, icon: NavIcon, route }) => {
          return (
            <NavbarLink
              to={route}
              key={uuidv4()}
              onClick={() => {
                if (isMobile) handleCloseDrawer();
              }}
            >
              <ListItem key={title} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NavIcon sx={{ color: secondary.main }} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            </NavbarLink>
          );
        })}
      </List>
    </Box>
  );
};

export default NavbarItems;
