// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hued – Elevating Fashion Knowledge",
  description: "Fashion community, luminaries, curated content, and quizzes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
