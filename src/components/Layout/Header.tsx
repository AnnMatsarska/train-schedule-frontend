"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

import styles from "./Layout.module.scss";

export const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <header className={styles.header}>
      <div className={styles.accountBox}>
        <p>{user?.firstName}</p>
        <IconButton onClick={handleOpen} color="inherit">
          <AccountCircle sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </header>
  );
};
