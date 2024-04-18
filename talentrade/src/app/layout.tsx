import type { Metadata } from "next";
import "./globals.css";
import MyHeader from "./components/myHeader/myHeader";


export const metadata: Metadata = {
  title: "TalenTrade",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ marginTop: '8vh' }}>
        <MyHeader />
        {children}
      </body>
    </html>
  );
}
