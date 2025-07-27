import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import useAuthStore from "../store/authStore";

const ManageAccount = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // optional but good
      setToken(null); // clears Zustand and localStorage
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      handleCloseMenu();
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpenMenu}
        size="large"
        aria-label="manage account"
      >
        <ManageAccountsIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ManageAccount;
