import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, Order } from '../../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Truck,
  ArrowLeft
} from 'lucide-react';

export const RivoraCheckout: React.FC = () => {
  const { rivoraCart, placeOrder, navigateTo, showToast } = useApp();

  const subtotal = rivoraCart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('Colombo 03');
  const [district, setDistrict] = useState('Colombo');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express_same_day'>('standard');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payhere');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Delivery Fee Calculation
  const deliveryFee = subtotal >= 15000 
    ? (deliveryOption === 'express_same_day' ? 600 : 0)
    : (deliveryOption === 'express_same_day' ? 1200 : 600);

  const totalPayable = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'RIVORA10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      showToast(`Coupon RIVORA10 applied: LKR ${discount.toLocaleString()} off!`, 'success');
    } else {
      showToast('Invalid coupon code. Try "RIVORA10"', 'error');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !addressLine1) {
      showToast('Please complete all required customer and delivery fields', 'error');
      return;
    }

    if (rivoraCart.length === 0) {
      showToast('Your shopping bag is empty', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate gateway authorization for PayHere sandbox
      await new Promise(resolve => setTimeout(resolve, 800));

      const newOrder = await placeOrder({
        businessId: 'rivora',
        status: paymentMethod === 'payhere' ? 'Payment Confirmed' : 'Pending',
        items: [...rivoraCart],
        subtotal,
        discountAmount,
        couponCode: discountAmount > 0 ? couponCode : undefined,
        deliveryDetails: {
          customerName,
          customerEmail,
          customerPhone,
          addressLine1,
          city,
          district,
          country: 'Sri Lanka',
          deliveryOption,
          deliveryFee,
          instructions
        },
        paymentMethod,
        paymentReference: paymentMethod === 'payhere' ? `PAYHERE-SL-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
        paymentStatus: paymentMethod === 'payhere' ? 'paid' : 'pending',
        totalAmount: totalPayable,
      });

      setPlacedOrder(newOrder);
    } catch (err) {
      showToast('Checkout transaction failed. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Confirmation Screen
  if (placedOrder) {
    return (
      <div className="bg-[#faf8f5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded border border-[#e8e2d9] shadow-sm text-center space-y-6">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
              Rivora Floral & Gift Boutique
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327] mt-1">
              Order Confirmed & Payment Received
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Order ID: <strong className="text-[#1b3327]">{placedOrder.id}</strong> · Tracking Ref: {placedOrder.trackingNumber}
            </p>
          </div>

          <div className="p-4 bg-[#faf8f5] rounded border border-[#e8e2d9] text-left text-xs space-y-2">
            <div className="flex justify-between font-semibold text-[#1b3327]">
              <span>Recipient / Customer:</span>
              <span>{placedOrder.deliveryDetails.customerName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Destination:</span>
              <span>{placedOrder.deliveryDetails.addressLine1}, {placedOrder.deliveryDetails.city}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <span className="uppercase font-mono">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span>
            </div>
            <div className="border-t border-[#e8e2d9] pt-2 flex justify-between font-bold text-sm text-[#1b3327]">
              <span>Final Total Paid:</span>
              <span className="font-mono">LKR {placedOrder.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            A confirmation dispatch notice has been prepared for {placedOrder.deliveryDetails.customerEmail}. Our floral atelier in Colombo will hand-arrange your blooms and hand over to our courier.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button
              onClick={() => navigateTo('/rivora/account')}
              className="px-6 py-3 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors"
            >
              Track Order Status
            </button>
            <button
              onClick={() => navigateTo('/rivora/shop')}
              className="px-6 py-3 bg-white hover:bg-[#faf8f5] text-[#244233] border border-[#e8e2d9] text-xs uppercase tracking-widest font-semibold rounded transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (rivoraCart.length === 0) {
    return (
      <div className="bg-[#faf8f5] min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
        <div>
          <h2 className="text-xl font-serif-luxury font-bold text-[#1b3327]">Shopping Bag is Empty</h2>
          <button
            onClick={() => navigateTo('/rivora/shop')}
            className="mt-4 px-5 py-2.5 bg-[#244233] text-white text-xs uppercase tracking-widest rounded"
          >
            Explore Flowers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('/rivora/cart')}
          className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#5c7a68] hover:text-[#244233] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327] mb-8">
          Rivora Boutique Checkout
        </h1>

        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Columns: Details & Payment */}
            <div className="lg:col-span-8 space-y-6">
              {/* Customer Details */}
              <div className="bg-white p-6 rounded border border-[#e8e2d9] shadow-sm space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1b3327] border-b border-[#f4efe8] pb-2">
                  1. Customer & Sender Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ruwanthi Perera"
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="ruwanthi@gmail.com"
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-6 rounded border border-[#e8e2d9] shadow-sm space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1b3327] border-b border-[#f4efe8] pb-2">
                  2. Colombo Delivery Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Street Address / House No / Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="No 28/4, Alfred Place"
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Colombo 03 / Kollupitiya"
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none focus:ring-1 focus:ring-[#244233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      District
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none"
                    >
                      <option value="Colombo">Colombo District</option>
                      <option value="Gampaha">Gampaha District</option>
                      <option value="Kalutara">Kalutara District</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-2">
                    Delivery Speed & Handling
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`p-3 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                      deliveryOption === 'standard' ? 'border-[#244233] bg-[#faf8f5]' : 'border-[#e8e2d9]'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryOption"
                        checked={deliveryOption === 'standard'}
                        onChange={() => setDeliveryOption('standard')}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="font-semibold text-[#1b3327]">Standard Colombo Delivery</div>
                        <div className="text-[11px] text-slate-500">Delivered within scheduled date window (LKR 600 or Free over 15k)</div>
                      </div>
                    </label>

                    <label className={`p-3 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                      deliveryOption === 'express_same_day' ? 'border-[#244233] bg-[#faf8f5]' : 'border-[#e8e2d9]'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryOption"
                        checked={deliveryOption === 'express_same_day'}
                        onChange={() => setDeliveryOption('express_same_day')}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="font-semibold text-[#1b3327]">Express Same-Day Priority</div>
                        <div className="text-[11px] text-slate-500">Immediate courier dedicated dispatch within 3 hours (LKR 1,200)</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Ring bell twice, deliver to Dr. Dilini in person"
                    className="w-full px-3 py-2 text-xs border border-[#e8e2d9] rounded bg-[#faf8f5] text-[#244233] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded border border-[#e8e2d9] shadow-sm space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1b3327] border-b border-[#f4efe8] pb-2">
                  3. Payment Method
                </h3>

                <div className="space-y-3">
                  <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                    paymentMethod === 'payhere' ? 'border-[#244233] bg-[#faf8f5]' : 'border-[#e8e2d9]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'payhere'}
                      onChange={() => setPaymentMethod('payhere')}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-semibold text-[#1b3327]">
                        <CreditCard className="w-4 h-4 text-[#244233]" />
                        <span>PayHere Sri Lanka (Visa / Mastercard / FriMi / Genie)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Secure instant checkout via PayHere merchant gateway. Sandbox mode active for live testing.
                      </p>
                    </div>
                  </label>

                  <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#244233] bg-[#faf8f5]' : 'border-[#e8e2d9]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-semibold text-[#1b3327]">
                        <Banknote className="w-4 h-4 text-emerald-700" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Pay cash directly to the floral delivery rider upon presentation.
                      </p>
                    </div>
                  </label>

                  <label className={`p-4 rounded border text-xs cursor-pointer flex items-start gap-3 transition-colors ${
                    paymentMethod === 'bank_transfer' ? 'border-[#244233] bg-[#faf8f5]' : 'border-[#e8e2d9]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-semibold text-[#1b3327]">
                        <Building className="w-4 h-4 text-blue-700" />
                        <span>Direct Bank Transfer (Commercial Bank / HNB)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Bank details provided on completion. Orders released upon receipt verification.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Summary */}
            <div className="lg:col-span-4 bg-white p-6 rounded border border-[#e8e2d9] shadow-sm space-y-5">
              <h3 className="text-base font-serif-luxury font-bold text-[#1b3327] pb-3 border-b border-[#f4efe8]">
                Rivora Order Breakdown
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {rivoraCart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="pr-2">
                      <div className="font-medium text-[#1b3327] line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-slate-500">Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant.name}` : ''}</div>
                    </div>
                    <div className="font-mono text-slate-900 shrink-0">
                      LKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="pt-2 border-t border-[#f4efe8]">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Promotional Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. RIVORA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs uppercase border border-[#e8e2d9] rounded bg-[#faf8f5] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-3 py-1.5 bg-[#244233] text-white text-xs uppercase font-medium rounded"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#f4efe8]">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-900">LKR {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount (RIVORA10)</span>
                    <span className="font-mono">- LKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge</span>
                  <span className="font-mono text-slate-900">
                    {deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-[#f4efe8] pt-3 flex justify-between font-bold text-sm text-[#1b3327]">
                  <span>Total Payable</span>
                  <span className="font-mono">LKR {totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>{isProcessing ? 'Processing Transaction...' : `Confirm & Pay LKR ${totalPayable.toLocaleString()}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
