import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BrandSwitcher } from './components/common/BrandSwitcher';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// HAI Logistic Views
import { HaiHome } from './components/hai/HaiHome';
import { HaiAbout } from './components/hai/HaiAbout';
import { HaiLogistics } from './components/hai/HaiLogistics';
import { HaiBusinesses } from './components/hai/HaiBusinesses';

// Rivora Views
import { RivoraHome } from './components/rivora/RivoraHome';
import { RivoraShop } from './components/rivora/RivoraShop';
import { RivoraProductDetail } from './components/rivora/RivoraProductDetail';
import { RivoraCart } from './components/rivora/RivoraCart';
import { RivoraCheckout } from './components/rivora/RivoraCheckout';
import { RivoraAccount } from './components/rivora/RivoraAccount';

// Ran Diriya Views
import { RanDiriyaHome } from './components/randiriya/RanDiriyaHome';
import { RanDiriyaShop } from './components/randiriya/RanDiriyaShop';
import { RanDiriyaProductDetail } from './components/randiriya/RanDiriyaProductDetail';
import { RanDiriyaCart } from './components/randiriya/RanDiriyaCart';
import { RanDiriyaCheckout } from './components/randiriya/RanDiriyaCheckout';
import { RanDiriyaWholesale } from './components/randiriya/RanDiriyaWholesale';
import { RanDiriyaAccount } from './components/randiriya/RanDiriyaAccount';

// General & Admin Views
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { currentRoute, toasts } = useApp();

  // Route matching
  const renderRoute = () => {
    // Normalization
    const path = currentRoute.replace(/\/$/, '') || '/';

    // HAI Logistic routes
    if (path === '/') return <HaiHome />;
    if (path === '/about-us') return <HaiAbout />;
    if (path === '/logistics') return <HaiLogistics />;
    if (path === '/businesses') return <HaiBusinesses />;

    // Rivora routes
    if (path === '/rivora') return <RivoraHome />;
    if (path === '/rivora/shop') return <RivoraShop />;
    if (path.startsWith('/rivora/product/')) {
      const parts = path.split('/rivora/product/');
      const prodId = parts[1] || '';
      return <RivoraProductDetail productId={prodId} />;
    }
    if (path === '/rivora/cart') return <RivoraCart />;
    if (path === '/rivora/checkout') return <RivoraCheckout />;
    if (path === '/rivora/account') return <RivoraAccount />;

    // Ran Diriya routes
    if (path === '/ran-diriya') return <RanDiriyaHome />;
    if (path === '/ran-diriya/shop') return <RanDiriyaShop />;
    if (path.startsWith('/ran-diriya/product/')) {
      const parts = path.split('/ran-diriya/product/');
      const prodId = parts[1] || '';
      return <RanDiriyaProductDetail productId={prodId} />;
    }
    if (path === '/ran-diriya/cart') return <RanDiriyaCart />;
    if (path === '/ran-diriya/checkout') return <RanDiriyaCheckout />;
    if (path === '/ran-diriya/wholesale') return <RanDiriyaWholesale />;
    if (path === '/ran-diriya/account') return <RanDiriyaAccount />;

    // Contact & Admin
    if (path === '/contact') return <ContactPage />;
    if (path === '/admin') return <AdminDashboard />;

    // Fallback default
    return <HaiHome />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <div>
        <BrandSwitcher />
        <Header />
        <main>{renderRoute()}</main>
      </div>
      <Footer />

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg text-xs font-medium text-white transition-all transform animate-in slide-in-from-bottom-2 ${
              t.type === 'success' ? 'bg-emerald-800 border border-emerald-600' :
              t.type === 'error' ? 'bg-red-800 border border-red-600' : 'bg-slate-900 border border-slate-700'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-blue-300 shrink-0" />}
            <span className="flex-1">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
