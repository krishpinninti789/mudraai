import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MudraVision AI - Ancient Tradition Meets Modern Vision",
  description:
    "Bridging the gap between 2000-year-old Bharatanatyam traditions and cutting-edge Computer Vision. Decoding classical hand gestures in real-time.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23FF9933"/><text x="50" y="60" text-anchor="middle" font-size="50" fill="%23800020" font-family="serif">👁</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="selection:bg-saffron selection:text-maroon">
        {children}
      </body>
    </html>
  );
}
