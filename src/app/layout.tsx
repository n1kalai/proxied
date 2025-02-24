import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { ApolloClientProvider } from '../providers/apollo-client-provider';
import { UserProvider } from '@/context/user-context';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Proxied',
  description: 'Proxied App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>
          <UserProvider>
            <Header />
            {children}
          </UserProvider>
          <Toaster />
        </ApolloClientProvider>
      </body>
    </html>
  );
}
