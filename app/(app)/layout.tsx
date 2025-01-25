import './globals.css';
import { Suspense } from 'react';
import { VCenter } from '@components/UI/Components';
import { SuccessfullPurchaseDialog } from '@components/UI/SuccessfullPurchaseDialog';
import AuthStateProvider from 'provider/AuthStateProvider';
import Footer from '@components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen w-screen bg-slate-100 md:overscroll-none">
      <body>
        <AuthStateProvider>
          <div className="justify-top flex h-screen flex-col items-center md:justify-center">
            <div className="min-h-3/4 w-full md:h-3/4 md:w-3/4">
              <div className="h-full w-full bg-white pb-7 shadow-md md:rounded-3xl md:pb-0">
                <Suspense fallback={<VCenter>Loading...</VCenter>}>{children}</Suspense>
              </div>
            </div>
          </div>

          <Suspense fallback={<></>}>
            <SuccessfullPurchaseDialog />
          </Suspense>
          <Footer />
        </AuthStateProvider>
      </body>
    </html>
  );
}
