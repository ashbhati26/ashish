import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactLenis } from 'lenis/react';
import { Navbar } from './components/Navbar';
import { PageTransitionProvider } from './components/Pagetransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashish Bhati — Designer & Developer',
  description: 'Freelance designer & developer helping brands thrive in the digital world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactLenis root />
        <PageTransitionProvider>
          <Navbar />
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}