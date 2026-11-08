import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, ArrowRight, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentBusiness, currentRoute, navigateTo, rivoraCart, ranDiriyaCart } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  // Brand-specific settings
  if (currentBusiness === 'rivora') {
    const totalItems = rivoraCart.reduce((sum, item) => sum + item.quantity, 0);
    return (
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e2d9] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <button
            onClick={() => navigateTo('/rivora')}
            className="text-2xl font-serif-luxury tracking-widest text-[#244233] uppercase font-bold whitespace-nowrap shrink-0 text-left hover:opacity-90 transition-opacity"
          >
            R I V O R A
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4a5f52]">
            <button
              onClick={() => navigateTo('/rivora/shop')}
              className={`hover:text-[#244233] transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === '/rivora/shop' ? 'text-[#244233] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Flowers & Gifts
            </button>
            <button
              onClick={() => navigateTo('/rivora#cafe')}
              className="hover:text-[#244233] transition-colors whitespace-nowrap shrink-0"
            >
              Artisan Café
            </button>
            <button
              onClick={() => navigateTo('/rivora#story')}
              className="hover:text-[#244233] transition-colors whitespace-nowrap shrink-0"
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('/rivora/account')}
              className={`hover:text-[#244233] transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === '/rivora/account' ? 'text-[#244233] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Order Tracking
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('/rivora/cart')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#244233] rounded hover:bg-[#1a3226] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shopping Bag</span>
              <span className="font-mono text-xs bg-white/20 px-1.5 py-0.2 rounded">
                {totalItems}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#244233] hover:bg-[#ece6dc] rounded"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8e2d9] bg-[#faf8f5] px-4 py-4 space-y-3">
            <button
              onClick={() => navigateTo('/rivora/shop')}
              className="block w-full text-left py-2 text-sm font-medium text-[#244233]"
            >
              Flowers & Gifts
            </button>
            <button
              onClick={() => navigateTo('/rivora#cafe')}
              className="block w-full text-left py-2 text-sm font-medium text-[#244233]"
            >
              Artisan Café
            </button>
            <button
              onClick={() => navigateTo('/rivora#story')}
              className="block w-full text-left py-2 text-sm font-medium text-[#244233]"
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('/rivora/account')}
              className="block w-full text-left py-2 text-sm font-medium text-[#244233]"
            >
              Order Tracking
            </button>
            <button
              onClick={() => navigateTo('/rivora/cart')}
              className="block w-full text-left py-2 text-sm font-semibold text-[#244233]"
            >
              View Shopping Bag ({totalItems})
            </button>
          </div>
        )}
      </header>
    );
  }

  if (currentBusiness === 'ran_diriya') {
    const totalItems = ranDiriyaCart.reduce((sum, item) => sum + item.quantity, 0);
    return (
      <header className="sticky top-0 z-40 bg-[#0d251b]/95 backdrop-blur-md text-emerald-50 border-b border-emerald-900/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <button
            onClick={() => navigateTo('/ran-diriya')}
            className="text-xl font-bold tracking-wider text-amber-300 font-brand-cinzel uppercase whitespace-nowrap shrink-0 text-left hover:opacity-90 transition-opacity"
          >
            RAN DIRIYA
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-emerald-200">
            <button
              onClick={() => navigateTo('/ran-diriya/shop')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === '/ran-diriya/shop' ? 'text-amber-300 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Ceylon Spices & Tea
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya#story')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              Harvest Heritage
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/wholesale')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === '/ran-diriya/wholesale' ? 'text-amber-300 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Wholesale & Export
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/account')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === '/ran-diriya/account' ? 'text-amber-300 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Track Shipment
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('/ran-diriya/cart')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 rounded hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
              <span className="font-mono text-xs bg-slate-950/15 px-1.5 py-0.2 rounded font-bold">
                {totalItems}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-emerald-200 hover:bg-emerald-900/60 rounded"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-900 bg-[#0d251b] px-4 py-4 space-y-3">
            <button
              onClick={() => navigateTo('/ran-diriya/shop')}
              className="block w-full text-left py-2 text-sm font-medium text-amber-200"
            >
              Ceylon Spices & Tea
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya#story')}
              className="block w-full text-left py-2 text-sm font-medium text-emerald-200"
            >
              Harvest Heritage
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/wholesale')}
              className="block w-full text-left py-2 text-sm font-medium text-amber-200"
            >
              Wholesale & Export
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/account')}
              className="block w-full text-left py-2 text-sm font-medium text-emerald-200"
            >
              Track Shipment
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/cart')}
              className="block w-full text-left py-2 text-sm font-semibold text-amber-300"
            >
              View Cart ({totalItems})
            </button>
          </div>
        )}
      </header>
    );
  }

  // HAI Logistic Corporate Header
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigateTo('/')}
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f2744] whitespace-nowrap shrink-0 text-left hover:opacity-90 transition-opacity"
        >
          HAI LOGISTIC
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => navigateTo('/about-us')}
            className={`hover:text-[#0f2744] transition-colors whitespace-nowrap shrink-0 ${
              currentRoute === '/about-us' ? 'text-[#0f2744] font-semibold underline underline-offset-8' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo('/logistics')}
            className={`hover:text-[#0f2744] transition-colors whitespace-nowrap shrink-0 ${
              currentRoute === '/logistics' ? 'text-[#0f2744] font-semibold underline underline-offset-8' : ''
            }`}
          >
            Logistics Services
          </button>
          <button
            onClick={() => navigateTo('/businesses')}
            className={`hover:text-[#0f2744] transition-colors whitespace-nowrap shrink-0 ${
              currentRoute === '/businesses' ? 'text-[#0f2744] font-semibold underline underline-offset-8' : ''
            }`}
          >
            Group Businesses
          </button>
          <button
            onClick={() => navigateTo('/contact')}
            className={`hover:text-[#0f2744] transition-colors whitespace-nowrap shrink-0 ${
              currentRoute === '/contact' ? 'text-[#0f2744] font-semibold underline underline-offset-8' : ''
            }`}
          >
            Contact & Network
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('/logistics')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f2744] hover:bg-[#ea580c] transition-colors rounded whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <button
            onClick={() => navigateTo('/about-us')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800"
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo('/logistics')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800"
          >
            Logistics Services
          </button>
          <button
            onClick={() => navigateTo('/businesses')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800"
          >
            Group Businesses
          </button>
          <button
            onClick={() => navigateTo('/contact')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-800"
          >
            Contact & Network
          </button>
          <button
            onClick={() => navigateTo('/logistics')}
            className="block w-full text-left py-2 text-sm font-semibold text-orange-600"
          >
            Request Quotation
          </button>
        </div>
      )}
    </header>
  );
};
