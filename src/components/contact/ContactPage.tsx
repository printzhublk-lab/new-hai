import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Ship,
  Plane,
  Flower2,
  Leaf
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'HAI Logistic Corporate Freight',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please provide your name, email, and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your corporate message has been received', 'success');
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Header */}
      <section className="bg-[#0f2744] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            Corporate Network & Locations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Connect with HAI Logistic Group
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Our corporate headquarters and logistics dispatch desks operate 24/7 adjacent to the Port of Colombo and Bandaranaike International Airport.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Form & Message */}
          <div className="lg:col-span-7 bg-white p-8 rounded border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Direct Dispatch & Commercial Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Send a Message to HAI Group
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                For general corporate inquiries, vendor partnerships, or cross-business assistance.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">Message Sent Successfully</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, <strong>{form.name}</strong>. Our designated team at {form.department} will respond to {form.email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Kasun Fernando"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="kasun@company.lk"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+94 11 000 0000"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Department / Business
                    </label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      <option value="HAI Logistic Corporate Freight">HAI Logistic (Freight & Customs)</option>
                      <option value="Rivora Floral Studio">Rivora (Flowers, Gifts & Café)</option>
                      <option value="Ran Diriya Spices Export">Ran Diriya (Ceylon Spices & Tea)</option>
                      <option value="Corporate Management & HR">Group Executive Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Corporate Account Inquiries or Partnership"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Inquiry Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your inquiry or requirement..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0f2744] hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Corporate Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Facilities & Office Network */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-600" />
                <span>Headquarters & Operational Network</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                    <Ship className="w-3.5 h-3.5 text-blue-700" />
                    <span>HAI Group Corporate HQ & Port Logistics Desk</span>
                  </div>
                  <div className="text-slate-600">Port City Trade Tower, Level 14, Colombo 01, Sri Lanka</div>
                  <div className="text-slate-500 mt-1 flex items-center gap-4">
                    <span>Tel: +94 11 234 5670</span>
                    <span>Email: corporate@hailogistic.lk</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                    <Plane className="w-3.5 h-3.5 text-orange-600" />
                    <span>Air Cargo Terminal Office</span>
                  </div>
                  <div className="text-slate-600">Air Cargo Village, Bandaranaike International Airport, Katunayake</div>
                  <div className="text-slate-500 mt-1">24/7 Ramp Clearance Hotline: +94 11 225 9010</div>
                </div>

                <div className="p-3 bg-[#faf8f5] rounded border border-[#e8e2d9]">
                  <div className="font-bold text-[#244233] flex items-center gap-1.5 mb-1">
                    <Flower2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Rivora Floral Boutique & Artisan Café</span>
                  </div>
                  <div className="text-slate-600">No 42, Horton Place, Colombo 07, Sri Lanka</div>
                  <div className="text-slate-500 mt-1">Concierge: +94 11 445 8890 · WhatsApp: +94 77 123 4567</div>
                </div>

                <div className="p-3 bg-emerald-950/10 rounded border border-emerald-900/20">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                    <Leaf className="w-3.5 h-3.5 text-amber-700" />
                    <span>Ran Diriya Spice Processing & Export Depot</span>
                  </div>
                  <div className="text-slate-600">Spice Garden Road, Matale Highlands, Sri Lanka</div>
                  <div className="text-slate-500 mt-1">Export Desk: export@randiriya.lk</div>
                </div>
              </div>
            </div>

            {/* Interactive WhatsApp Fast Response */}
            <div className="bg-emerald-900 text-white p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-300" />
                <h4 className="font-bold text-sm">Need Instant WhatsApp Assistance?</h4>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Connect directly with our Colombo customer desk for urgent shipment updates, floral delivery coordination, or export inquiries.
              </p>
              <a
                href="https://wa.me/94771234567?text=Hello%20HAI%20Logistic%20Group%20Desk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <span>Launch WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
