'use client';

import { Inter } from 'next/font/google';
import { darkTheme } from '@/_theme/themes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>BET A BOT</title>
        <meta name='description' content='update description later' />
      </head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
