import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const RivoraShop: React.FC = () => {
  const { products, navigateTo } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  const categories = [
    'All',
    'Flower Bouquets',
    'Premium Flowers',
    'Gift Collections',
    'Birthday Gifts',
    'Anniversary Gifts',
    'Special Occasion Gifts',
    'Café Products and Menu'
  ];

  const rivoraProducts = products.filter(p => p.businessId === 'rivora');

  const filteredProducts = rivoraProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = a.discountedPrice || a.basePrice;
    const priceB = b.discountedPrice || b.basePrice;
    if (sortBy === 'price_asc') return priceA - priceB;
    if (sortBy === 'price_desc') return priceB - priceA;
    return 0;
  });

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
            Rivora Floral & Gift Catalogue
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#1b3327]">
            Handcrafted Arrangements & Curated Gifts
          </h1>
          <p className="text-sm text-[#4a5f52] leading-relaxed">
            Order fresh flower bouquets, bespoke anniversary packages, and artisan café pairings with scheduled delivery throughout Colombo and suburbs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded border border-[#e8e2d9] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bouquets, hampers, roses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
              />
            </div>

            {/* Price Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
              <span className="text-[#5c7a68] whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] text-xs focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Interactive Filter Controls as functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#244233] text-white font-medium'
                    : 'text-[#4a5f52] hover:bg-[#f4efe8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded border border-[#e8e2d9] p-12 text-center space-y-3">
            <h3 className="text-base font-serif-luxury font-bold text-[#1b3327]">
              No Products Found
            </h3>
            <p className="text-xs text-slate-500">
              No arrangements match your selected filter or query. Try selecting another category.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#244233] text-white text-xs uppercase tracking-wider rounded"
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
                        LKR {displayPrice.toLocaleString()}
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
                      View & Personalize
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
