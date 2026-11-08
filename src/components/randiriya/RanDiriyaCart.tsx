import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, ArrowRight, ShoppingBag, Globe2, ShieldCheck, Scale } from 'lucide-react';

export const RanDiriyaCart: React.FC = () => {
  const { ranDiriyaCart, updateCartQuantity, removeFromCart, navigateTo, clearCart } = useApp();
  const [shippingMode, setShippingMode] = useState<'domestic' | 'international'>('domestic');

  const subtotal = ranDiriyaCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Delivery fee calculation
  const deliveryFee = shippingMode === 'domestic'
    ? (subtotal >= 8000 ? 0 : 450)
    : (subtotal >= 120000 ? 0 : 12500);

  const finalTotal = subtotal + deliveryFee;

  if (ranDiriyaCart.length === 0) {
    return (
      <div className="bg-[#0b1f16] min-h-[70vh] flex items-center justify-center py-20 px-4 text-emerald-50">
        <div className="bg-[#112a1f] p-10 rounded border border-emerald-900 shadow-xl max-w-md text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-950 text-amber-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-brand-cinzel text-white">
            Your Ran Diriya Cart is Empty
          </h2>
          <p className="text-xs text-emerald-300 leading-relaxed">
            Experience the aroma of authentic Ceylon Alba cinnamon, single-estate high-grown black tea, and export-grade peppercorns.
          </p>
          <button
            onClick={() => navigateTo('/ran-diriya/shop')}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors"
          >
            Explore Ceylon Harvest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between border-b border-emerald-900/60 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
              Ran Diriya Ceylon Cart
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-brand-cinzel text-white">
              Shopping Cart ({ranDiriyaCart.reduce((sum, i) => sum + i.quantity, 0)} items)
            </h1>
          </div>
          <button
            onClick={() => clearCart('ran_diriya')}
            className="text-xs text-emerald-400 hover:text-rose-400 transition-colors"
          >
            Clear Spice Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {ranDiriyaCart.map((item) => (
              <div
                key={item.id}
                className="bg-[#112a1f] p-5 rounded border border-emerald-900/80 shadow-md flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded border border-emerald-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-brand-cinzel">
                      {item.name}
                    </h3>
                    {item.selectedVariant && (
                      <div className="text-xs text-emerald-300 font-medium">
                        Packaging / Weight: {item.selectedVariant.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-amber-300">
                      LKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-400/80 font-mono">
                      LKR {item.unitPrice.toLocaleString()} each
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-emerald-800 rounded overflow-hidden bg-[#0c2218]">
                      <button
                        onClick={() => updateCartQuantity('ran_diriya', item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-emerald-200 hover:bg-emerald-900"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity('ran_diriya', item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-emerald-200 hover:bg-emerald-900"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart('ran_diriya', item.id)}
                      className="text-emerald-400 hover:text-rose-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Destination Mode Selector */}
            <div className="bg-[#112a1f] p-4 rounded border border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-emerald-200">
                <span className="font-bold text-amber-300 block mb-0.5">Shipping Destination Mode:</span>
                <span>Choose whether your spice and tea package will be delivered within Sri Lanka or via international air cargo.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShippingMode('domestic')}
                  className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                    shippingMode === 'domestic'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-[#0c2218] text-emerald-300 hover:text-white'
                  }`}
                >
                  Islandwide Sri Lanka
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMode('international')}
                  className={`px-3 py-1.5 text-xs rounded font-medium transition-colors flex items-center gap-1.5 ${
                    shippingMode === 'international'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-[#0c2218] text-emerald-300 hover:text-white'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>International Air (DHL)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4 bg-[#112a1f] p-6 rounded border border-emerald-900/80 shadow-md space-y-5">
            <h3 className="text-base font-bold font-brand-cinzel text-white pb-3 border-b border-emerald-900/60">
              Order Calculation
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-emerald-200">
                <span>Subtotal</span>
                <span className="font-mono text-white">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-200">
                <span>
                  {shippingMode === 'domestic' ? 'Islandwide Courier' : 'International Express Air'}
                </span>
                <span className="font-mono text-white">
                  {deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-emerald-900/60 pt-3 flex justify-between font-bold text-sm text-white">
                <span>Total Amount</span>
                <span className="font-mono text-amber-300">LKR {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/ran-diriya/checkout')}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Ran Diriya Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-emerald-300/80 space-y-1.5 pt-2 border-t border-emerald-900/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Isolated store checkout (Ran Diriya items only)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Exports handled via HAI Logistic customs & freight desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
