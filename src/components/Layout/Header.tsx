"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

import styles from "./Layout.module.scss";

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const Header = ({ onMenuClick, isMobile }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <header className={styles.header}>
      {isMobile && (
        <IconButton
          onClick={onMenuClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      )}
      <div className={styles.accountBox}>
        <p>{user?.firstName}</p>
        <IconButton onClick={handleOpen} color="inherit" aria-label="account">
          <AccountCircle sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </header>
  );
};
