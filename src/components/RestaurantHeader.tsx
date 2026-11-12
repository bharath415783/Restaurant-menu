import React, { useState } from 'react';
import { MapPin, Bell, Wifi, Search, X, ChevronDown, UtensilsCrossed, Sparkles } from 'lucide-react';
import { RestaurantOutlet } from '../types/restaurant';

interface RestaurantHeaderProps {
  currentOutlet: RestaurantOutlet;
  outlets: RestaurantOutlet[];
  onSelectOutlet: (outlet: RestaurantOutlet) => void;
  tableNumber: string;
  orderType: 'dine-in' | 'takeaway';
  onChangeTable: () => void;
  onCallServer: () => void;
  onShowWifi: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  currentOutlet,
  outlets,
  onSelectOutlet,
  tableNumber,
  orderType,
  onChangeTable,
  onCallServer,
  onShowWifi,
  searchQuery,
  onSearchChange,
}) => {
  const [outletMenuOpen, setOutletMenuOpen] = useState(false);

  return (
    <header className="relative z-10 bg-[#FAF7F2] border-b border-[#EAE3D9]">
      {/* Top Subtle Announcement & Atmosphere Bar */}
      <div className="bg-[#F4ECE1] border-b border-[#EAE3D9]/80 px-4 py-1.5 text-xs text-[#736B63]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono tracking-tight text-[#1E1B18] font-medium">
              Oven Fresh: 36-Hr Butter Croissants & Project Bachpan Drops on Bar
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#8C4A2F]">
            <span>{currentOutlet.timings.split('(')[0].trim()}</span>
            <span className="text-[#D8CEC2]">·</span>
            <span>Est. 2021</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 space-y-3 sm:space-y-0">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-[#1E1B18] uppercase">
                COFFEE HOUSE SPECIAL
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8C4A2F] font-semibold">
              <span>Specialty Coffee</span>
              <span className="text-[#D8CEC2]">·</span>
              <span>Artisan Bakehouse</span>
            </div>
          </div>

          {/* Quick Dining Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Table Badge */}
            <button
              onClick={onChangeTable}
              className="px-3 py-1.5 bg-white hover:bg-[#F8F4EE] border border-[#EAE3D9] hover:border-[#8C4A2F]/40 rounded-xl text-xs font-medium text-[#1E1B18] flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#8C4A2F]" />
              <span className="font-semibold">
                {orderType === 'dine-in' ? `Table ${tableNumber}` : 'Takeaway'}
              </span>
              <span className="text-[10px] text-[#8C4A2F] underline ml-0.5 hidden xs:inline">Change</span>
            </button>

            {/* Call Server */}
            <button
              onClick={onCallServer}
              className="px-3 py-1.5 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call Server</span>
            </button>

            {/* Wi-Fi Details */}
            <button
              onClick={onShowWifi}
              className="p-2 bg-white hover:bg-[#F8F4EE] border border-[#EAE3D9] hover:border-[#8C4A2F]/40 rounded-xl text-[#736B63] hover:text-[#1E1B18] cursor-pointer transition-colors shadow-2xs"
              title="Complimentary Wi-Fi"
            >
              <Wifi className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Secondary Row: Outlet Selector & Search Bar */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#EAE3D9]/60">
          {/* Outlet Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOutletMenuOpen(!outletMenuOpen)}
              className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-medium text-[#1E1B18] hover:border-[#8C4A2F]/40 transition-all cursor-pointer shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8C4A2F]" />
              <span className="font-semibold text-xs">
                {currentOutlet.name} ({currentOutlet.locality.split(',')[0]})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#736B63]" />
            </button>

            {outletMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-[#EAE3D9] rounded-xl shadow-lg p-1.5 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#736B63]">
                  Select Hyderabad Roastery Outlet
                </div>
                {outlets.map((outlet) => (
                  <button
                    key={outlet.id}
                    onClick={() => {
                      onSelectOutlet(outlet);
                      setOutletMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      outlet.id === currentOutlet.id
                        ? 'bg-[#F4ECE1] text-[#8C4A2F] font-bold'
                        : 'text-[#1E1B18] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{outlet.name}</div>
                      <div className="text-[11px] text-[#736B63]">{outlet.locality}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input with warm aesthetic */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736B63]" />
            <input
              type="text"
              placeholder="Search bakes, pour-over, sourdough..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#EAE3D9] rounded-full text-xs sm:text-sm text-[#1E1B18] placeholder-[#736B63]/60 focus:outline-none focus:border-[#8C4A2F] focus:ring-1 focus:ring-[#8C4A2F]/20 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#736B63] hover:text-[#1E1B18]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
