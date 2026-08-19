'use client'
import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "./Provider";
import { ThemeProvider } from "./utils/theme-provider";
import AuthProvider from "./utils/session-provider";
import { Toaster } from "react-hot-toast";

import socketIO from "socket.io-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const pathname = usePathname();

  useEffect(() => {
    socketId.on("connection", () => { });

    // Global listener for opening auth modal from anywhere
    const handleOpenAuth = (e: any) => {
      setRoute(e.detail.route);
      setOpen(true);
    };
    window.addEventListener('openAuthModal', handleOpenAuth);
    return () => window.removeEventListener('openAuthModal', handleOpenAuth);
  }, []);

  let activeItem = 0;
  if (pathname === '/courses') activeItem = 1;
  else if (pathname === '/about') activeItem = 2;
  else if (pathname === '/policy') activeItem = 3;
  else if (pathname === '/faq') activeItem = 4;
  else if (pathname === '/profile') activeItem = 5;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable}`}>
        <Providers>
          <AuthProvider>
            <ThemeProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
              />
              {children}
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}