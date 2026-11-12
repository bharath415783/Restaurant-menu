import React from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface MenuItemCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onOpenCustomizer: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onOpenCustomizer,
}) => {
  const hasCustomizations = item.customizations && item.customizations.length > 0;

  const handleAddClick = () => {
    if (hasCustomizations) {
      onOpenCustomizer(item);
    } else {
      onAddToCart(item);
    }
  };

  const getDietaryIcon = () => {
    if (item.dietary === 'veg') {
      return (
        <span
          title="Vegetarian"
          className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-xs flex items-center justify-center shrink-0 bg-white"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
        </span>
      );
    }
    if (item.dietary === 'non-veg') {
      return (
        <span
          title="Non-Vegetarian"
          className="w-3.5 h-3.5 border-2 border-red-700 rounded-xs flex items-center justify-center shrink-0 bg-white"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-700 inline-block" />
        </span>
      );
    }
    return (
      <span title="Vegan" className="text-xs leading-none shrink-0">
        🌱
      </span>
    );
  };

  return (
    <div className="group bg-white border border-[#EAE3D9] rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 menu-card-shadow relative overflow-hidden">
      {/* Left Info Column */}
      <div className="flex-1 space-y-1.5 min-w-0 pr-1">
        {/* Top Badges & Dietary */}
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {getDietaryIcon()}

          {item.badge && (
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                item.badge === 'Project Bachpan'
                  ? 'bg-[#FBEBE4] text-[#8C4A2F] border border-[#8C4A2F]/20'
                  : item.badge === 'Bestseller'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {item.badge}
            </span>
          )}

          {item.portion && (
            <span className="text-[11px] font-mono text-[#736B63]">{item.portion}</span>
          )}
        </div>

        {/* Item Title */}
        <h3 className="font-serif font-bold text-base sm:text-lg text-[#1E1B18] group-hover:text-[#8C4A2F] transition-colors leading-snug">
          {item.name}
        </h3>

        {/* Price */}
        <div className="font-mono font-bold text-sm sm:text-base text-[#1E1B18] tabular-nums">
          ₹{item.price}
        </div>

        {/* Description */}
        <p className="text-xs text-[#736B63] leading-relaxed line-clamp-2 sm:line-clamp-3">
          {item.description}
        </p>

        {/* Customization label */}
        {hasCustomizations && (
          <button
            onClick={() => onOpenCustomizer(item)}
            className="text-[11px] text-[#8C4A2F] hover:text-[#A85A3B] font-medium pt-1 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Customise options</span>
            <span className="text-xs">›</span>
          </button>
        )}
      </div>

      {/* Right Media & Add Action Column */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EAE3D9] shadow-2xs">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Add Button or Stepper */}
        <div className="absolute -bottom-2 w-20 sm:w-22">
          {cartQuantity === 0 ? (
            <button
              onClick={handleAddClick}
              className="w-full py-1.5 bg-white hover:bg-[#FAF7F2] text-[#8C4A2F] border-2 border-[#8C4A2F] rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer text-center"
            >
              ADD
            </button>
          ) : (
            <div className="w-full py-1 bg-[#8C4A2F] text-white rounded-full text-xs font-bold flex items-center justify-between px-2 shadow-sm">
              <button
                onClick={() => onRemoveFromCart(item)}
                className="p-0.5 hover:opacity-80 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="tabular-nums font-mono">{cartQuantity}</span>
              <button
                onClick={handleAddClick}
                className="p-0.5 hover:opacity-80 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
