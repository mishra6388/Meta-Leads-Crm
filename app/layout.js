import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata = {
  title: "Meta Lead CRM",
  description: "Meta Lead CRM",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}

          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}