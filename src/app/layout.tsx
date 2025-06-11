import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiquidMusic - Feel the Liquid Music Flow',
  description: 'Immerse yourself in a world of crystal-clear sound and liquid-smooth experience. Discover music that flows through your soul.',
  keywords: 'music, streaming, liquid glass, audio, player',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
