import React from "react";
import { LoginForm } from "./LoginForm";
import styles from "./Auth.module.scss";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@/config/routes";
import Icon from "../../../public/icon.svg";
import { RegisterForm } from "./RegisterForm";

export const AuthPageComponent = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === APP_ROUTES.LOGIN;
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.box}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoBox}>
            <Icon width={40} height={40} />
            <p>Train Journey</p>
          </div>
        </div>
        {isLoginPage ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className={`${styles.box} ${styles.rightBox}`}>
        <h2 className={styles.title}>Train Journey</h2>
        <p className={styles.text}>Admin panel</p>
      </div>
    </div>
  );
};
