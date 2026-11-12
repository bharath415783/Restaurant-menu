import React from 'react';
import { Coffee, MapPin, Clock, Phone, Instagram, Heart } from 'lucide-react';
import { OUTLETS } from '../data/kathaData';

export const RestaurantFooter: React.FC = () => {
  return (
    <footer className="bg-[#1E1B18] text-[#D8CEC2] text-xs border-t border-[#3B342F] mt-20">
      {/* Brand & Sourcing Banner */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#3B342F]">
          {/* Col 1: Coffee House Special Story */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl font-serif font-black text-white uppercase">
                COFFEE HOUSE SPECIAL
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C28E5C]">
                Specialty Coffee & Bakehouse
              </span>
            </div>
            <p className="text-xs text-[#A89F95] leading-relaxed">
              Every brew and bake tells a story. From 36-hour slow-fermented French viennoiserie to
              single-origin microlots sourced directly from Ratnagiri and Chikmagalur estates in the
              Western Ghats.
            </p>
            <div className="text-[11px] text-[#C28E5C] font-mono flex items-center gap-1.5 pt-1">
              <Coffee className="w-3.5 h-3.5" />
              <span>Project Bachpan · Handcrafted in Hyderabad</span>
            </div>
          </div>

          {/* Col 2: Locations & Hours */}
          <div className="space-y-3">
            <div className="font-serif font-bold text-sm text-white uppercase tracking-wide">
              Hyderabad Outlets
            </div>
            <div className="space-y-2.5">
              {OUTLETS.map((o) => (
                <div key={o.id} className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">{o.name}</div>
                  <div className="text-[11px] text-[#A89F95]">{o.address}</div>
                  <div className="text-[10px] text-[#C28E5C] font-mono">Hours: {o.timings}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Kitchen & Table Policies */}
          <div className="space-y-3">
            <div className="font-serif font-bold text-sm text-white uppercase tracking-wide">
              Kitchen Standards
            </div>
            <ul className="space-y-1.5 text-xs text-[#A89F95]">
              <li>· Pure French butter laminated viennoiserie baked fresh daily</li>
              <li>· 100% Arabica washed & anaerobic single-origin beans</li>
              <li>· Plant-based oat and almond milk available on request</li>
              <li>· Separate prep surfaces for pure vegetarian and egg bakes</li>
              <li>· FSSAI Central License #13622011000842</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & powered by Maska */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#736B63]">
          <div>
            © {new Date().getFullYear()} Coffee House Special & Bakehouse. All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-mono text-xs">
            <span>Powered by</span>
            <span className="text-[#C28E5C] font-bold">Maska Digital Table Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
