import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';

export const BrandSwitcher: React.FC = () => {
  const { currentBusiness, currentRoute, navigateTo, rivoraCart, ranDiriyaCart, currentUserRole } = useApp();

  const totalRivoraItems = rivoraCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRanDiriyaItems = ranDiriyaCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside aria-label="Group navigation" className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
        {/* Left: Group identification */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/')}
            className="font-bold text-slate-100 hover:text-white transition-colors tracking-wide flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>HAI GROUP</span>
            <span className="text-slate-500 font-normal">·</span>
            <span className="text-slate-400 font-normal hidden sm:inline">Sri Lanka</span>
          </button>
        </div>

        {/* Center: Brand direct switches */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => navigateTo('/')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap text-xs font-medium ${
              currentBusiness === 'hai_logistic' && !currentRoute.startsWith('/admin')
                ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            HAI Logistic
          </button>

          <button
            onClick={() => navigateTo('/rivora')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap text-xs font-medium flex items-center gap-1.5 ${
              currentBusiness === 'rivora'
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-800/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Rivora Boutique</span>
            {totalRivoraItems > 0 && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                {totalRivoraItems}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('/ran-diriya')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap text-xs font-medium flex items-center gap-1.5 ${
              currentBusiness === 'ran_diriya'
                ? 'bg-amber-950/70 text-amber-200 border border-amber-800/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Ran Diriya Spices & Tea</span>
            {totalRanDiriyaItems > 0 && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                {totalRanDiriyaItems}
              </span>
            )}
          </button>
        </div>

        {/* Right: Admin Console shortcut & role */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo('/admin')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              currentRoute.startsWith('/admin')
                ? 'bg-orange-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">Admin Console</span>
            <span className="md:hidden">Admin</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
