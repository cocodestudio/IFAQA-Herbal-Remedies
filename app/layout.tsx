import type { Metadata, Viewport } from 'next';
import { Newsreader, Plus_Jakarta_Sans, IBM_Plex_Mono, Noto_Nastaliq_Urdu } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PhoneOtpModal } from '@/components/auth/PhoneOtpModal';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { LuxuryPageLoader } from '@/components/ui/LuxuryPageLoader';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';
import { Suspense } from 'react';

const displaySerif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const interfaceSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const metaMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const urduNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IFAQA Herbal Remedies | Pure Unani & Ayurvedic Remedies',
  description: 'Traditional Unani and Ayurvedic herbal powders, electuaries, and distillates prepared cleanly with natural botanicals and dispatched across India.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${displaySerif.variable} ${interfaceSans.variable} ${metaMono.variable} ${urduNastaliq.variable}`}
    >
      <body className="bg-ifaqa-linen text-ifaqa-plum antialiased min-h-screen flex flex-col font-sans overflow-x-clip selection:bg-ifaqa-plum selection:text-ifaqa-linen">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>
                <LuxuryPageLoader />
              </Suspense>
              <SectionErrorBoundary sectionName="Header">
                <Header />
              </SectionErrorBoundary>
              <main className="flex-1 w-full min-h-[calc(100vh-4.5rem)] overflow-x-clip">
                <SectionErrorBoundary sectionName="PageContent">
                  {children}
                </SectionErrorBoundary>
              </main>
              <SectionErrorBoundary sectionName="Footer">
                <Footer />
              </SectionErrorBoundary>
              <CartDrawer />
              <PhoneOtpModal />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
