import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientHeader from '../components/ClientHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skinstric AI Internship',
  description: 'AI that will make your skin like new',
};

interface RootLayoutProps {
  children: React.ReactNode;
  section?: string;
}

export default function RootLayout({ children, section }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientHeader section={section} />
        <main>{children}</main>
      </body>
    </html>
  );
}

