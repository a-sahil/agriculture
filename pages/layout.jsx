"use client";
import "@rainbow-me/rainbowkit/styles.css";
import  Providers  from "./providers";
import { Inter } from "next/font/google";
// import NavBar from "@/components/NavBar";
// import SideBar from "@/components/SideBar";
import Navbar from "../components/navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <title>DeSci</title>
            </head>
            <body>
                <Providers>
                            <div>{children}</div>
                            {/* <Navbar /> */}
                </Providers>
            </body>
        </html>
    );
}

