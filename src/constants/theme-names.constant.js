import {
  gipsyKing,
  pinkWereWolf,
  pinkyCat,
  powerRangers,
  sandyBeach,
  smokyWinter,
  sunnyNight,
} from "../styles/theme.styles";

import { THEME_KEYS } from "./theme-keys.constant";

import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export const THEME_DATA = {
  POWER_RANGERS: {
    key: THEME_KEYS.POWER_RANGERS,
    label: "Power Rangers",
    value: powerRangers,
    icon: LightModeIcon,
  },
  SANDY_BEACH: {
    key: THEME_KEYS.SANDY_BEACH,
    label: "Sandy Beach",
    value: sandyBeach,
    icon: Brightness4Icon,
  },
  PINKY_CAT: {
    key: THEME_KEYS.PINKY_CAT,
    label: "Pinky Cat",
    value: pinkyCat,
    icon: Brightness5Icon,
  },
  GIPSY_KING: {
    key: THEME_KEYS.GIPSY_KING,
    label: "Gipsy King",
    value: gipsyKing,
    icon: FreeBreakfastIcon,
  },
  SUNNY_NIGHT: {
    key: THEME_KEYS.SUNNY_NIGHT,
    label: "Sunny Night",
    value: sunnyNight,
    icon: LocalFireDepartmentIcon,
  },
  PINK_WEREWOLF: {
    key: THEME_KEYS.PINK_WEREWOLF,
    label: "Pink Werewolf",
    value: pinkWereWolf,
    icon: FilterVintageIcon,
  },
  SMOKY_WINTER: {
    key: THEME_KEYS.SMOKY_WINTER,
    label: "Smoky Winter",
    value: smokyWinter,
    icon: DarkModeIcon,
  },
};
