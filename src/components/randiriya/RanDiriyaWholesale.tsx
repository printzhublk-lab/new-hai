import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WholesaleEnquiry } from '../../types';
import { Container, Send, CheckCircle2, ShieldCheck, Globe2, FileCheck2, ArrowLeft } from 'lucide-react';

export const RanDiriyaWholesale: React.FC = () => {
  const { submitWholesale, navigateTo, showToast } = useApp();

  const [form, setForm] = useState({
    buyerName: '',
    companyName: '',
    country: 'Germany',
    email: '',
    phone: '',
    productInterests: ['Pure Ceylon Alba Cinnamon', 'Nuwara Eliya OP1 Black Tea'],
    estimatedVolume: '1 Metric Ton (Quarterly)',
    packagingPreference: '25kg Kraft poly-lined export sacks',
    portOfDischarge: '',
    comments: ''
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState<WholesaleEnquiry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const availableProducts = [
    'Pure Ceylon Alba Cinnamon',
    'Ceylon Cinnamon C5 Special',
    'Nuwara Eliya OP1 Black Tea',
    'Single-Estate BOPF Black Tea',
    'Matale Tellicherry Black Pepper Bold',
    'Green Cardamom Pods',
    'Hand-Sorted Grade 1 Cloves',
    'Custom Blend / White Label Retail Packaging'
  ];

  const handleProductToggle = (prod: string) => {
    if (form.productInterests.includes(prod)) {
      setForm({ ...form, productInterests: form.productInterests.filter(p => p !== prod) });
    } else {
      setForm({ ...form, productInterests: [...form.productInterests, prod] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.buyerName || !form.companyName || !form.email || !form.phone || !form.portOfDischarge) {
      showToast('Please complete all mandatory wholesale export fields', 'error');
      return;
    }
    if (form.productInterests.length === 0) {
      showToast('Please select at least one Ceylon product of interest', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitWholesale({
        businessId: 'ran_diriya',
        buyerName: form.buyerName,
        companyName: form.companyName,
        country: form.country,
        email: form.email,
        phone: form.phone,
        productInterests: form.productInterests,
        estimatedVolume: form.estimatedVolume,
        packagingPreference: form.packagingPreference,
        portOfDischarge: form.portOfDischarge,
        comments: form.comments
      });
      setSubmittedEnquiry(result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0b1f16] text-emerald-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('/ran-diriya')}
          className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-300 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Ran Diriya</span>
        </button>

        <div className="bg-[#112a1f] p-8 sm:p-10 rounded border border-emerald-900 shadow-2xl space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-brand-cinzel mb-1">
              B2B Commercial Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-brand-cinzel text-white">
              Bulk Spice & Ceylon Tea Export Inquiry
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 leading-relaxed">
              We supply international importers, wholesalers, spice blenders, and tea packers. In collaboration with parent company HAI Logistic, we provide complete ocean container freight (FCL/LCL), phytosanitary documentation, and export customs clearance.
            </p>
          </div>

          {submittedEnquiry ? (
            <div className="bg-emerald-950/80 border border-emerald-800 rounded p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="text-xl font-bold font-brand-cinzel text-white">
                Export Wholesale Inquiry Registered
              </h2>
              <p className="text-xs text-emerald-200 max-w-md mx-auto leading-relaxed">
                Reference ID: <strong className="font-mono text-amber-300">{submittedEnquiry.id}</strong>
                <br />
                Our export sales manager in Colombo will contact <strong>{submittedEnquiry.companyName}</strong> at {submittedEnquiry.email} with pro-forma rate cards and sample dispatch details for discharge at {submittedEnquiry.portOfDischarge}.
              </p>
              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Submit Additional Commercial Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Contact Buyer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.buyerName}
                    onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
                    placeholder="e.g. Klaus Schneider"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Company / Trading Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Schneider Gewürze GmbH"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="k.schneider@schneider-spices.de"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+49 89 1234 5678"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Buyer Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g. Germany / United Kingdom / UAE / USA"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Port of Discharge (POD) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.portOfDischarge}
                    onChange={(e) => setForm({ ...form, portOfDischarge: e.target.value })}
                    placeholder="e.g. Port of Hamburg or Jebel Ali Port"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Estimated Shipment Volume
                  </label>
                  <select
                    value={form.estimatedVolume}
                    onChange={(e) => setForm({ ...form, estimatedVolume: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="500kg - 1 Metric Ton (Trial LCL)">500kg - 1 Metric Ton (Trial LCL)</option>
                    <option value="1 Metric Ton (Quarterly)">1 Metric Ton (Quarterly)</option>
                    <option value="1x 20ft Full Container Load (FCL)">1x 20ft Full Container Load (FCL)</option>
                    <option value="1x 40ft Full Container Load (FCL)">1x 40ft Full Container Load (FCL)</option>
                    <option value="Multiple Containers Annually">Multiple Containers Annually</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                    Packaging Preference
                  </label>
                  <input
                    type="text"
                    value={form.packagingPreference}
                    onChange={(e) => setForm({ ...form, packagingPreference: e.target.value })}
                    placeholder="e.g. 25kg Kraft poly sacks, Wooden chests, Retail tins"
                    className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Product Interests Multi-select */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-2">
                  Products of Interest (Select all that apply) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableProducts.map((prod) => (
                    <label
                      key={prod}
                      className={`p-2.5 rounded border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                        form.productInterests.includes(prod)
                          ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                          : 'border-emerald-900 bg-[#0c2218] text-emerald-300 hover:border-emerald-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.productInterests.includes(prod)}
                        onChange={() => handleProductToggle(prod)}
                        className="rounded text-amber-500"
                      />
                      <span>{prod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 uppercase mb-1">
                  Technical Specifications, Evaluation Sample, or Incoterms
                </label>
                <textarea
                  rows={3}
                  value={form.comments}
                  onChange={(e) => setForm({ ...form, comments: e.target.value })}
                  placeholder="Specify desired Incoterms (FOB Colombo, CIF Destination), sample requirements, lab test parameters (coumarin %, moisture levels), or private labelling."
                  className="w-full px-3 py-2 text-xs border border-emerald-800 rounded bg-[#0b1f16] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Export Request...' : 'Send Export Wholesale Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
