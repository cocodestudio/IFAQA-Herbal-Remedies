import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PhoneOtpModal } from '@/components/auth/PhoneOtpModal';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { LuxuryPageLoader } from '@/components/ui/LuxuryPageLoader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'IFAQA Herbal Remedies | Pure Desi Dawakhana & Classical Medicines',
  description: 'Pure, authentic handcrafted herbal and Ayurvedic/Unani classical remedies formulated for all health conditions with nationwide delivery in India & worldwide.',
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
    <html lang="en">
      <body className="bg-ifaqa-linen text-ifaqa-plum antialiased min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-ifaqa-sand selection:text-ifaqa-plum">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>
                <LuxuryPageLoader />
              </Suspense>
              <Header />
              <main className="flex-1 w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <PhoneOtpModal />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
