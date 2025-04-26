import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "./util/constants";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
      template: `%s | ${APP_NAME}`,
      default: `${APP_NAME}`
   },
   description: `${APP_DESCRIPTION}`,
   metadataBase: new URL(SERVER_URL)

};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
