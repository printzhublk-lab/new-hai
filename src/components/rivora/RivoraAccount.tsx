import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { Search, CheckCircle2, Clock, Truck, Package, ArrowRight, Calendar } from 'lucide-react';

const STATUS_STEPS: OrderStatus[] = [
  'Pending',
  'Payment Confirmed',
  'Processing',
  'Ready for Dispatch',
  'Dispatched',
  'Delivered'
];

export const RivoraAccount: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [searchId, setSearchId] = useState('');

  const rivoraOrders = orders.filter(o => o.businessId === 'rivora');

  const selectedOrder = searchId
    ? rivoraOrders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase())
    : (rivoraOrders.length > 0 ? rivoraOrders[0] : null);

  const getStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="bg-[#faf8f5] text-[#244233] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
            Customer Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1b3327]">
            Rivora Order Tracking & Delivery Status
          </h1>
          <p className="text-xs sm:text-sm text-[#4a5f52]">
            Monitor your fresh floral preparation, greeting card calligraphy, and courier dispatch in real time.
          </p>
        </div>

        {/* Tracking Lookup Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="bg-white p-2 rounded border border-[#e8e2d9] shadow-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Enter Rivora Order ID (e.g. RIV-2026-8812)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 py-1.5 px-2 text-xs text-[#244233] focus:outline-none"
            />
            {searchId && (
              <button
                onClick={() => setSearchId('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {rivoraOrders.length === 0 ? (
          <div className="bg-white p-12 rounded border border-[#e8e2d9] text-center max-w-md mx-auto space-y-3">
            <h3 className="text-base font-serif-luxury font-bold text-[#1b3327]">
              No Orders Found
            </h3>
            <p className="text-xs text-slate-500">
              You haven't placed any floral orders yet. Explore our handcrafted bouquets and gifts.
            </p>
            <button
              onClick={() => navigateTo('/rivora/shop')}
              className="px-4 py-2 bg-[#244233] text-white text-xs uppercase tracking-wider rounded"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Orders Sidebar List */}
            <div className="lg:col-span-4 bg-white p-4 rounded border border-[#e8e2d9] shadow-sm space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-2 border-b border-[#f4efe8]">
                Recent Rivora Orders ({rivoraOrders.length})
              </h3>
              <div className="space-y-2">
                {rivoraOrders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSearchId(ord.id)}
                    className={`w-full p-3 rounded border text-left transition-colors flex items-center justify-between ${
                      selectedOrder?.id === ord.id
                        ? 'border-[#244233] bg-[#faf8f5]'
                        : 'border-[#f4efe8] hover:border-[#e8e2d9]'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-[#1b3327]">{ord.id}</div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString()} · {ord.items.length} item(s)
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {ord.status}
                      </span>
                      <div className="text-xs font-mono font-bold text-[#1b3327] mt-1">
                        LKR {ord.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Order Detail & Stepper */}
            {selectedOrder ? (
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded border border-[#e8e2d9] shadow-sm space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#f4efe8]">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#5c7a68]">
                      Order Details
                    </span>
                    <h2 className="text-xl font-serif-luxury font-bold text-[#1b3327]">
                      {selectedOrder.id}
                    </h2>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleString()} · Tracking: {selectedOrder.trackingNumber || 'Pending'}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-white bg-[#244233] px-3 py-1 rounded uppercase tracking-wider">
                      {selectedOrder.status}
                    </span>
                    <div className="text-sm font-mono font-bold text-[#1b3327] mt-1.5">
                      LKR {selectedOrder.totalAmount.toLocaleString()} ({selectedOrder.paymentStatus.toUpperCase()})
                    </div>
                  </div>
                </div>

                {/* Status Timeline Stepper */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Live Preparation & Delivery Milestones
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {STATUS_STEPS.map((step, idx) => {
                      const currentIdx = getStepIndex(selectedOrder.status);
                      const isComplete = currentIdx >= idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div
                          key={step}
                          className={`p-2.5 rounded border text-center text-xs transition-colors ${
                            isCurrent
                              ? 'bg-[#244233] text-white border-[#244233] font-bold'
                              : isComplete
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                              : 'bg-slate-50 text-slate-400 border-slate-100'
                          }`}
                        >
                          <div className="text-[10px] font-mono mb-1">0{idx + 1}</div>
                          <div className="line-clamp-2 leading-tight text-[11px]">{step}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-4 pt-4 border-t border-[#f4efe8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Arrangements & Gifts in this Delivery
                  </h4>

                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-[#faf8f5] rounded border border-[#e8e2d9]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded border border-[#e8e2d9]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-serif-luxury font-bold text-[#1b3327]">
                            {item.name}
                          </h5>
                          <div className="text-xs text-slate-500">
                            Qty: {item.quantity} · LKR {item.unitPrice.toLocaleString()} each
                          </div>
                          {item.personalization?.requestedDeliveryDate && (
                            <div className="text-[11px] text-[#244233] font-medium flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-[#5c7a68]" />
                              <span>Requested Delivery Date: {item.personalization.requestedDeliveryDate}</span>
                            </div>
                          )}
                          {item.personalization?.greetingCardMessage && (
                            <div className="text-[11px] text-slate-600 italic mt-1 bg-white p-2 rounded border border-[#e8e2d9]">
                              Card message: "{item.personalization.greetingCardMessage}"
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-mono font-bold text-[#1b3327]">
                          LKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipient & Shipping Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#f4efe8] text-xs">
                  <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-700 block uppercase">
                      Delivery Address
                    </span>
                    <div className="text-slate-900 font-medium">
                      {selectedOrder.deliveryDetails.customerName}
                    </div>
                    <div className="text-slate-600">
                      {selectedOrder.deliveryDetails.addressLine1}, {selectedOrder.deliveryDetails.city}
                    </div>
                    <div className="text-slate-500">
                      Phone: {selectedOrder.deliveryDetails.customerPhone}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-700 block uppercase">
                      Courier & Payment
                    </span>
                    <div className="text-slate-600">
                      Method: <span className="font-mono uppercase font-medium">{selectedOrder.paymentMethod}</span> ({selectedOrder.paymentStatus})
                    </div>
                    <div className="text-slate-600">
                      Delivery Option: <span className="capitalize">{selectedOrder.deliveryDetails.deliveryOption.replace('_', ' ')}</span>
                    </div>
                    {selectedOrder.deliveryDetails.instructions && (
                      <div className="text-slate-500 italic">
                        Note: {selectedOrder.deliveryDetails.instructions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
