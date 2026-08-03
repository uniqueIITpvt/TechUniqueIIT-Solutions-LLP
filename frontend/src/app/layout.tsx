import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.techuniqueiit.com';

const defaultTitle =
  'TechUniqueIIT Solutions LLP | Custom Software, Mobile Apps & Digital Marketing';
const defaultDescription =
  'TechUniqueIIT Solutions LLP builds custom software, web applications, mobile apps, maintenance solutions, and digital marketing support for businesses in India.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'TechUniqueIIT',
  title: {
    default: defaultTitle,
    template: '%s | TechUniqueIIT Solutions',
  },
  description: defaultDescription,
  keywords: [
    'TechUniqueIIT',
    'TechUniqueIIT Solutions LLP',
    'custom software development India',
    'web application development',
    'mobile app development',
    'software maintenance',
    'digital marketing services',
    'South Delhi IT company',
  ],
  authors: [{ name: 'TechUniqueIIT Solutions LLP', url: siteUrl }],
  creator: 'TechUniqueIIT Solutions LLP',
  publisher: 'TechUniqueIIT Solutions LLP',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'TechUniqueIIT Solutions LLP',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/hero-image.jpg',
        alt: 'TechUniqueIIT Solutions LLP software and digital marketing services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/hero-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
