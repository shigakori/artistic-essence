import { Suspense } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import "./globals.css";

export const metadata = {
  title: "Horizon AI | The future Of Artificial Intelligence",
  description: "The Future Of AI",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <Suspense>
        <ProgressBar />
      </Suspense>
      {children}
      </body>
      </html>
  );
}
