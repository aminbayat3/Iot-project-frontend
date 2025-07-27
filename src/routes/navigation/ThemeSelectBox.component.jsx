import { useTheme } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";

import { THEME_DATA } from "../../constants/theme-names.constant";
import { ThemeIconContainerBox, SelectTheme } from "./Navigation.styles";

import OutlinedInput from "@mui/material/OutlinedInput";

import useThemeStore from "../../store/themeStore";

const ThemeSelectBox = () => {
  const themeKey = useThemeStore((state) => state.themeKey);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { palette, spacing } = useTheme();

  const handleChange = (event) => {
    const theme = event.target.value;
    setTheme(theme);
  };

  return (
    <Box sx={{ mx: { xs: 1, sm: 2 } }}>
      <FormControl
        sx={{
          m: { xs: 0.5, sm: 1 },
          minWidth: { xs: 50, sm: 120 },
        }}
      >
        <SelectTheme
          value={themeKey}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          input={
            <OutlinedInput
              sx={{
                px: { xs: 0.5, sm: 1.5 },
                py: { xs: 2.5, sm: 3.5 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                height: { xs: 36, sm: 40 },
              }}
            />
          }
        >
          {Object.keys(THEME_DATA).map((key, idx) => {
            const ThemeIcon = THEME_DATA[key].icon;
            return (
              <MenuItem key={`theme-${idx}`} value={THEME_DATA[key].key}>
                <ThemeIconContainerBox>
                  <ThemeIcon
                    sx={{
                      color: palette.info.main,
                      mr: { xs: 0, sm: spacing(2) },
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  />
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline",
                      },
                    }}
                    variant="subtitle2"
                  >
                    {THEME_DATA[key].label}
                  </Typography>
                </ThemeIconContainerBox>
              </MenuItem>
            );
          })}
        </SelectTheme>
      </FormControl>
    </Box>
  );
};

export default ThemeSelectBox;
