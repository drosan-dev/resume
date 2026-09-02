import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin', 'cyrillic'] });

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://drosan-dev.github.io/resume/'),
  title: 'Антон Владимиров — Senior .NET Developer',
  description: 'Senior .NET/C# developer with 7+ years of commercial experience in backend systems, microservices and engineering practices.',
  openGraph: {
    title: 'Антон Владимиров — Senior .NET Developer',
    description: 'Backend · AI-assisted development · Game mechanics',
    url: 'https://drosan-dev.github.io/resume/',
    siteName: 'Антон Владимиров — Resume',
    locale: 'ru_RU',
    type: 'profile',
    images: [{ url: 'https://drosan-dev.github.io/resume/og.png', width: 1200, height: 630, alt: 'Антон Владимиров — Senior .NET Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Антон Владимиров — Senior .NET Developer',
    description: 'Backend · AI-assisted development · Game mechanics',
    images: ['https://drosan-dev.github.io/resume/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
