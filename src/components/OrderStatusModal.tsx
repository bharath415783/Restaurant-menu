import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, Utensils, Receipt, Sparkles } from 'lucide-react';
import { Order } from '../types/restaurant';

interface OrderStatusModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestBill: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  order,
  isOpen,
  onClose,
  onRequestBill,
}) => {
  const [progressStep, setProgressStep] = useState<number>(2); // 1 = Received, 2 = Preparing, 3 = Ready

  useEffect(() => {
    if (isOpen) {
      // simulate realistic progress transition
      const timer = setTimeout(() => {
        setProgressStep(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-left border border-[#EAE3D9] my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736B63] hover:text-[#1E1B18] bg-[#FAF7F2] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase font-semibold mb-1">
          <Clock className="w-4 h-4" />
          <span>Active Table Order</span>
        </div>
        <h3 className="font-serif font-bold text-xl text-[#1E1B18]">
          Order #{order.orderId}
        </h3>
        <div className="text-xs text-[#736B63] mb-5">
          {order.orderType === 'dine-in' ? `Table ${order.tableNumber}` : 'Takeaway'} · Placed at {order.createdAt}
        </div>

        {/* Live Stepper Tracker */}
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] mb-5">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-semibold text-[#1E1B18]">Kitchen Progress</span>
            <span className="font-mono text-[#8C4A2F] font-bold">
              Est. ~{order.estimatedMinutes} mins
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#8C4A2F] text-white flex items-center justify-center mx-auto text-xs font-bold">
                ✓
              </div>
              <div className="font-medium text-[#1E1B18]">Received</div>
            </div>

            <div className="space-y-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                progressStep >= 2 ? 'bg-[#8C4A2F] text-white animate-pulse' : 'bg-[#EAE3D9] text-[#736B63]'
              }`}>
                🍳
              </div>
              <div className="font-medium text-[#8C4A2F]">Preparing</div>
            </div>

            <div className="space-y-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                progressStep >= 3 ? 'bg-[#8C4A2F] text-white' : 'bg-[#EAE3D9] text-[#736B63]'
              }`}>
                ☕
              </div>
              <div className="font-medium text-[#736B63]">Served</div>
            </div>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          <div className="text-[11px] font-mono uppercase text-[#736B63]">
            Items Ordered
          </div>
          {order.items.map((cartItem) => (
            <div
              key={cartItem.cartItemId}
              className="flex justify-between text-xs py-1.5 border-b border-[#EAE3D9]/60"
            >
              <div>
                <span className="font-mono font-bold text-[#1E1B18]">{cartItem.quantity}x </span>
                <span className="font-medium text-[#1E1B18]">{cartItem.menuItem.name}</span>
              </div>
              <span className="font-mono tabular-nums text-[#1E1B18]">
                ₹{cartItem.itemTotal}
              </span>
            </div>
          ))}
        </div>

        {/* Bill Total Summary */}
        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1 text-xs font-mono mb-5">
          <div className="flex justify-between text-[#736B63]">
            <span>Total with Taxes (GST 5%)</span>
            <span className="font-bold text-[#1E1B18] text-sm tabular-nums">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2">
          <button
            onClick={onRequestBill}
            className="w-full py-2.5 px-4 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Request Bill to Table</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-white hover:bg-[#FAF7F2] text-[#736B63] hover:text-[#1E1B18] border border-[#EAE3D9] rounded-xl text-xs font-medium cursor-pointer"
          >
            Order More Items / Close
          </button>
        </div>
      </div>
    </div>
  );
};
