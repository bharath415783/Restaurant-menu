import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types/restaurant';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [group: string]: string[] }>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (item && item.customizations) {
      const defaults: { [group: string]: string[] } = {};
      item.customizations.forEach((g) => {
        if (g.type === 'radio' && g.options.length > 0) {
          defaults[g.name] = [g.options[0].label];
        } else {
          defaults[g.name] = [];
        }
      });
      setSelectedOptions(defaults);
      setQuantity(1);
      setNotes('');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleRadioSelect = (groupName: string, optionLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: [optionLabel],
    }));
  };

  const handleCheckboxToggle = (groupName: string, optionLabel: string) => {
    setSelectedOptions((prev) => {
      const current = prev[groupName] || [];
      const exists = current.includes(optionLabel);
      return {
        ...prev,
        [groupName]: exists
          ? current.filter((l) => l !== optionLabel)
          : [...current, optionLabel],
      };
    });
  };

  // Compute calculated unit price
  let optionsPrice = 0;
  if (item.customizations) {
    item.customizations.forEach((g) => {
      const selected = selectedOptions[g.name] || [];
      g.options.forEach((opt) => {
        if (selected.includes(opt.label)) {
          optionsPrice += opt.price;
        }
      });
    });
  }

  const unitTotal = item.price + optionsPrice;
  const grandTotal = unitTotal * quantity;

  const handleAdd = () => {
    const cartItemId = `${item.id}-${Date.now()}`;
    onConfirm({
      cartItemId,
      menuItem: item,
      quantity,
      selectedOptions,
      itemTotal: grandTotal,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left border border-[#EAE3D9]">
        {/* Visual Media Header */}
        <div className="relative h-44 sm:h-52 w-full bg-[#FAF7F2] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/40 hover:bg-black/60 backdrop-blur-md cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Title on Image */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#EAD9C9] font-bold">
              {item.badge || 'Chef Selection'}
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl leading-tight">
              {item.name}
            </h3>
            <div className="font-mono text-sm font-bold text-white/95 mt-0.5">
              Base Price: ₹{item.price}
            </div>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <p className="text-xs text-[#736B63] leading-relaxed">
            {item.description}
          </p>

          {item.customizations &&
            item.customizations.map((group) => (
              <div key={group.name} className="space-y-3 pt-2 border-t border-[#EAE3D9]/60">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#1E1B18]">
                    {group.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#8C4A2F]">
                    {group.required ? 'Select 1 (Required)' : 'Optional'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.options.map((opt) => {
                    const isSelected = (selectedOptions[group.name] || []).includes(opt.label);
                    return (
                      <label
                        key={opt.label}
                        onClick={() => {
                          if (group.type === 'radio') {
                            handleRadioSelect(group.name, opt.label);
                          } else {
                            handleCheckboxToggle(group.name, opt.label);
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FAF3ED] border-[#8C4A2F] text-[#1E1B18] font-medium shadow-2xs'
                            : 'bg-white border-[#EAE3D9] text-[#736B63] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'bg-[#8C4A2F] border-[#8C4A2F] text-white'
                                : 'border-[#D8CEC2] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>
                        <span className="font-mono font-medium text-[#1E1B18]">
                          {opt.price === 0 ? 'Included' : `+₹${opt.price}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Kitchen notes */}
          <div className="pt-2 border-t border-[#EAE3D9]/60">
            <label className="block font-serif font-bold text-xs text-[#1E1B18] mb-1.5">
              Special Instructions for the Kitchen (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot milk, less ice, cinnamon on the side"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl px-3 py-2.5 text-xs text-[#1E1B18] placeholder-[#736B63] focus:outline-none focus:border-[#8C4A2F]"
            />
          </div>
        </div>

        {/* Footer & Submit */}
        <div className="p-4 sm:p-5 border-t border-[#EAE3D9] bg-[#FAF7F2] flex items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 bg-white border border-[#EAE3D9] rounded-full px-3 py-1.5 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 font-bold text-sm text-[#736B63] hover:text-[#1E1B18] cursor-pointer"
            >
              -
            </button>
            <span className="font-mono font-bold text-xs text-[#1E1B18] tabular-nums px-1">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 font-bold text-sm text-[#736B63] hover:text-[#1E1B18] cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-between shadow-md cursor-pointer transition-all active:scale-98"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums font-bold">₹{grandTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
