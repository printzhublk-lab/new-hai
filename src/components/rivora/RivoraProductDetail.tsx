import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductVariant } from '../../types';
import { 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  Check, 
  ArrowLeft,
  Truck,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface Props {
  productId: string;
}

export const RivoraProductDetail: React.FC<Props> = ({ productId }) => {
  const { products, addToCart, navigateTo, showToast } = useApp();

  const product = products.find(p => p.id === productId && p.businessId === 'rivora');

  if (!product) {
    return (
      <div className="bg-[#faf8f5] min-h-screen py-20 px-4 text-center">
        <h2 className="text-xl font-serif-luxury font-bold text-[#1b3327]">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested arrangement could not be located in our catalogue.</p>
        <button
          onClick={() => navigateTo('/rivora/shop')}
          className="mt-4 px-4 py-2 bg-[#244233] text-white text-xs uppercase tracking-wider rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    return product.variants && product.variants.length > 0 ? product.variants[0] : {
      id: 'default',
      name: 'Standard Arrangement',
      price: product.discountedPrice || product.basePrice,
      sku: product.sku,
      stock: product.stock
    };
  });

  const [selectedArrangement, setSelectedArrangement] = useState<string>(() => {
    return product.arrangementOptions && product.arrangementOptions.length > 0
      ? product.arrangementOptions[0]
      : 'Signature Presentation';
  });

  // Personalization State
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [greetingCardMessage, setGreetingCardMessage] = useState('');
  const [requestedDeliveryDate, setRequestedDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const activePrice = selectedVariant.price;

  const handleAddToCart = () => {
    addToCart('rivora', {
      productId: product.id,
      businessId: 'rivora',
      name: product.name,
      category: product.category,
      image: product.images[0],
      unitPrice: activePrice,
      quantity,
      selectedVariant,
      personalization: {
        recipientName: recipientName.trim() || undefined,
        recipientPhone: recipientPhone.trim() || undefined,
        greetingCardMessage: greetingCardMessage.trim() || undefined,
        requestedDeliveryDate,
        deliveryInstructions: deliveryInstructions.trim() || undefined,
      }
    });
    navigateTo('/rivora/cart');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Rivora Concierge, I am inquiring about "${product.name}" (${selectedVariant.name}). Can you assist with delivery availability?`
  );

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => navigateTo('/rivora/shop')}
          className="mb-8 flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#5c7a68] hover:text-[#244233] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        {/* 2-Column Split Contiguous Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery & Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded border border-[#e8e2d9] overflow-hidden bg-white shadow-sm aspect-4/3 sm:aspect-16/11">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Personalized Card Live Mockup Preview */}
            {greetingCardMessage && (
              <div className="bg-white p-6 rounded border border-[#d8cdbd] shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] text-amber-700 font-serif-luxury tracking-widest uppercase">
                  Wax Seal Calligraphy Preview
                </div>
                <div className="text-xs text-[#5c7a68] uppercase tracking-wider mb-2 font-semibold">
                  Personal Greeting Card (Included)
                </div>
                <div className="font-serif-luxury text-slate-800 italic text-sm leading-relaxed whitespace-pre-line border-l-2 border-[#244233] pl-3">
                  "{greetingCardMessage}"
                </div>
                {recipientName && (
                  <div className="text-right text-xs text-[#244233] font-semibold mt-3 font-serif-luxury">
                    For: {recipientName}
                  </div>
                )}
              </div>
            )}

            {/* Delivery Assurance & Care */}
            <div className="bg-white p-6 rounded border border-[#e8e2d9] space-y-3 text-xs text-[#4a5f52]">
              <div className="font-semibold text-[#1b3327] uppercase tracking-wider">
                The Rivora Guarantee
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#244233] shrink-0" />
                <span>Temperature-controlled courier dispatch across Greater Colombo.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#244233] shrink-0" />
                <span>Morning-fresh stems sourced directly from high-elevation glasshouses.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#244233] shrink-0" />
                <span>Includes flower food sachet and handwritten botanical care guide.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 bg-white p-8 rounded border border-[#e8e2d9] shadow-sm space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#5c7a68] font-semibold mb-1">
                {product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327]">
                {product.name}
              </h1>
              <div className="mt-2 text-xs text-slate-400 font-mono">
                SKU: {selectedVariant.sku || product.sku}
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-b border-[#f4efe8] py-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono text-[#1b3327]">
                LKR {activePrice.toLocaleString()}
              </span>
              {product.discountedPrice && (
                <span className="text-sm line-through text-slate-400 font-mono">
                  LKR {product.basePrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1b3327]">
                  Select Bouquet Size / Variant
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2.5 text-xs text-left rounded border transition-colors flex items-center justify-between ${
                        selectedVariant.id === v.id
                          ? 'border-[#244233] bg-[#244233] text-white font-medium'
                          : 'border-[#e8e2d9] text-[#244233] hover:border-[#244233]'
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="font-mono">LKR {v.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Arrangement Presentation Style */}
            {product.arrangementOptions && product.arrangementOptions.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1b3327]">
                  Vase & Presentation Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.arrangementOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedArrangement(opt)}
                      className={`px-3 py-2 text-xs text-left rounded border transition-colors ${
                        selectedArrangement === opt
                          ? 'border-[#244233] bg-[#faf8f5] text-[#244233] font-semibold'
                          : 'border-[#e8e2d9] text-slate-600 hover:border-[#244233]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recipient Personalization Box */}
            <div className="p-5 bg-[#faf8f5] rounded border border-[#e8e2d9] space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-[#244233] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Personalization & Delivery Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Dr. Dilini Senanayake"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e8e2d9] rounded text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Recipient Phone (for courier)
                  </label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+94 77 000 0000"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e8e2d9] rounded text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase">
                    Personalized Greeting Card Message
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {greetingCardMessage.length}/250 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={250}
                  value={greetingCardMessage}
                  onChange={(e) => setGreetingCardMessage(e.target.value)}
                  placeholder="Write your personal message. We will handcraft it with calligraphy on fine cotton paper with a wax seal."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#e8e2d9] rounded text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Requested Delivery Date *
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={requestedDeliveryDate}
                    onChange={(e) => setRequestedDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e8e2d9] rounded text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Leave at reception desk"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#e8e2d9] rounded text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                  />
                </div>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#e8e2d9] rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs text-slate-600 hover:bg-[#faf8f5]"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold text-[#1b3327]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs text-slate-600 hover:bg-[#faf8f5]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#244233] hover:bg-[#1a3226] text-white font-medium text-xs uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Rivora Bag · LKR {(activePrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* WhatsApp direct assistance */}
              <a
                href={`https://wa.me/94771234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Inquire on WhatsApp for Custom Requirements</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
