import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/constans";



export const metadata: Metadata = {
  title: "Firshop",
  description: "Firshop is an ecommerce website created using Next JS and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
