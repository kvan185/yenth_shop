import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Ôn từ vựng VSTEP",
  description: "Ứng dụng học từ vựng và kiểm tra trắc nghiệm VSTEP",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
