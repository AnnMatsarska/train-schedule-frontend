"use client";

import { ReactNode, useState } from "react";
import { useMediaQuery, Drawer } from "@mui/material";
import styles from "./Layout.module.scss";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  return (
    <div className={styles.layout}>
      {!isMobile && <Sidebar className={styles.sidebarInline} />}
      <div className={styles.main}>
        <Header onMenuClick={toggleDrawer} isMobile={isMobile} />
        <div className={styles.content}>{children}</div>
      </div>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          <Sidebar />
        </Drawer>
      )}
    </div>
  );
};
