import { ReactNode } from "react";

import "./globals.scss";
import { ClientLayout } from "@/components/Layout/ClientLayout";

export const metadata = {
  title: "Train Schedule CMS",
  description: "Manage trains, journeys, and admin panel",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
