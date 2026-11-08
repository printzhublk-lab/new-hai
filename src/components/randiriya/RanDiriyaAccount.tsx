import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { Search, Globe2, CheckCircle2, Package, ArrowRight, Truck } from 'lucide-react';

const STATUS_STEPS: OrderStatus[] = [
  'Pending',
  'Payment Confirmed',
  'Processing',
  'Ready for Dispatch',
  'Dispatched',
  'Delivered'
];

export const RanDiriyaAccount: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [searchId, setSearchId] = useState('');

  const ranDiriyaOrders = orders.filter(o => o.businessId === 'ran_diriya');

  const selectedOrder = searchId
    ? ranDiriyaOrders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase())
    : (ranDiriyaOrders.length > 0 ? ranDiriyaOrders[0] : null);

  const getStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
            Spice Consignment Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-brand-cinzel text-white">
            Ran Diriya Order Tracking & Export Status
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80">
            Track vacuum-sealed packaging, export phytosanitary documentation, and courier or air freight transit.
          </p>
        </div>

        {/* Tracking Lookup Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="bg-[#112a1f] p-2 rounded border border-emerald-900 shadow-md flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400 ml-2" />
            <input
              type="text"
              placeholder="Enter Ran Diriya Order ID (e.g. RD-2026-4409)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 py-1.5 px-2 text-xs bg-transparent text-white focus:outline-none"
            />
            {searchId && (
              <button
                onClick={() => setSearchId('')}
                className="text-xs text-emerald-400 hover:text-white px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {ranDiriyaOrders.length === 0 ? (
          <div className="bg-[#112a1f] p-12 rounded border border-emerald-900 text-center max-w-md mx-auto space-y-3">
            <h3 className="text-base font-bold font-brand-cinzel text-white">
              No Orders Found
            </h3>
            <p className="text-xs text-emerald-300/70">
              You have not placed any spice or tea orders yet.
            </p>
            <button
              onClick={() => navigateTo('/ran-diriya/shop')}
              className="px-4 py-2 bg-amber-400 text-slate-950 text-xs uppercase tracking-wider font-bold rounded"
            >
              Browse Ceylon Spices
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Order List */}
            <div className="lg:col-span-4 bg-[#112a1f] p-4 rounded border border-emerald-900 shadow-md space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-900 font-brand-cinzel">
                Your Spice Orders ({ranDiriyaOrders.length})
              </h3>
              <div className="space-y-2">
                {ranDiriyaOrders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSearchId(ord.id)}
                    className={`w-full p-3 rounded border text-left transition-colors flex items-center justify-between ${
                      selectedOrder?.id === ord.id
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-emerald-900/60 bg-[#0c2218] hover:border-emerald-700'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-white">{ord.id}</div>
                      <div className="text-[10px] text-emerald-300">
                        {new Date(ord.createdAt).toLocaleDateString()} · {ord.items.length} item(s)
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                        {ord.status}
                      </span>
                      <div className="text-xs font-mono font-bold text-white mt-1">
                        LKR {ord.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Order Details */}
            {selectedOrder ? (
              <div className="lg:col-span-8 bg-[#112a1f] p-6 sm:p-8 rounded border border-emerald-900 shadow-md space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-emerald-900">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel">
                      Consignment Specification
                    </span>
                    <h2 className="text-xl font-bold font-brand-cinzel text-white">
                      {selectedOrder.id}
                    </h2>
                    <div className="text-xs text-emerald-300 mt-0.5 font-mono">
                      Created: {new Date(selectedOrder.createdAt).toLocaleString()} · Tracking: {selectedOrder.trackingNumber || 'Pending'}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded uppercase tracking-wider">
                      {selectedOrder.status}
                    </span>
                    <div className="text-sm font-mono font-bold text-amber-300 mt-1.5">
                      LKR {selectedOrder.totalAmount.toLocaleString()} ({selectedOrder.paymentStatus.toUpperCase()})
                    </div>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 font-brand-cinzel">
                    Export Processing & Dispatch Milestones
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
                              ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                              : isComplete
                              ? 'bg-emerald-950 text-amber-200 border-emerald-700'
                              : 'bg-[#0c2218] text-emerald-600 border-emerald-900'
                          }`}
                        >
                          <div className="text-[10px] font-mono mb-1">0{idx + 1}</div>
                          <div className="line-clamp-2 leading-tight text-[11px]">{step}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 pt-4 border-t border-emerald-900">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 font-brand-cinzel">
                    Items in Shipment
                  </h4>

                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-[#0c2218] rounded border border-emerald-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded border border-emerald-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-bold text-white font-brand-cinzel">
                            {item.name}
                          </h5>
                          <div className="text-xs text-emerald-300">
                            Qty: {item.quantity} · Packaging: {item.selectedVariant?.name || 'Standard'}
                          </div>
                        </div>
                        <div className="text-sm font-mono font-bold text-amber-300">
                          LKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consignee & Shipping Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-emerald-900 text-xs">
                  <div className="p-4 bg-[#0c2218] rounded border border-emerald-900 space-y-1">
                    <span className="font-semibold text-amber-300 block uppercase font-brand-cinzel">
                      Consignee Destination
                    </span>
                    <div className="text-white font-medium">
                      {selectedOrder.deliveryDetails.customerName}
                    </div>
                    <div className="text-emerald-300">
                      {selectedOrder.deliveryDetails.addressLine1}, {selectedOrder.deliveryDetails.city}
                    </div>
                    <div className="text-emerald-400">
                      Country: {selectedOrder.deliveryDetails.country} {selectedOrder.deliveryDetails.postalCode ? `(${selectedOrder.deliveryDetails.postalCode})` : ''}
                    </div>
                  </div>

                  <div className="p-4 bg-[#0c2218] rounded border border-emerald-900 space-y-1">
                    <span className="font-semibold text-amber-300 block uppercase font-brand-cinzel">
                      Carrier & Billing
                    </span>
                    <div className="text-emerald-300">
                      Carrier Mode: <span className="capitalize">{selectedOrder.deliveryDetails.deliveryOption.replace('_', ' ')}</span>
                    </div>
                    <div className="text-emerald-300">
                      Payment: <span className="font-mono uppercase font-bold text-white">{selectedOrder.paymentMethod}</span> ({selectedOrder.paymentStatus})
                    </div>
                    {selectedOrder.paymentReference && (
                      <div className="text-emerald-400 font-mono text-[10px]">
                        Ref: {selectedOrder.paymentReference}
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
