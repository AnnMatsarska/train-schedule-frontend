import { ReactNode } from "react";

import "./globals.scss";
import { ClientLayout } from "@/components/Layout/ClientLayout";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="top-center" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
