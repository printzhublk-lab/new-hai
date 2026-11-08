import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Award } from 'lucide-react';

export const RanDiriyaShop: React.FC = () => {
  const { products, navigateTo } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  const categories = [
    'All',
    'Ceylon Black Tea',
    'Ceylon Green Tea',
    'Premium Tea Collections',
    'Cinnamon',
    'Black Pepper',
    'Cardamom',
    'Cloves',
    'Spice Gift Collections and Export/Wholesale Products'
  ];

  const ranDiriyaProducts = products.filter(p => p.businessId === 'ran_diriya');

  const filteredProducts = ranDiriyaProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.originRegion && p.originRegion.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = a.discountedPrice || a.basePrice;
    const priceB = b.discountedPrice || b.basePrice;
    if (sortBy === 'price_asc') return priceA - priceB;
    if (sortBy === 'price_desc') return priceB - priceA;
    return 0;
  });

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
            Authentic Ceylon Harvest Catalogue
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand-cinzel">
            Pure Ceylon Teas & Indigenous Spices
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
            Directly sourced, lab-tested, and packaged at origin in Sri Lanka. Choose between retail keepsake tins, vacuum pouches, or commercial bulk packs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#112a1f] p-4 rounded border border-emerald-900/80 shadow-md mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cinnamon, OP1 tea, pepper, origins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-emerald-500"
              />
            </div>

            {/* Price Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
              <span className="text-emerald-300 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 border border-emerald-800 rounded bg-[#0b1f16] text-emerald-100 text-xs focus:outline-none"
              >
                <option value="featured">Featured Harvests</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-emerald-200 hover:bg-emerald-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#112a1f] rounded border border-emerald-900 p-12 text-center space-y-3">
            <h3 className="text-base font-bold text-white font-brand-cinzel">
              No Ceylon Products Found
            </h3>
            <p className="text-xs text-emerald-300/70">
              No products match your selected criteria. Try resetting filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 bg-amber-400 text-slate-950 text-xs uppercase tracking-wider font-bold rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const displayPrice = product.discountedPrice || product.basePrice;
              return (
                <div
                  key={product.id}
                  className="bg-[#112a1f] rounded border border-emerald-900/80 overflow-hidden flex flex-col justify-between hover:border-amber-400/60 transition-all group"
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
                        <div className="absolute top-3 left-3 bg-slate-950/85 text-amber-300 text-[10px] px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{product.originRegion.split('(')[0]}</span>
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
                        LKR {displayPrice.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {product.variants[0]?.name || 'Standard Unit'}
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo(`/ran-diriya/product/${product.id}`)}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors"
                    >
                      Select Packaging
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
