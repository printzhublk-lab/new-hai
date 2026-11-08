import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, ArrowRight, ShoppingBag, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

export const RivoraCart: React.FC = () => {
  const { rivoraCart, updateCartQuantity, removeFromCart, navigateTo, clearCart } = useApp();

  const subtotal = rivoraCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const estimatedDeliveryFee = subtotal > 0 ? (subtotal >= 15000 ? 0 : 600) : 0;
  const finalTotal = subtotal + estimatedDeliveryFee;

  if (rivoraCart.length === 0) {
    return (
      <div className="bg-[#faf8f5] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded border border-[#e8e2d9] shadow-sm max-w-md text-center space-y-4">
          <div className="w-12 h-12 bg-[#faf8f5] text-[#244233] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif-luxury font-bold text-[#1b3327]">
            Your Rivora Bag is Empty
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Discover our fresh hand-tied floral bouquets, celebratory gift collections, and artisan café pairings.
          </p>
          <button
            onClick={() => navigateTo('/rivora/shop')}
            className="w-full py-3 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-widest font-medium rounded transition-colors"
          >
            Explore Flowers & Gifts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between border-b border-[#e8e2d9] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
              Rivora Exclusive Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327]">
              Your Shopping Bag ({rivoraCart.reduce((sum, i) => sum + i.quantity, 0)} items)
            </h1>
          </div>
          <button
            onClick={() => clearCart('rivora')}
            className="text-xs text-slate-400 hover:text-red-600 transition-colors"
          >
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {rivoraCart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded border border-[#e8e2d9] shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded border border-[#e8e2d9] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#5c7a68] uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-serif-luxury font-bold text-[#1b3327]">
                      {item.name}
                    </h3>
                    {item.selectedVariant && (
                      <div className="text-xs text-slate-500 font-medium">
                        Variant: {item.selectedVariant.name}
                      </div>
                    )}
                    {item.personalization?.requestedDeliveryDate && (
                      <div className="text-[11px] text-[#244233] flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-[#5c7a68]" />
                        <span>Requested Delivery: {item.personalization.requestedDeliveryDate}</span>
                      </div>
                    )}
                    {item.personalization?.greetingCardMessage && (
                      <div className="text-[11px] text-slate-500 italic max-w-sm line-clamp-1">
                        Card: "{item.personalization.greetingCardMessage}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-[#1b3327]">
                      LKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      LKR {item.unitPrice.toLocaleString()} each
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#e8e2d9] rounded overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity('rivora', item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-[#faf8f5]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-mono font-bold text-[#1b3327]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity('rivora', item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-[#faf8f5]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart('rivora', item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 bg-emerald-50 rounded border border-emerald-100 text-xs text-emerald-900 flex items-center justify-between">
              <span>{subtotal >= 15000 ? '🎉 You qualify for FREE Delivery across Colombo!' : `Add LKR ${(15000 - subtotal).toLocaleString()} more for FREE Delivery in Colombo.`}</span>
              <button
                onClick={() => navigateTo('/rivora/shop')}
                className="font-semibold underline hover:text-emerald-950 whitespace-nowrap"
              >
                Add more items
              </button>
            </div>
          </div>

          {/* Order Summary & Checkout Action */}
          <div className="lg:col-span-4 bg-white p-6 rounded border border-[#e8e2d9] shadow-sm space-y-5">
            <h3 className="text-base font-serif-luxury font-bold text-[#1b3327] pb-3 border-b border-[#f4efe8]">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono text-slate-900">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Colombo Delivery</span>
                <span className="font-mono text-slate-900">
                  {estimatedDeliveryFee === 0 ? 'FREE' : `LKR ${estimatedDeliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-[#f4efe8] pt-3 flex justify-between font-bold text-sm text-[#1b3327]">
                <span>Total Amount</span>
                <span className="font-mono">LKR {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/rivora/checkout')}
              className="w-full py-3.5 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Rivora Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-[#f4efe8]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Isolated store checkout (Rivora items only)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Supports PayHere Sri Lanka, Cash on Delivery & Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
