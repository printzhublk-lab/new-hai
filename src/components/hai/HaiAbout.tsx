import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Target, Award, Users, Globe2, Building2 } from 'lucide-react';

export const HaiAbout: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            Corporate Profile & History
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Connecting Sri Lanka’s Maritime Gateway with Global Trade
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            HAI Logistic was founded to bridge regional South Asian freight transport with international commerce through precision customs engineering, dedicated port terminal operations, and transparent supply chains.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded border border-slate-200 space-y-4">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Corporate Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To stand as South Asia's most reliable, compliant, and technology-driven multimodal logistics and brand management conglomerate—empowering Sri Lankan exports to flourish in world markets while optimizing national import channels.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-slate-200 space-y-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To deliver seamless freight movement, error-free customs clearance, and high-performance warehousing through operational discipline, ethical compliance, and uncompromised cargo security.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story & Evolution */}
      <section className="bg-white border-t border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Our Journey
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              The Evolution of HAI Group
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered in the commercial heart of Colombo, HAI Logistic began its journey as a specialized customs brokerage and port logistics agency servicing Sri Lanka's booming tea and apparel export sectors. Over the years, our operational footprint expanded to encompass ocean vessel chartering, international air freight, and temperature-monitored cold chain storage.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            Recognizing the unique strengths of Sri Lanka's agricultural heritage and the rising demand for refined lifestyle experiences, HAI Group diversified its commercial portfolio into two distinct flagship enterprises:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-slate-50 rounded border border-slate-200">
              <h4 className="text-base font-serif-luxury font-bold text-[#244233] mb-2">Rivora</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                An upscale floral and gifting boutique with an integrated café experience, delivering bespoke floral arrangements, celebratory hampers, and personalized milestone moments across Sri Lanka.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded border border-slate-200">
              <h4 className="text-base font-bold font-brand-cinzel text-amber-800 mb-2">Ran Diriya</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A dedicated brand bringing single-estate pure Ceylon black & green teas, authentic Alba cinnamon quills, and premium Sri Lankan spices directly to domestic and international export buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Corporate Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
          Guiding Standards
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          The Four Pillars of HAI Logistic
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-orange-600">01</span>
            <h4 className="text-base font-bold text-slate-900">Regulatory Integrity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero tolerance for non-compliance. Our ASYCUDA World documentation and customs handling adhere strictly to Sri Lankan statutory laws.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-orange-600">02</span>
            <h4 className="text-base font-bold text-slate-900">Multimodal Agility</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Seamlessly switching between ocean liners, direct air cargo, and heavy inland haulage to guarantee customer delivery milestones.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-orange-600">03</span>
            <h4 className="text-base font-bold text-slate-900">Cold Chain Rigor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unbroken temperature verification protocols for perishables, floristry, and pharmaceuticals from farm/lab to foreign port.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-orange-600">04</span>
            <h4 className="text-base font-bold text-slate-900">Dedicated Partnership</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every client account is assigned a designated logistics coordinator available around the clock to oversee documentation and dispatch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
