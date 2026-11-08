import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, Order } from '../../types';
import { 
  CreditCard, 
  Building, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Globe2, 
  ShieldCheck, 
  Package 
} from 'lucide-react';

export const RanDiriyaCheckout: React.FC = () => {
  const { ranDiriyaCart, placeOrder, navigateTo, showToast } = useApp();

  const subtotal = ranDiriyaCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [country, setCountry] = useState('Sri Lanka');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('Kandy');
  const [district, setDistrict] = useState('Kandy District');
  const [postalCode, setPostalCode] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payhere');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const isInternational = country !== 'Sri Lanka';

  // Delivery Fee Calculation
  const deliveryFee = isInternational
    ? (subtotal >= 120000 ? 0 : 12500)
    : (subtotal >= 8000 ? 0 : 450);

  const totalPayable = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'CEYLONHERITAGE') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      showToast(`Coupon CEYLONHERITAGE applied: LKR ${discount.toLocaleString()} off!`, 'success');
    } else {
      showToast('Invalid coupon code. Try "CEYLONHERITAGE"', 'error');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !addressLine1 || !city) {
      showToast('Please complete all mandatory customer and destination fields', 'error');
      return;
    }

    if (ranDiriyaCart.length === 0) {
      showToast('Your Ran Diriya cart is empty', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate gateway authorization
      await new Promise(resolve => setTimeout(resolve, 800));

      const newOrder = await placeOrder({
        businessId: 'ran_diriya',
        status: paymentMethod === 'payhere' ? 'Payment Confirmed' : 'Pending',
        items: [...ranDiriyaCart],
        subtotal,
        discountAmount,
        couponCode: discountAmount > 0 ? couponCode : undefined,
        deliveryDetails: {
          customerName,
          customerEmail,
          customerPhone,
          addressLine1,
          city,
          district: isInternational ? city : district,
          postalCode,
          country,
          deliveryOption: isInternational ? 'international_express' : 'standard',
          deliveryFee,
          instructions
        },
        paymentMethod,
        paymentReference: paymentMethod === 'payhere' ? `PAYHERE-RD-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
        paymentStatus: paymentMethod === 'payhere' ? 'paid' : 'pending',
        totalAmount: totalPayable,
      });

      setPlacedOrder(newOrder);
    } catch (err) {
      showToast('Transaction could not be completed. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Confirmation screen
  if (placedOrder) {
    return (
      <div className="bg-[#0b1f16] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-emerald-50">
        <div className="max-w-2xl mx-auto bg-[#112a1f] p-8 sm:p-10 rounded border border-emerald-900 shadow-2xl text-center space-y-6">
          <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
              Ran Diriya Pure Ceylon Harvest
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-brand-cinzel mt-1">
              Order Confirmed & Staged for Dispatch
            </h1>
            <p className="text-xs text-emerald-300 mt-2 font-mono">
              Order ID: <strong className="text-amber-300">{placedOrder.id}</strong> · Courier Ref: {placedOrder.trackingNumber}
            </p>
          </div>

          <div className="p-4 bg-[#0c2218] rounded border border-emerald-900 text-left text-xs space-y-2">
            <div className="flex justify-between font-semibold text-white">
              <span>Consignee:</span>
              <span>{placedOrder.deliveryDetails.customerName} ({placedOrder.deliveryDetails.country})</span>
            </div>
            <div className="flex justify-between text-emerald-300">
              <span>Shipping Address:</span>
              <span>{placedOrder.deliveryDetails.addressLine1}, {placedOrder.deliveryDetails.city}</span>
            </div>
            <div className="flex justify-between text-emerald-300">
              <span>Payment Mode:</span>
              <span className="uppercase font-mono">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span>
            </div>
            <div className="border-t border-emerald-900 pt-2 flex justify-between font-bold text-sm text-white">
              <span>Total Amount Paid:</span>
              <span className="font-mono text-amber-300">LKR {placedOrder.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-emerald-300/80 leading-relaxed">
            Your export documentation has been prepared. Export orders are shipped via DHL Express or scheduled courier with tracking notification sent to {placedOrder.deliveryDetails.customerEmail}.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button
              onClick={() => navigateTo('/ran-diriya/account')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors"
            >
              Track Spice Shipment
            </button>
            <button
              onClick={() => navigateTo('/ran-diriya/shop')}
              className="px-6 py-3 bg-[#0c2218] hover:bg-emerald-900 text-amber-300 border border-emerald-800 text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (ranDiriyaCart.length === 0) {
    return (
      <div className="bg-[#0b1f16] min-h-[60vh] flex items-center justify-center py-20 px-4 text-center text-emerald-50">
        <div>
          <h2 className="text-xl font-bold font-brand-cinzel text-white">Cart is Empty</h2>
          <button
            onClick={() => navigateTo('/ran-diriya/shop')}
            className="mt-4 px-5 py-2.5 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded"
          >
            Explore Spices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('/ran-diriya/cart')}
          className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-300 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold font-brand-cinzel text-white mb-8">
          Ran Diriya Checkout
        </h1>

        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Customer Info */}
              <div className="bg-[#112a1f] p-6 rounded border border-emerald-900/80 shadow-md space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-brand-cinzel border-b border-emerald-900/60 pb-2">
                  1. Buyer Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Liam Henderson"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="liam@gmail.com"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+94 77 000 0000"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="bg-[#112a1f] p-6 rounded border border-emerald-900/80 shadow-md space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-brand-cinzel border-b border-emerald-900/60 pb-2">
                  2. Shipping Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Destination Country *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="Sri Lanka">Sri Lanka (Domestic)</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Kandy / London / Hamburg"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Street Address / Postal Delivery Point *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="Street address, building, floor or warehouse"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Postal Code / Zip
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 20000 / SW1A 1AA"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                      Delivery Instructions
                    </label>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="e.g. Customs clearance ref, gate contact"
                      className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-[#112a1f] p-6 rounded border border-emerald-900/80 shadow-md space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-brand-cinzel border-b border-emerald-900/60 pb-2">
                  3. Payment Method
                </h3>

                <div className="space-y-3">
                  <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                    paymentMethod === 'payhere' ? 'border-amber-400 bg-amber-400/10' : 'border-emerald-900 bg-[#0c2218]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'payhere'}
                      onChange={() => setPaymentMethod('payhere')}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>PayHere Gateway (Visa / Mastercard / Amex / UnionPay)</span>
                      </div>
                      <p className="text-[11px] text-emerald-300 mt-1">
                        Secure instant online card payment. Supports Sri Lankan rupees and international credit cards.
                      </p>
                    </div>
                  </label>

                  <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                    paymentMethod === 'bank_transfer' ? 'border-amber-400 bg-amber-400/10' : 'border-emerald-900 bg-[#0c2218]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <Building className="w-4 h-4 text-blue-400" />
                        <span>Commercial Bank / International Bank Wire (SWIFT)</span>
                      </div>
                      <p className="text-[11px] text-emerald-300 mt-1">
                        Recommended for B2B bulk and international orders. Bank remittance details provided upon submission.
                      </p>
                    </div>
                  </label>

                  {!isInternational && (
                    <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                      paymentMethod === 'cod' ? 'border-amber-400 bg-amber-400/10' : 'border-emerald-900 bg-[#0c2218]'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-bold text-white">
                          <Banknote className="w-4 h-4 text-emerald-400" />
                          <span>Cash on Delivery (Domestic Islandwide Only)</span>
                        </div>
                        <p className="text-[11px] text-emerald-300 mt-1">
                          Pay cash upon package delivery by courier within Sri Lanka.
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-[#112a1f] p-6 rounded border border-emerald-900/80 shadow-md space-y-5">
              <h3 className="text-base font-bold font-brand-cinzel text-white pb-3 border-b border-emerald-900/60">
                Ran Diriya Cart Summary
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {ranDiriyaCart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="pr-2">
                      <div className="font-medium text-white line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-emerald-300">Qty: {item.quantity} · {item.selectedVariant?.name || ''}</div>
                    </div>
                    <div className="font-mono text-amber-300 shrink-0">
                      LKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="pt-2 border-t border-emerald-900/60">
                <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                  Heritage Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. CEYLONHERITAGE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs uppercase border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-3 py-1.5 bg-amber-400 text-slate-950 text-xs uppercase font-bold rounded"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs pt-3 border-t border-emerald-900/60">
                <div className="flex justify-between text-emerald-200">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">LKR {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount (CEYLONHERITAGE)</span>
                    <span className="font-mono">- LKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-200">
                  <span>
                    {isInternational ? 'International Air Cargo (DHL)' : 'Islandwide Courier'}
                  </span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-emerald-900/60 pt-3 flex justify-between font-bold text-sm text-white">
                  <span>Total Payable</span>
                  <span className="font-mono text-amber-300">LKR {totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>{isProcessing ? 'Verifying Gateway...' : `Confirm & Pay LKR ${totalPayable.toLocaleString()}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
