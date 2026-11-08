import React from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGES } from '../../data/mockData';
import { ArrowRight, Ship, Flower2, Leaf } from 'lucide-react';

export const HaiBusinesses: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            Corporate Brand Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Three Distinct Commercial Entities, One Unified Digital Group
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            HAI Logistic operates as the parent corporate infrastructure, powering independent commercial enterprises with isolated catalogues, bespoke shopping carts, customer tracking, and specialized administration.
          </p>
        </div>
      </section>

      {/* 3 Businesses Detailed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Business 1: HAI Logistic */}
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[280px]">
            <img
              src={HERO_IMAGES.haiLogistic}
              alt="HAI Logistic Sea and Air Freight"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#0f2744] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
              Business 01 · Corporate
            </div>
          </div>
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider">
                <Ship className="w-4 h-4" />
                <span>Multimodal Freight & Customs Brokerage</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f2744]">
                HAI Logistic
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The corporate foundation of the group. Manages ocean container shipping (FCL/LCL), air cargo charters via Colombo BIA, licensed customs house brokerage, bonded warehousing, and heavy industrial project transport.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="font-semibold block text-slate-900">Customs EDI</span>
                  ASYCUDA World
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="font-semibold block text-slate-900">Port Operations</span>
                  Port of Colombo
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="font-semibold block text-slate-900">Air Cargo</span>
                  BIA Hub CMB
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('/logistics')}
                className="px-5 py-2.5 bg-[#0f2744] hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                <span>View Logistics Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('/contact')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Corporate Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Business 2: Rivora */}
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[280px]">
            <img
              src={HERO_IMAGES.rivoraFloral}
              alt="Rivora Floral and Artisan Cafe Boutique"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#244233] text-white px-3 py-1 text-xs font-serif-luxury font-bold uppercase tracking-wider rounded">
              Business 02 · Lifestyle
            </div>
          </div>
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                <Flower2 className="w-4 h-4" />
                <span>Floristry · Luxury Gifting · Artisan Café</span>
              </div>
              <h2 className="text-2xl font-serif-luxury font-bold text-[#244233]">
                Rivora Boutique & Café
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                A luxury floral and lifestyle store with an integrated café. Offers bespoke fresh flower bouquets, gourmet celebratory gift boxes, customizable wax-sealed greeting cards, scheduled gift delivery, and specialty espresso dining.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-2.5 bg-[#faf8f5] rounded border border-[#e8e2d9]">
                  <span className="font-semibold block text-[#244233]">Scheduled Delivery</span>
                  Colombo & Suburbs
                </div>
                <div className="p-2.5 bg-[#faf8f5] rounded border border-[#e8e2d9]">
                  <span className="font-semibold block text-[#244233]">Artisan Café</span>
                  Dine-in & Treats
                </div>
                <div className="p-2.5 bg-[#faf8f5] rounded border border-[#e8e2d9]">
                  <span className="font-semibold block text-[#244233]">Personalization</span>
                  Greeting Cards
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('/rivora')}
                className="px-5 py-2.5 bg-[#244233] hover:bg-[#1a3226] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                <span>Enter Rivora Boutique</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('/rivora/shop')}
                className="px-5 py-2.5 bg-[#faf8f5] hover:bg-[#ece6dc] text-[#244233] border border-[#e8e2d9] font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Browse Flowers & Gifts
              </button>
            </div>
          </div>
        </div>

        {/* Business 3: Ran Diriya */}
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[280px]">
            <img
              src={HERO_IMAGES.ranDiriyaTea}
              alt="Ran Diriya Ceylon Spices and Tea Export"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-emerald-950 text-amber-300 px-3 py-1 text-xs font-brand-cinzel font-bold uppercase tracking-wider rounded">
              Business 03 · Export Heritage
            </div>
          </div>
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <Leaf className="w-4 h-4" />
                <span>Single-Origin Ceylon Teas & Pure Spices</span>
              </div>
              <h2 className="text-2xl font-bold font-brand-cinzel text-slate-900">
                Ran Diriya
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Championing authentic Sri Lankan terroir. Delivers hand-peeled Alba cinnamon quills, whole tellicherry black pepper, organic cloves, and high-grown Nuwara Eliya OP1 black tea for domestic households and international container-load export buyers.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-2.5 bg-amber-50/50 rounded border border-amber-200/60">
                  <span className="font-semibold block text-amber-900">Ceylon Lion Certified</span>
                  100% Pure Ceylon
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded border border-amber-200/60">
                  <span className="font-semibold block text-amber-900">Packaging Options</span>
                  100g to 25kg Bulk
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded border border-amber-200/60">
                  <span className="font-semibold block text-amber-900">Worldwide Air Cargo</span>
                  DHL / Air Freight
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('/ran-diriya')}
                className="px-5 py-2.5 bg-[#112d21] hover:bg-[#0c2219] text-amber-300 font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                <span>Enter Ran Diriya Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('/ran-diriya/wholesale')}
                className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Wholesale & Export Inquiries
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
