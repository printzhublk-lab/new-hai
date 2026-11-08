import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGES } from '../../data/mockData';
import { 
  Ship, 
  Plane, 
  FileCheck2, 
  ThermometerSnowflake, 
  Warehouse, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Globe2, 
  CheckCircle2,
  Search
} from 'lucide-react';

export const HaiHome: React.FC = () => {
  const { navigateTo, submitQuotation, showToast } = useApp();
  const [quickTrackingInput, setQuickTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackingInput.trim()) {
      showToast('Please enter a Container, BOL, or Air Waybill number', 'error');
      return;
    }
    setTrackingResult({
      ref: quickTrackingInput.trim().toUpperCase(),
      status: 'In Transit - Port of Colombo Terminal (SCT)',
      eta: '2026-11-12 14:00 LK Time',
      origin: 'Colombo (LKCMB)',
      destination: 'Rotterdam (NLRTM)',
      vessel: 'MV CEYLON TRADER / V.049W',
      milestones: [
        { label: 'Booking Confirmed', date: '04 Nov 2026', done: true },
        { label: 'Customs Clearance Completed', date: '06 Nov 2026', done: true },
        { label: 'Loaded on Vessel (SCT)', date: '07 Nov 2026', done: true },
        { label: 'Ocean Transit & Red Sea Passage', date: 'Underway', done: false },
        { label: 'Arrival & Discharge at Destination', date: 'Estimated 12 Nov', done: false }
      ]
    });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-[#0a192f] text-white overflow-hidden">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGES.haiLogistic}
            alt="HAI Logistic Cargo Terminal and Sea Port Operations in Colombo"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#0a192f]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 tracking-wider uppercase">
              <span>Sri Lankan Global Multimodal Transport</span>
              <span aria-hidden="true">·</span>
              <span>Port of Colombo Gateway</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white text-balance">
              Multimodal Logistics & Global Cargo Solutions
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              HAI Logistic orchestrates end-to-end international freight forwarding, customs house brokerage, temperature-controlled cold chain networks, and project cargo across major Indian Ocean trade lanes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('/logistics')}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-sm transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('/about-us')}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded text-sm transition-colors whitespace-nowrap"
              >
                Corporate Overview
              </button>
            </div>
          </div>

          {/* Quick Tracking & Rate Strip */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-5 max-w-3xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-3">
              Quick Live Cargo Tracking
            </h3>
            <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Container, B/L, or AWB (e.g. CMB-9921-X)"
                  value={quickTrackingInput}
                  onChange={(e) => setQuickTrackingInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded whitespace-nowrap transition-colors"
              >
                Track Cargo
              </button>
            </form>

            {/* Tracking Result Dropdown Card */}
            {trackingResult && (
              <div className="mt-4 pt-4 border-t border-white/20 text-xs text-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-400">Tracking Reference: </span>
                    <span className="font-mono font-bold text-white">{trackingResult.ref}</span>
                  </div>
                  <div className="text-orange-400 font-medium">
                    {trackingResult.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-400 block">Origin</span>
                    {trackingResult.origin}
                  </div>
                  <div>
                    <span className="text-slate-400 block">Destination</span>
                    {trackingResult.destination}
                  </div>
                  <div>
                    <span className="text-slate-400 block">Vessel / Voyage</span>
                    {trackingResult.vessel}
                  </div>
                  <div>
                    <span className="text-slate-400 block">Estimated Arrival</span>
                    {trackingResult.eta}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="space-y-1.5">
                    {trackingResult.milestones.map((m: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${m.done ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span className={m.done ? 'text-white' : 'text-slate-400'}>{m.label}</span>
                        <span className="text-slate-500 text-[10px] ml-auto">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar (Tabular figures) */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono tabular-nums">
                45,000+
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                TEU Handled Annually
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                99.4%
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                Customs Compliance Rate
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono tabular-nums">
                120+
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                Direct Global Ports
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                24 / 7
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                Operational Dispatch Desk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Confirmed Logistics Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
            Operational Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Comprehensive Multimodal Supply Chain Services
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Delivering dedicated logistics infrastructure compliant with Sri Lanka Customs, Sri Lanka Ports Authority (SLPA), and international maritime standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Sea Freight */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded flex items-center justify-center">
              <Ship className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              01. Ocean Freight (FCL / LCL)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Full Container Load (FCL) and Less than Container Load (LCL) consolidation connecting Colombo Sea Port with major European, Middle Eastern, and Asian trade hubs.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>Weekly Scheduled Sailings</span>
              <span aria-hidden="true">·</span>
              <span>Port-to-Port & Door</span>
            </div>
          </div>

          {/* Card 2: Air Cargo */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-700 rounded flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              02. Air Freight & Express Cargo
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Time-critical air cargo services operating out of Bandaranaike International Airport (CMB) with daily flights, priority consolidation, and charter capabilities.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>Next-Flight-Out</span>
              <span aria-hidden="true">·</span>
              <span>Express Consolidations</span>
            </div>
          </div>

          {/* Card 3: Customs Brokerage */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              03. Customs House Brokerage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Licensed customs wharf clerking, HS code classification, tariff management, import/export permits, BOI documentation, and swift clearance.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>BOI Sri Lanka Facilitation</span>
              <span aria-hidden="true">·</span>
              <span>ASYCUDA World EDI</span>
            </div>
          </div>

          {/* Card 4: Cold Chain */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-800 rounded flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              04. Cold Chain & Reefer Logistics
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dedicated cold supply chain for pharmaceutical vaccines, perishable seafood, cut flowers, and fruits with continuous data logger telemetry.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>-25°C to +25°C Controlled</span>
              <span aria-hidden="true">·</span>
              <span>GDP Compliant</span>
            </div>
          </div>

          {/* Card 5: Warehousing */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-800 rounded flex items-center justify-center">
              <Warehouse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              05. Warehousing & CFS
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Secure Container Freight Stations (CFS) strategically positioned along the Colombo port corridor, offering cross-docking, palletization, and inventory control.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>Port Corridor Facility</span>
              <span aria-hidden="true">·</span>
              <span>Bonded Storage</span>
            </div>
          </div>

          {/* Card 6: Project Cargo */}
          <div className="bg-white p-7 rounded border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              06. Project Cargo & Heavy Haulage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Specialized oversized transport for infrastructure, energy turbines, industrial boilers, and heavy factory equipment requiring route surveys.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span>Over-Dimensional Cargo (ODC)</span>
              <span aria-hidden="true">·</span>
              <span>Route Engineering</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Group Business Portfolio (Rivora & Ran Diriya) */}
      <section className="bg-slate-100/70 border-t border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Diversified Commercial Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              HAI Group Commercial Brands
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Leveraging our parent supply chain backbone to deliver distinctive consumer retail experiences in luxury floristry and authentic Sri Lankan export heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Brand Card 1: Rivora */}
            <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={HERO_IMAGES.rivoraFloral}
                    alt="Rivora Floral and Artisan Cafe Boutique"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-serif-luxury font-bold text-[#244233] tracking-widest uppercase">
                    R I V O R A
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Luxury Flowers · Bespoke Gifts · Artisan Café
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-slate-900">
                    Artisan Floral Styling & Gifting Experience
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bespoke imported and locally cultivated floral arrangements, personalized anniversary hampers, luxury greeting cards, and an integrated Parisian-style café.
                  </p>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>Scheduled Same-Day Delivery</span>
                    <span>·</span>
                    <span>Calligraphy Cards</span>
                    <span>·</span>
                    <span>Special Occasions</span>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8 pt-2">
                <button
                  onClick={() => navigateTo('/rivora')}
                  className="w-full py-3 bg-[#244233] hover:bg-[#1a3327] text-white font-medium text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore Rivora Boutique</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Brand Card 2: Ran Diriya */}
            <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={HERO_IMAGES.ranDiriyaTea}
                    alt="Ran Diriya Ceylon Spices and Tea Export"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur px-3 py-1 text-xs font-bold text-amber-300 font-brand-cinzel tracking-wider uppercase">
                    RAN DIRIYA
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                    Pure Ceylon Heritage · Spices · Single-Estate Tea
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-brand-cinzel">
                    Direct-Origin Ceylon Spices & Master Teas
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Authentic Ceylon Alba cinnamon quills, hand-harvested black pepper, high-grown Nuwara Eliya OP1 tea, and certified export-grade spice collections.
                  </p>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>Global Express Shipping</span>
                    <span>·</span>
                    <span>Bulk & Wholesale</span>
                    <span>·</span>
                    <span>Phytosanitary Certified</span>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8 pt-2">
                <button
                  onClick={() => navigateTo('/ran-diriya')}
                  className="w-full py-3 bg-[#112d21] hover:bg-[#0c2219] text-amber-300 font-medium text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <span>Visit Ran Diriya Store</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Corporate Credibility & Inquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#0f2744] text-white rounded-lg p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-5">
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Corporate Partnerships & Contract Logistics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
              Partner with Sri Lanka's Trusted Logistics Provider
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Whether you are an apparel exporter seeking scheduled transatlantic ocean freight or an importer requiring streamlined customs clearance at the Port of Colombo, our corporate desk delivers prompt rate quotations and dedicated account handling.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('/logistics')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Submit Quotation Request
              </button>
              <button
                onClick={() => navigateTo('/contact')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Connect with Colombo HQ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
