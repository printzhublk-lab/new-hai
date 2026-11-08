import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductVariant } from '../../types';
import { 
  ShoppingBag, 
  MapPin, 
  Award, 
  ShieldCheck, 
  ArrowLeft, 
  Container, 
  Scale, 
  FileCheck2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface Props {
  productId: string;
}

export const RanDiriyaProductDetail: React.FC<Props> = ({ productId }) => {
  const { products, addToCart, navigateTo, showToast } = useApp();

  const product = products.find(p => p.id === productId && p.businessId === 'ran_diriya');

  if (!product) {
    return (
      <div className="bg-[#0b1f16] min-h-screen py-20 px-4 text-center text-emerald-50">
        <h2 className="text-xl font-bold font-brand-cinzel text-white">Product Not Found</h2>
        <p className="text-xs text-emerald-300 mt-2">The requested harvest product was not found.</p>
        <button
          onClick={() => navigateTo('/ran-diriya/shop')}
          className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded"
        >
          Return to Ceylon Store
        </button>
      </div>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    return product.variants && product.variants.length > 0 ? product.variants[0] : {
      id: 'default',
      name: '100g Retail Pack',
      price: product.discountedPrice || product.basePrice,
      sku: product.sku,
      stock: product.stock
    };
  });

  const [quantity, setQuantity] = useState(1);

  const activePrice = selectedVariant.price;

  const handleAddToCart = () => {
    addToCart('ran_diriya', {
      productId: product.id,
      businessId: 'ran_diriya',
      name: product.name,
      category: product.category,
      image: product.images[0],
      unitPrice: activePrice,
      quantity,
      selectedVariant,
    });
    navigateTo('/ran-diriya/cart');
  };

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => navigateTo('/ran-diriya/shop')}
          className="mb-8 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-300 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Ceylon Spices & Tea</span>
        </button>

        {/* 2-Column Contiguous PDP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Showcase & Provenance Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded border border-emerald-900 overflow-hidden bg-emerald-950 shadow-xl aspect-4/3 sm:aspect-16/11">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Provenance & Agronomic Certification */}
            <div className="bg-[#112a1f] p-6 rounded border border-emerald-900/80 space-y-4 text-xs">
              <div className="text-amber-400 font-brand-cinzel font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Verified Ceylon Harvest Provenance</span>
              </div>

              {product.originRegion && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Origin Terroir</span>
                    <span className="text-emerald-200/80">{product.originRegion}</span>
                  </div>
                </div>
              )}

              {product.exportGrade && (
                <div className="flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Certified Export Standard</span>
                    <span className="text-emerald-200/80">{product.exportGrade}</span>
                  </div>
                </div>
              )}

              {product.ingredients && (
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Ingredients & Purity</span>
                    <span className="text-emerald-200/80">{product.ingredients}</span>
                  </div>
                </div>
              )}

              {product.storageInstructions && (
                <div className="flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Storage Recommendation</span>
                    <span className="text-emerald-200/80">{product.storageInstructions}</span>
                  </div>
                </div>
              )}
            </div>

            {/* B2B Export Box */}
            <div className="p-5 bg-gradient-to-r from-emerald-950 to-[#122e22] rounded border border-amber-500/30 text-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-amber-300 font-bold block uppercase font-brand-cinzel">
                  Wholesale & Bulk Orders Available
                </span>
                <span className="text-emerald-300 text-[11px]">
                  Need 50kg bags or multi-ton FCL container export? Request volume pricing.
                </span>
              </div>
              <button
                onClick={() => navigateTo('/ran-diriya/wholesale')}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded whitespace-nowrap"
              >
                Wholesale Form
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 bg-[#112a1f] p-8 rounded border border-emerald-900/80 shadow-md space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-brand-cinzel mb-1">
                {product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand-cinzel">
                {product.name}
              </h1>
              <div className="mt-1.5 text-xs text-emerald-400/70 font-mono">
                SKU: {selectedVariant.sku || product.sku}
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-emerald-900/60 py-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono text-amber-300">
                LKR {activePrice.toLocaleString()}
              </span>
              {product.discountedPrice && (
                <span className="text-sm line-through text-emerald-500 font-mono">
                  LKR {product.basePrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 ml-auto">
                Stock: {product.stock} units
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              {product.description}
            </p>

            {/* Weight and Packaging Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-amber-200 font-brand-cinzel">
                  Select Weight & Packaging Option
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-3 text-xs text-left rounded border transition-colors flex items-center justify-between ${
                        selectedVariant.id === v.id
                          ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                          : 'border-emerald-900 bg-[#0c2218] text-emerald-200 hover:border-emerald-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${selectedVariant.id === v.id ? 'text-amber-400' : 'text-emerald-700'}`} />
                        <span>{v.name}</span>
                      </div>
                      <span className="font-mono text-amber-300 font-semibold">
                        LKR {v.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Volume Purchasing Tier Callout */}
            <div className="p-3.5 bg-emerald-950/70 rounded border border-emerald-800/60 text-xs text-emerald-300 space-y-1">
              <div className="font-semibold text-white">Direct-from-Origin Value</div>
              <p className="text-[11px] text-emerald-300/80">
                Purchasing 5+ units of any variant qualifies for an automatic 5% volume adjustment at checkout.
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-emerald-800 rounded overflow-hidden bg-[#0c2218]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-900"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-900"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Ran Diriya Cart · LKR {(activePrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-emerald-400 pt-2 border-t border-emerald-900/60">
                <span>Worldwide Air Cargo & Domestic Islandwide Courier</span>
                <span className="font-mono">In Stock & Freshly Sealed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
