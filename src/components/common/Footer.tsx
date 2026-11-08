import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Parent Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>HAI LOGISTIC GROUP</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A diversified Sri Lankan corporate group delivering multimodal logistics, customs clearance, and global freight solutions, alongside premium direct-to-consumer enterprises in bespoke florals and authentic Ceylon heritage teas & spices.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Port City Trade Tower, Colombo 01, Sri Lanka
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
              <a href="tel:+94112345670" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                +94 11 234 5670
              </a>
              <a href="mailto:corporate@hailogistic.lk" className="flex items-center gap-1 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                corporate@hailogistic.lk
              </a>
              <a
                href="https://wa.me/94771234567?text=Hello%20HAI%20Logistic%20Group%20Customer%20Support"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Assistance
              </a>
            </div>
          </div>

          {/* Column 2: HAI Logistic */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              HAI Logistic
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('/logistics')} className="hover:text-white transition-colors">
                  Sea & Ocean Freight
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/logistics')} className="hover:text-white transition-colors">
                  Air Cargo & Charter
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/logistics')} className="hover:text-white transition-colors">
                  Customs Clearance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/logistics')} className="hover:text-white transition-colors">
                  Cold Chain Transport
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/logistics')} className="hover:text-white transition-colors">
                  Request Quotation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Rivora Boutique */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
              Rivora Boutique
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('/rivora/shop')} className="hover:text-emerald-300 transition-colors">
                  Flower Bouquets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rivora/shop')} className="hover:text-emerald-300 transition-colors">
                  Gift Collections & Hampers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rivora#cafe')} className="hover:text-emerald-300 transition-colors">
                  Artisan Café Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rivora/account')} className="hover:text-emerald-300 transition-colors">
                  Track Floral Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rivora/cart')} className="hover:text-emerald-300 transition-colors">
                  Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Ran Diriya Ceylon */}
          <div>
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
              Ran Diriya Spices
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('/ran-diriya/shop')} className="hover:text-amber-300 transition-colors">
                  Ceylon Alba Cinnamon
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ran-diriya/shop')} className="hover:text-amber-300 transition-colors">
                  Single-Estate Tea (OP1)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ran-diriya/shop')} className="hover:text-amber-300 transition-colors">
                  Black Pepper & Cloves
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ran-diriya/wholesale')} className="hover:text-amber-300 transition-colors">
                  Bulk & Export Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ran-diriya/account')} className="hover:text-amber-300 transition-colors">
                  Track Spice Order
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} HAI Logistic (Pvt) Ltd. All rights reserved. Sri Lanka.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('/about-us')} className="hover:text-slate-300 transition-colors">
              About the Group
            </button>
            <button onClick={() => navigateTo('/businesses')} className="hover:text-slate-300 transition-colors">
              Brand Architecture
            </button>
            <button onClick={() => navigateTo('/contact')} className="hover:text-slate-300 transition-colors">
              Contact Us
            </button>
            <button onClick={() => navigateTo('/admin')} className="text-orange-400 hover:text-orange-300 font-medium transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
