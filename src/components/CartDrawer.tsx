import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Utensils } from 'lucide-react';
import { CartItem, RestaurantOutlet } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  outlet: RestaurantOutlet;
  tableNumber: string;
  orderType: 'dine-in' | 'takeaway';
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (customerInfo: { name: string; phone: string; notes?: string; tip: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  outlet,
  tableNumber,
  orderType,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [tip, setTip] = useState(0);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst + tip;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) return;

    onPlaceOrder({
      name: customerName.trim(),
      phone: customerPhone.trim(),
      notes: orderNotes.trim() || undefined,
      tip,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 border-l border-[#EAE3D9] text-left">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8C4A2F] font-semibold">
              Coffee House Special Digital Ticket
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
              {orderType === 'dine-in' ? `Table ${tableNumber} Order` : 'Takeaway Order'}
            </h3>
            <div className="text-xs text-[#736B63]">{outlet.locality}</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#736B63] hover:text-[#1E1B18] bg-white border border-[#EAE3D9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <Utensils className="w-12 h-12 text-[#D8CEC2] mb-3" />
            <h4 className="font-serif font-bold text-base text-[#1E1B18] mb-1">
              Your order tray is empty
            </h4>
            <p className="text-xs text-[#736B63] max-w-xs mb-6">
              Explore our Project Bachpan nostalgia bakes or single-origin manual pour-overs.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-5 bg-[#8C4A2F] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#736B63] pb-2 border-b border-[#EAE3D9]">
                <span>Items Selected ({items.length})</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Item Rows */}
              <div className="space-y-3">
                {items.map((cartItem) => {
                  const optionsSummary = Object.entries(cartItem.selectedOptions || {})
                    .filter(([_, opts]) => opts.length > 0)
                    .map(([_, opts]) => opts.join(', '))
                    .join(' · ');

                  return (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="font-serif font-bold text-sm text-[#1E1B18]">
                          {cartItem.menuItem.name}
                        </div>
                        {optionsSummary && (
                          <div className="text-[11px] text-[#8C4A2F] font-medium leading-tight">
                            {optionsSummary}
                          </div>
                        )}
                        {cartItem.notes && (
                          <div className="text-[10px] text-[#736B63] italic">
                            Note: "{cartItem.notes}"
                          </div>
                        )}
                        <div className="font-mono font-semibold text-xs text-[#1E1B18] pt-1">
                          ₹{cartItem.itemTotal}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-white border border-[#EAE3D9] rounded-lg px-2 py-1 shadow-2xs shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                          }
                          className="text-[#736B63] hover:text-[#1E1B18] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs tabular-nums text-[#1E1B18]">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                          }
                          className="text-[#736B63] hover:text-[#1E1B18] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guest Details */}
              <div className="pt-4 border-t border-[#EAE3D9] space-y-3">
                <div className="text-[11px] font-mono uppercase text-[#736B63] font-semibold">
                  Guest Information
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg p-2 text-xs text-[#1E1B18] placeholder-[#736B63] focus:outline-none focus:border-[#8C4A2F]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (for WhatsApp updates)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg p-2 text-xs text-[#1E1B18] placeholder-[#736B63] focus:outline-none focus:border-[#8C4A2F]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Kitchen notes (e.g. serve coffee after food)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg p-2 text-xs text-[#1E1B18] placeholder-[#736B63] focus:outline-none focus:border-[#8C4A2F]"
                />
              </div>

              {/* Staff Tip Option */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-[#736B63] mb-1.5">
                  <span>Add Staff Appreciation Tip</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {[0, 30, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTip(amt)}
                      className={`py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        tip === amt
                          ? 'bg-[#FBEBE4] border-[#8C4A2F] text-[#8C4A2F] font-bold'
                          : 'bg-white border-[#EAE3D9] text-[#736B63]'
                      }`}
                    >
                      {amt === 0 ? 'None' : `₹${amt}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#736B63]">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#736B63]">
                  <span>GST (5%)</span>
                  <span className="tabular-nums">₹{gst}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-[#736B63]">
                    <span>Staff Tip</span>
                    <span className="tabular-nums">₹{tip}</span>
                  </div>
                )}
                <div className="pt-1.5 border-t border-[#EAE3D9] flex justify-between font-bold text-sm text-[#1E1B18]">
                  <span>To Pay</span>
                  <span className="tabular-nums">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout CTA */}
            <div className="p-4 border-t border-[#EAE3D9] bg-white">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-between shadow-sm cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Send Order to Kitchen</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold">
                  <span>₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
              <div className="text-[10px] text-center text-[#736B63] mt-2">
                Order will be printed immediately at the kitchen KOT display for Table {tableNumber}.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
