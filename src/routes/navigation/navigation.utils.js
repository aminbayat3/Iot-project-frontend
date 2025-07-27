import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";

export const NAV_ITEMS_TYPES = {
  HOME: "Home",
  DOCUMENTS: "Documents"
};

export const NAV_ITEMS = [
  {
    title: NAV_ITEMS_TYPES.HOME,
    icon: HomeIcon,
    route: "/",
  },
  {
    title: NAV_ITEMS_TYPES.DOCUMENTS,
    icon: DescriptionIcon,
    route: "/documents",
  },
];