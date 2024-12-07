import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Ingredient Analyzer & Food Safety Blog',
    template: '%s | Ingredient Analyzer'
  },
  description: 'Analyze food ingredients for allergens, additives, and preservatives. Get instant safety analysis and read expert articles about food safety.',
  keywords: ['ingredient analyzer', 'food safety', 'allergen checker', 'food additives', 'preservatives', 'healthy eating'],
  authors: [{ name: 'Ingredient Analyzer Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Ingredient Analyzer & Food Safety Blog',
    description: 'Analyze food ingredients for allergens, additives, and preservatives. Get instant safety analysis and read expert articles about food safety.',
    siteName: 'Ingredient Analyzer'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingredient Analyzer & Food Safety Blog',
    description: 'Analyze food ingredients for allergens, additives, and preservatives. Get instant safety analysis and read expert articles about food safety.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cyberpunk">
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="cyberpunk"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
