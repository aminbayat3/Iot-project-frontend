import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage";
import Navigation from "./routes/navigation/Navigation.component";
import DocumentPage from "./routes/DocumentPage";

import { ThemeProvider } from "@mui/material";
import { THEME_DATA } from "./constants/theme-names.constant";

import useThemeStore from "./store/themeStore";

import LoginPage from "./routes/authentication/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthInit from "./hooks/useAuthInit";

const App = () => {
  useAuthInit();
  const themeKey = useThemeStore((state) => state.themeKey);

  return (
    <ThemeProvider theme={THEME_DATA[themeKey].value}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="documents" element={<DocumentPage />} />
          </Route>
          
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
