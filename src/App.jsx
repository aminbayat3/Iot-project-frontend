import { Route, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage";
import Navigation from "./routes/navigation/Navigation.component";
import DocumentPage from "./routes/DocumentPage";

import { ThemeProvider } from "@mui/material";
import { THEME_DATA } from "./constants/theme-names.constant";

import useThemeStore from "./store/themeStore";

const App = () => {
  const themeKey = useThemeStore((state) => state.themeKey);

  return (
    <ThemeProvider theme={THEME_DATA[themeKey].value}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="documents" element={<DocumentPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
