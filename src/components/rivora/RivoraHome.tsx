import React from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGES } from '../../data/mockData';
import { Flower2, Gift, Coffee, Calendar, HeartHandshake, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export const RivoraHome: React.FC = () => {
  const { navigateTo, products, addToCart } = useApp();

  const featuredRivora = products.filter(p => p.businessId === 'rivora' && p.featured);

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-[#e8e2d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
                <span>Bespoke Floristry</span>
                <span aria-hidden="true">·</span>
                <span>Artisan Café</span>
                <span aria-hidden="true">·</span>
                <span>Curated Gifting</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#1b3327] tracking-tight leading-tight text-balance">
                Flowers That Speak, Gifts That Endure.
              </h1>

              <p className="text-base sm:text-lg text-[#4a5f52] leading-relaxed max-w-xl">
                Handcrafted floral bouquets, luxury celebration hampers with wax-sealed calligraphy cards, and an intimate Parisian-inspired café experience in Colombo.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('/rivora/shop')}
                  className="px-6 py-3.5 bg-[#244233] hover:bg-[#1a3226] text-white font-medium text-xs uppercase tracking-widest rounded transition-colors shadow-sm whitespace-nowrap"
                >
                  Browse Collection
                </button>
                <a
                  href="#cafe"
                  className="px-6 py-3.5 bg-white hover:bg-[#f4efe8] text-[#244233] border border-[#d6cec1] font-medium text-xs uppercase tracking-widest rounded transition-colors whitespace-nowrap"
                >
                  Explore The Café
                </a>
                <a
                  href="https://wa.me/94771234567?text=Hello%20Rivora%20Floral%20Studio%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20arrangement"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3.5 text-xs text-[#244233] hover:text-emerald-800 font-medium flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              <div className="pt-6 border-t border-[#e8e2d9] flex flex-wrap gap-6 text-xs text-[#5c7a68]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#244233]" />
                  <span>Scheduled Delivery Date Selection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#244233]" />
                  <span>Wax-Sealed Custom Calligraphy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded overflow-hidden shadow-lg border border-[#e8e2d9] aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                <img
                  src={HERO_IMAGES.rivoraFloral}
                  alt="Rivora Bespoke Garden Bouquet and Artisan Coffee"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Florals & Luxury Hampers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68] mb-2">
              Curated Masterpieces
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327]">
              Seasonal Bouquets & Celebration Hampers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/rivora/shop')}
            className="text-xs uppercase tracking-wider font-semibold text-[#244233] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View Complete Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRivora.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#cfc4b2] transition-all group"
            >
              <div>
                <div
                  className="h-72 overflow-hidden cursor-pointer relative bg-[#f4efe8]"
                  onClick={() => navigateTo(`/rivora/product/${product.id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.discountedPrice && (
                    <div className="absolute top-3 right-3 bg-[#244233] text-white text-[11px] font-medium px-2 py-0.5 rounded tracking-wide">
                      Special Offer
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs text-[#5c7a68] uppercase tracking-wider font-medium">
                    {product.category}
                  </div>
                  <h3
                    onClick={() => navigateTo(`/rivora/product/${product.id}`)}
                    className="text-lg font-serif-luxury font-bold text-[#1b3327] cursor-pointer hover:text-emerald-800 transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#f4efe8] flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold font-mono text-[#1b3327]">
                    LKR {(product.discountedPrice || product.basePrice).toLocaleString()}
                  </div>
                  {product.discountedPrice && (
                    <div className="text-[11px] line-through text-slate-400 font-mono">
                      LKR {product.basePrice.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigateTo(`/rivora/product/${product.id}`)}
                  className="px-4 py-2 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-wider font-medium rounded transition-colors"
                >
                  Configure & Gift
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Artisan Café & Menu Showcase */}
      <section id="cafe" className="bg-[#f4efe8] border-t border-b border-[#e8e2d9] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded overflow-hidden shadow-sm border border-[#e0d6c7]">
                <img
                  src={HERO_IMAGES.rivoraFloral}
                  alt="Rivora Floral Studio & Artisan Cafe Experience"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
                <Coffee className="w-4 h-4 text-[#244233]" />
                <span>The Rivora Café Experience</span>
              </div>

              <h2 className="text-3xl font-serif-luxury font-bold text-[#1b3327]">
                Artisan Coffee, High Tea & Pastry Table
              </h2>

              <p className="text-sm text-[#4a5f52] leading-relaxed">
                Step into a botanical sanctuary where the aroma of freshly ground single-estate Ceylon coffee beans mingles with fragrant garden blooms. Our café menu features artisanal pastries, botanical herbal infusions, and handcrafted desserts prepared daily.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded border border-[#e8e2d9]">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1b3327]">Ceylon Spiced Flat White</h4>
                    <span className="text-xs font-mono font-semibold text-[#244233]">LKR 1,150</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Single-origin espresso infused with subtle Ceylon cardamom froth.</p>
                </div>

                <div className="bg-white p-4 rounded border border-[#e8e2d9]">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1b3327]">Rose & Pistachio Macaron Box (6)</h4>
                    <span className="text-xs font-mono font-semibold text-[#244233]">LKR 2,400</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Delicate French almond shells filled with Damascus rose ganache.</p>
                </div>

                <div className="bg-white p-4 rounded border border-[#e8e2d9]">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1b3327]">Botanical High Tea for Two</h4>
                    <span className="text-xs font-mono font-semibold text-[#244233]">LKR 6,800</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Tiered savory canapés, warm scones with clotted cream, and floral brew.</p>
                </div>

                <div className="bg-white p-4 rounded border border-[#e8e2d9]">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1b3327]">Matcha Vanilla Cold Cloud</h4>
                    <span className="text-xs font-mono font-semibold text-[#244233]">LKR 1,450</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Ceremonial grade Uji matcha topped with velvety whipped cream.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/rivora/shop')}
                  className="px-5 py-3 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-widest font-medium rounded transition-colors"
                >
                  Order Café Treat Gift Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Story */}
      <section id="story" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
          Our Craft & Philosophy
        </div>
        <h2 className="text-3xl font-serif-luxury font-bold text-[#1b3327]">
          Every Petal Tell a Story
        </h2>
        <p className="text-sm sm:text-base text-[#4a5f52] leading-relaxed">
          Founded under the HAI corporate umbrella, Rivora brings mindful luxury to personal celebrations. Our floral artisans select only the freshest stems daily from Nuwara Eliya glasshouses and certified international flower growers. Each bouquet is completed with handmade paper wrapping, silk bows, and hand-poured wax seals.
        </p>
      </section>
    </div>
  );
};
