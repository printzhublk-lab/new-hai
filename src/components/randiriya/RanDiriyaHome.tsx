import React from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGES } from '../../data/mockData';
import { 
  Leaf, 
  Globe2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Container 
} from 'lucide-react';

export const RanDiriyaHome: React.FC = () => {
  const { navigateTo, products } = useApp();

  const featuredSpices = products.filter(p => p.businessId === 'ran_diriya' && p.featured);

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
                <span>Authentic Sri Lankan Terroir</span>
                <span aria-hidden="true">·</span>
                <span>Direct Harvest</span>
                <span aria-hidden="true">·</span>
                <span>Certified Export</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-brand-cinzel leading-tight text-balance">
                Pure Ceylon Spices & Master-Grade Tea
              </h1>

              <p className="text-base sm:text-lg text-emerald-200/90 leading-relaxed max-w-xl">
                Direct from the misty plantations of Nuwara Eliya and the coastal cinnamon gardens of southern Sri Lanka. Certified pure, unadulterated, and prepared for discerning global palates and container export.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('/ran-diriya/shop')}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm whitespace-nowrap"
                >
                  Explore Spice & Tea Store
                </button>
                <button
                  onClick={() => navigateTo('/ran-diriya/wholesale')}
                  className="px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-medium text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <Container className="w-4 h-4 text-amber-400" />
                  <span>Wholesale & Export Inquiry</span>
                </button>
              </div>

              <div className="pt-6 border-t border-emerald-900/60 flex flex-wrap gap-6 text-xs text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Ceylon Lion Logo Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Ultra-Low Coumarin True Cinnamon</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded overflow-hidden shadow-2xl border border-emerald-800/80 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                <img
                  src={HERO_IMAGES.ranDiriyaTea}
                  alt="Pure Ceylon Tea and Alba Cinnamon Quills on Slate"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Spices & Master Teas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel mb-2">
              Single-Origin Terroir
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand-cinzel">
              Featured Ceylon Harvest Collections
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/ran-diriya/shop')}
            className="text-xs uppercase tracking-wider font-semibold text-amber-300 hover:text-white flex items-center gap-1 shrink-0"
          >
            <span>View All Spices & Teas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSpices.map((product) => (
            <div
              key={product.id}
              className="bg-[#112a1f] rounded border border-emerald-900/70 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all group"
            >
              <div>
                <div
                  className="h-72 overflow-hidden cursor-pointer relative bg-emerald-950"
                  onClick={() => navigateTo(`/ran-diriya/product/${product.id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.originRegion && (
                    <div className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono">
                      {product.originRegion.split('(')[0]}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3
                    onClick={() => navigateTo(`/ran-diriya/product/${product.id}`)}
                    className="text-base sm:text-lg font-bold text-white cursor-pointer hover:text-amber-300 transition-colors line-clamp-1 font-brand-cinzel"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-emerald-200/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-emerald-900/40 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold font-mono text-amber-300">
                    LKR {(product.discountedPrice || product.basePrice).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400/80 font-mono">
                    Starts at {product.variants[0]?.name || 'Standard Unit'}
                  </div>
                </div>

                <button
                  onClick={() => navigateTo(`/ran-diriya/product/${product.id}`)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors"
                >
                  Configure Weight
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Harvest Origin Story & Heritage */}
      <section id="story" className="bg-[#081710] border-t border-b border-emerald-900/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
                Authentic Ceylon Provenance
              </div>
              <h2 className="text-3xl font-bold text-white font-brand-cinzel">
                Why Genuine Ceylon Spices Are Celebrated Worldwide
              </h2>
              <p className="text-sm text-emerald-200/80 leading-relaxed">
                Sri Lanka possesses an unparalleled microclimate. True Ceylon Cinnamon (Cinnamomum verum) is native only to the island, differing drastically from common Cassia bark through its delicate feather-like layers, sweet fragrance, and ultra-low coumarin levels safe for daily wellness.
              </p>
              <div className="space-y-3 pt-2 text-xs text-emerald-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Nuwara Eliya High-Grown Teas:</strong> Picked at elevations exceeding 6,000 feet, yielding a golden liquor and delicate muscatel floral aroma.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Alba Grade True Cinnamon:</strong> The most prized harvest category, masterfully hand-rolled into pencil-thin quills by generational artisans.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Matale High-Piperine Black Pepper:</strong> Sun-dried whole peppercorns boasting 550 grams per liter density and intense essential oils.</span>
                </div>
              </div>
            </div>

            <div className="bg-[#112a1f] p-8 rounded border border-emerald-900/80 space-y-6">
              <h3 className="text-xl font-bold text-amber-300 font-brand-cinzel">
                B2B Bulk & Container Export
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                Backed by the multimodal ocean freight and customs brokerage of parent company HAI Logistic, Ran Diriya reliably fulfills 20ft and 40ft FCL container export contracts to Europe, the Middle East, North America, and East Asia.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-emerald-950/60 rounded border border-emerald-900/50">
                  <span className="font-semibold text-white block">Phytosanitary</span>
                  Government Issued
                </div>
                <div className="p-3 bg-emerald-950/60 rounded border border-emerald-900/50">
                  <span className="font-semibold text-white block">Packaging</span>
                  Kraft, Tins, Bulk Sacks
                </div>
                <div className="p-3 bg-emerald-950/60 rounded border border-emerald-900/50">
                  <span className="font-semibold text-white block">Lab Analysis</span>
                  Coumarin & Moisture Certs
                </div>
                <div className="p-3 bg-emerald-950/60 rounded border border-emerald-900/50">
                  <span className="font-semibold text-white block">Global Shipping</span>
                  Sea & Air Freight Door/Port
                </div>
              </div>

              <button
                onClick={() => navigateTo('/ran-diriya/wholesale')}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Submit Commercial Wholesale Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
