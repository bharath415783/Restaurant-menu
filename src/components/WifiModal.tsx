import React, { useState } from 'react';
import { X, Wifi, Copy, Check } from 'lucide-react';
import { RestaurantOutlet } from '../types/restaurant';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
  outlet: RestaurantOutlet;
}

export const WifiModal: React.FC<WifiModalProps> = ({ isOpen, onClose, outlet }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(outlet.wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-left border border-[#EAE3D9]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736B63] hover:text-[#1E1B18] bg-[#FAF7F2] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase font-semibold mb-1">
          <Wifi className="w-4 h-4" />
          <span>Complimentary High-Speed Wi-Fi</span>
        </div>
        <h3 className="font-serif font-bold text-lg text-[#1E1B18] mb-1">
          Connect to Coffee House Special Network
        </h3>
        <p className="text-xs text-[#736B63] mb-5">
          Enjoy unlimited gigabit fiber connectivity while you enjoy your slow brews and pastries.
        </p>

        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2.5 text-xs mb-5">
          <div className="flex items-center justify-between">
            <span className="text-[#736B63]">Network Name (SSID):</span>
            <span className="font-mono font-bold text-[#1E1B18]">{outlet.wifiSsid}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D9]">
            <span className="text-[#736B63]">Password:</span>
            <span className="font-mono font-bold text-[#8C4A2F]">{outlet.wifiPassword}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Password Copied!' : 'Copy Wi-Fi Password'}</span>
        </button>
      </div>
    </div>
  );
};
