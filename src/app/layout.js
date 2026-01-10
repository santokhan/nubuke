import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar";
import PreHeader from "./Component/PreHeader";
import Footer from "./Component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crimson = Crimson_Pro({
  variable: "--font-quincy",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Nubuke | Date-Sweetened Chocolate",
  description: "The future of chocolate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} ${crimson.variable} antialiased`}
      >
        <div className="sticky top-0 z-50">
          <PreHeader />
          <Navbar />
        </div>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
