import React, { useState } from 'react';
import { X, Bell, Droplets, Utensils, Sparkles, Receipt, MessageSquare, CheckCircle2 } from 'lucide-react';

interface CallServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
}

export const CallServerModal: React.FC<CallServerModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('water');
  const [submitted, setSubmitted] = useState(false);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const reasons = [
    { id: 'water', label: 'Drinking Water Refill', icon: Droplets },
    { id: 'cutlery', label: 'Extra Cutlery & Napkins', icon: Utensils },
    { id: 'clean', label: 'Clean / Wipe Table', icon: Sparkles },
    { id: 'bill', label: 'Request Final Bill (Card/UPI)', icon: Receipt },
    { id: 'waiter', label: 'Speak with Floor Captain', icon: MessageSquare },
  ];

  const handleSend = () => {
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-left border border-[#EAE3D9]">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736B63] hover:text-[#1E1B18] bg-[#FAF7F2] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8C4A2F] uppercase font-semibold mb-1">
              <Bell className="w-3.5 h-3.5" />
              <span>Table {tableNumber} Assistance</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] mb-1">
              How can we assist you?
            </h3>
            <p className="text-xs text-[#736B63] mb-4">
              Select your request and our floor staff will attend to your table immediately.
            </p>

            <div className="space-y-2 mb-4">
              {reasons.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReason(r.id)}
                    className={`w-full p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#FBEBE4] border-[#8C4A2F] text-[#1E1B18] font-medium'
                        : 'bg-white border-[#EAE3D9] text-[#736B63] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#8C4A2F]' : 'text-[#736B63]'}`} />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              placeholder="Any specific note? (Optional)"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18] placeholder-[#736B63] mb-4 focus:outline-none focus:border-[#8C4A2F]"
            />

            <button
              onClick={handleSend}
              className="w-full py-2.5 px-4 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm transition-colors"
            >
              Alert Floor Server
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-serif font-bold text-base text-[#1E1B18] mb-1">
              Server Alert Dispatched!
            </h4>
            <p className="text-xs text-[#736B63] mb-5">
              Floor staff notified for <span className="font-semibold text-[#1E1B18]">Table {tableNumber}</span>. Someone will be at your table in ~45 seconds.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-2 bg-[#8C4A2F] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
