"use client";

import Link from "next/link";
import { APP_ROUTES } from "@/config/routes";
import styles from "./Layout.module.scss";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>TRAINS SCHEDULE</h2>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link
              href={APP_ROUTES.DASHBOARD}
              className={isActive(APP_ROUTES.DASHBOARD) ? styles.active : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={APP_ROUTES.TRAINS}
              className={isActive(APP_ROUTES.TRAINS) ? styles.active : ""}
            >
              Trains
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
