import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuotationRequest } from '../../types';
import { 
  Ship, 
  Plane, 
  FileCheck2, 
  ThermometerSnowflake, 
  Warehouse, 
  Truck, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Clock, 
  Anchor,
  HelpCircle
} from 'lucide-react';

export const HaiLogistics: React.FC = () => {
  const { submitQuotation, showToast } = useApp();

  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceType: 'Sea Freight' as QuotationRequest['serviceType'],
    originPort: 'Colombo Sea Port (SCT), Sri Lanka',
    destinationPort: '',
    cargoType: '',
    estimatedWeightKg: 1000,
    estimatedVolumeCbm: 10,
    timeline: 'Standard Sailing / Within 14 Days',
    additionalDetails: ''
  });

  const [submittedQuote, setSubmittedQuote] = useState<QuotationRequest | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.email || !form.phone || !form.destinationPort) {
      showToast('Please fill in all mandatory corporate quotation fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitQuotation({
        businessId: 'hai_logistic',
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType,
        originPort: form.originPort,
        destinationPort: form.destinationPort,
        cargoType: form.cargoType || 'Commercial General Merchandise',
        estimatedWeightKg: Number(form.estimatedWeightKg),
        estimatedVolumeCbm: Number(form.estimatedVolumeCbm),
        timeline: form.timeline,
        additionalDetails: form.additionalDetails
      });
      setSubmittedQuote(result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0f2744] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            HAI Logistic Corporate Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Logistics Services & Multimodal Freight Solutions
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Directly connected to the Port of Colombo and Bandaranaike International Airport, providing verified customs house brokerage, bonded warehousing, and global air/ocean freight.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
          Verified Service Capabilities
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Operational Scope & Port Infrastructure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <Ship className="w-8 h-8 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">Ocean Freight Forwarding</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Full container load (FCL) contracts with tier-1 shipping lines and scheduled less-than-container load (LCL) consolidation out of the Port of Colombo.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Direct sailings to Rotterdam, Hamburg, Jebel Ali, Singapore</li>
              <li>• Transshipment handling at South Asia Gateway Terminal (SAGT)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <Plane className="w-8 h-8 text-orange-600" />
            <h3 className="text-base font-bold text-slate-900">Air Cargo & Express Uplift</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Time-sensitive perishables, garment sample airlifts, high-value electronics, and aircraft on ground (AOG) priority forwarding via BIA Colombo.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Priority space allocations on scheduled passenger & freighter craft</li>
              <li>• Airport ramp supervision and immediate customs handover</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <FileCheck2 className="w-8 h-8 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">Customs House Brokerage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accredited customs brokerage team in Sri Lanka managing ASYCUDA World electronic data interchange, BOI TIEP scheme documentation, and tariff classifications.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Phytosanitary, SLSI & Health Ministry approvals</li>
              <li>• Duty exemption schemes & bonded transit clearance</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <ThermometerSnowflake className="w-8 h-8 text-cyan-700" />
            <h3 className="text-base font-bold text-slate-900">Cold Chain Management</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Active temperature logging from harvest/manufacture through port reefer plugging and vessel transit, safeguarding pharmaceuticals and perishables.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Calibrated temperature data loggers included</li>
              <li>• Port reefer pre-trip inspection (PTI) verification</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <Warehouse className="w-8 h-8 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900">Warehousing & Consolidation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strategically located Container Freight Station (CFS) facility with cross-docking capabilities, pallet shrink-wrapping, and 24/7 CCTV surveillance.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Short-term buffer staging and long-term storage</li>
              <li>• Barcode tracking and pick-pack dispatch</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded border border-slate-200 space-y-3">
            <Truck className="w-8 h-8 text-amber-700" />
            <h3 className="text-base font-bold text-slate-900">Project Cargo & Heavy Haulage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Turnkey multimodal handling for oversized machinery, power generation components, and industrial factory relocations across Sri Lanka.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Hydraulic multi-axle trailers & route surveys</li>
              <li>• Heavy-lift crane rigging & bridge clearance approvals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Logistics Process */}
      <section className="bg-white border-t border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Execution Standard
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            The HAI Logistics Delivery Process
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-orange-600">STAGE 01</span>
              <h4 className="text-base font-bold text-slate-900">Booking & Routing Assessment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluation of cargo volume, incoterms, vessel schedules, and freight rate optimization across primary ocean and air carriers.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-orange-600">STAGE 02</span>
              <h4 className="text-base font-bold text-slate-900">Documentation & Customs Compliance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verification of commercial invoices, packing lists, bill of lading issuance, and electronic declaration filing through Sri Lanka Customs.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-orange-600">STAGE 03</span>
              <h4 className="text-base font-bold text-slate-900">Multimodal Transit & Milestones</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous tracking of container moves, terminal gate-in, vessel stowage, and intermediate transshipment hubs.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-orange-600">STAGE 04</span>
              <h4 className="text-base font-bold text-slate-900">Discharge & Final Destination Handover</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Destination port handling, customs release notification, and coordinated inland transport delivery to client premises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quotation Form */}
      <section id="quote" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 sm:p-10">
          <div className="border-b border-slate-100 pb-6 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Corporate Quotation Engine
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Request a Formal Freight Quotation
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Submit your cargo specifications. Our commercial pricing team will review container availability and issue an official rate card.
            </p>
          </div>

          {submittedQuote ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">
                Quotation Request Submitted Successfully
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto">
                Reference ID: <strong className="font-mono text-emerald-950">{submittedQuote.id}</strong>
                <br />
                A designated logistics manager has received your inquiry for <strong>{submittedQuote.companyName}</strong> ({submittedQuote.serviceType}). Our commercial pricing desk in Colombo will respond to {submittedQuote.email} within 4 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedQuote(null)}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
                >
                  Submit Another Quote Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Ceylon Textile Industries PLC"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="e.g. Samantha Wickremasinghe"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="samantha@ceylontextiles.lk"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Telephone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+94 11 234 5678"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Required *
                  </label>
                  <select
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Sea Freight">Sea Freight (FCL / LCL)</option>
                    <option value="Air Freight">Air Freight Cargo</option>
                    <option value="Customs Brokerage">Customs House Brokerage Only</option>
                    <option value="Cold Chain">Cold Chain & Reefer Transit</option>
                    <option value="Warehousing">Warehousing & CFS Consolidation</option>
                    <option value="Project Cargo">Project Cargo & Heavy Haulage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Port of Origin *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.originPort}
                    onChange={(e) => setForm({ ...form, originPort: e.target.value })}
                    placeholder="Port of Origin"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Port / Airport of Destination *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.destinationPort}
                    onChange={(e) => setForm({ ...form, destinationPort: e.target.value })}
                    placeholder="e.g. Rotterdam Port, Netherlands or DXB Airport"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cargo Commodity & Type
                  </label>
                  <input
                    type="text"
                    value={form.cargoType}
                    onChange={(e) => setForm({ ...form, cargoType: e.target.value })}
                    placeholder="e.g. Ready-Made Garments, Rubber, Spices"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Gross Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.estimatedWeightKg}
                    onChange={(e) => setForm({ ...form, estimatedWeightKg: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Volume (CBM)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={form.estimatedVolumeCbm}
                    onChange={(e) => setForm({ ...form, estimatedVolumeCbm: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Shipment Schedule & Additional Requirements
                </label>
                <textarea
                  rows={3}
                  value={form.additionalDetails}
                  onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })}
                  placeholder="Specify cargo readiness date, container size requirement (20ft, 40ft HQ), temperature range if reefer, or customs documentation needs."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#0f2744] hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting Request...' : 'Submit Commercial Freight Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
