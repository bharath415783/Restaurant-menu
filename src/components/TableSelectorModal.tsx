import React, { useState } from 'react';
import { X, Utensils, ShoppingBag, Check } from 'lucide-react';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: string;
  currentOrderType: 'dine-in' | 'takeaway';
  onSave: (table: string, type: 'dine-in' | 'takeaway') => void;
}

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTable,
  currentOrderType,
  onSave,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>(currentOrderType);
  const [selectedTable, setSelectedTable] = useState(currentTable);

  if (!isOpen) return null;

  const tables = Array.from({ length: 24 }, (_, i) => String(i + 1));

  const handleConfirm = () => {
    onSave(selectedTable, orderType);
    onClose();
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

        <div className="text-[10px] font-mono uppercase text-[#8C4A2F] font-semibold mb-1">
          Dining Experience
        </div>
        <h3 className="font-serif font-bold text-lg text-[#1E1B18] mb-1">
          Select Dining Mode
        </h3>
        <p className="text-xs text-[#736B63] mb-4">
          Choose whether you are seated in the cafe or picking up to go.
        </p>

        {/* Order Type Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setOrderType('dine-in')}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              orderType === 'dine-in'
                ? 'bg-[#FBEBE4] border-[#8C4A2F] text-[#8C4A2F]'
                : 'bg-white border-[#EAE3D9] text-[#736B63]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Dine-In</span>
          </button>

          <button
            type="button"
            onClick={() => setOrderType('takeaway')}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              orderType === 'takeaway'
                ? 'bg-[#FBEBE4] border-[#8C4A2F] text-[#8C4A2F]'
                : 'bg-white border-[#EAE3D9] text-[#736B63]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Takeaway</span>
          </button>
        </div>

        {/* Table Selector (if Dine-in) */}
        {orderType === 'dine-in' && (
          <div className="space-y-2 mb-5">
            <div className="flex items-center justify-between text-xs text-[#736B63]">
              <span>Select Your Table Number:</span>
              <span className="font-bold text-[#8C4A2F]">Table {selectedTable}</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 max-h-40 overflow-y-auto p-1 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9]">
              {tables.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTable(t)}
                  className={`py-2 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                    selectedTable === t
                      ? 'bg-[#8C4A2F] text-white shadow-2xs'
                      : 'bg-white text-[#1E1B18] border border-[#EAE3D9] hover:bg-stone-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="w-full py-2.5 px-4 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm transition-colors"
        >
          Confirm Dining Mode
        </button>
      </div>
    </div>
  );
};
