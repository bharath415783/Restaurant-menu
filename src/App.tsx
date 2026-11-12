import React, { useState, useMemo } from 'react';
import { RestaurantHeader } from './components/RestaurantHeader';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CallServerModal } from './components/CallServerModal';
import { WifiModal } from './components/WifiModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { TableSelectorModal } from './components/TableSelectorModal';
import { RestaurantFooter } from './components/RestaurantFooter';
import { OUTLETS, MENU_ITEMS, CATEGORIES, HERO_IMAGE } from './data/kathaData';
import { MenuItem, CartItem, RestaurantOutlet, Order, DietaryType } from './types/restaurant';
import { ShoppingBag, ArrowRight, Sparkles, Check, Coffee } from 'lucide-react';

export default function App() {
  // Outlet & Table State
  const [currentOutlet, setCurrentOutlet] = useState<RestaurantOutlet>(OUTLETS[0]);
  const [tableNumber, setTableNumber] = useState<string>('14');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');

  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType | 'all'>('all');
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals & Drawers
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCallServerOpen, setIsCallServerOpen] = useState<boolean>(false);
  const [isWifiOpen, setIsWifiOpen] = useState<boolean>(false);
  const [isTableSelectorOpen, setIsTableSelectorOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && Object.keys(ci.selectedOptions || {}).length === 0
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        updated[existingIndex].itemTotal = updated[existingIndex].quantity * item.price;
        return updated;
      } else {
        const newCartItem: CartItem = {
          cartItemId: `${item.id}-${Date.now()}`,
          menuItem: item,
          quantity: 1,
          selectedOptions: {},
          itemTotal: item.price,
        };
        return [...prev, newCartItem];
      }
    });
    showToast(`Added ${item.name} to order`);
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        if (updated[existingIndex].quantity > 1) {
          updated[existingIndex].quantity -= 1;
          const unitPrice = updated[existingIndex].itemTotal / (updated[existingIndex].quantity + 1);
          updated[existingIndex].itemTotal = updated[existingIndex].quantity * unitPrice;
          return updated;
        } else {
          return updated.filter((_, idx) => idx !== existingIndex);
        }
      }
      return prev;
    });
  };

  const handleCustomizedConfirm = (customizedCartItem: CartItem) => {
    setCartItems((prev) => [...prev, customizedCartItem]);
    showToast(`Added ${customizedCartItem.menuItem.name} (Customised)`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const unitPrice = ci.itemTotal / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              itemTotal: unitPrice * newQty,
            };
          }
          return ci;
        })
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = (customerInfo: {
    name: string;
    phone: string;
    notes?: string;
    tip: number;
  }) => {
    const subtotal = cartItems.reduce((acc, curr) => acc + curr.itemTotal, 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst + customerInfo.tip;

    const newOrder: Order = {
      orderId: `KTH-${Math.floor(10000 + Math.random() * 90000)}`,
      outletId: currentOutlet.id,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      items: [...cartItems],
      subtotal,
      gst,
      serviceFee: customerInfo.tip,
      total: grandTotal,
      status: 'received',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 12,
      notes: customerInfo.notes,
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrderStatusOpen(true);
    showToast(`Order #${newOrder.orderId} sent to kitchen!`);
  };

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }
      // Bestseller filter
      if (bestsellerOnly && item.badge !== 'Bestseller' && item.badge !== 'Project Bachpan') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, bestsellerOnly, searchQuery]);

  // Group filtered items by category for structured layout
  const categorizedSections = useMemo(() => {
    const activeCats =
      activeCategory === 'all'
        ? CATEGORIES.filter((c) => c.id !== 'all')
        : CATEGORIES.filter((c) => c.id === activeCategory);

    return activeCats
      .map((cat) => ({
        category: cat,
        items: filteredItems.filter((item) => item.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, filteredItems]);

  // Total cart items count and price
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartSubtotal = cartItems.reduce((acc, curr) => acc + curr.itemTotal, 0);

  // Lookup map for item quantities in cart
  const itemQuantities = useMemo(() => {
    const map: { [itemId: string]: number } = {};
    cartItems.forEach((ci) => {
      map[ci.menuItem.id] = (map[ci.menuItem.id] || 0) + ci.quantity;
    });
    return map;
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] flex flex-col font-sans selection:bg-[#EAD9C9] selection:text-[#3B2219]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B18] text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <RestaurantHeader
        currentOutlet={currentOutlet}
        outlets={OUTLETS}
        onSelectOutlet={setCurrentOutlet}
        tableNumber={tableNumber}
        orderType={orderType}
        onChangeTable={() => setIsTableSelectorOpen(true)}
        onCallServer={() => setIsCallServerOpen(true)}
        onShowWifi={() => setIsWifiOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Sticky Category & Dietary Filter Nav */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        dietaryFilter={dietaryFilter}
        onSelectDietaryFilter={setDietaryFilter}
        bestsellerOnly={bestsellerOnly}
        onToggleBestsellerOnly={() => setBestsellerOnly(!bestsellerOnly)}
      />

      {/* Main Menu Presentation */}
      <main className="flex-grow max-w-5xl mx-auto px-4 py-6 w-full space-y-10">
        {/* Editorial Hero Feature Showcase */}
        {!searchQuery && activeCategory === 'all' && (
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#EAE3D9] p-6 sm:p-8 md:p-10 shadow-sm transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Story & Tasting Highlights */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3ED] text-[#8C4A2F] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#F2DACD]">
                  <Sparkles className="w-3 h-3 text-[#8C4A2F]" />
                  <span>Artisanal Roastery & Slow Bakehouse</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1E1B18] leading-[1.08] tracking-tight">
                  Project Bachpan & Slow Morning Brews
                </h2>

                <p className="text-xs sm:text-sm text-[#736B63] leading-relaxed max-w-xl">
                  36-hour slow-fermented French viennoiserie, Ceylon cinnamon scrolls, and single-origin
                  Ratnagiri pour-overs. Browse, customise, and send your ticket straight to the kitchen.
                </p>

                {/* Quick Flavor Highlights */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <button
                    onClick={() => setActiveCategory('project-bachpan')}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#1E1B18] border border-[#EAE3D9] font-medium transition-colors cursor-pointer"
                  >
                    ✨ Jim Jam Cinnamon Roll
                  </button>
                  <button
                    onClick={() => setActiveCategory('specialty-coffee')}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#1E1B18] border border-[#EAE3D9] font-medium transition-colors cursor-pointer"
                  >
                    ☕ V60 Ratnagiri Pour-Over
                  </button>
                  <button
                    onClick={() => setActiveCategory('artisan-bakes')}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#1E1B18] border border-[#EAE3D9] font-medium transition-colors cursor-pointer"
                  >
                    🥐 Twice-Baked Almond Croissant
                  </button>
                </div>

                {activeOrder && (
                  <div className="pt-2">
                    <button
                      onClick={() => setIsOrderStatusOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                      <span>Live Order #{activeOrder.orderId} in Kitchen (Est. ~12 mins) →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Visual Photo Card with Trust Markers */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#EAE3D9] shadow-md group">
                  <img
                    src={HERO_IMAGE}
                    alt="Coffee House Special & Bakehouse Spread"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-sm">Banjara Hills Flagship</span>
                    <span className="font-mono text-[11px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                      ★ 4.9 Google Rated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categorized Menu Sections */}
        {categorizedSections.length === 0 ? (
          <div className="bg-white border border-[#EAE3D9] rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <Coffee className="w-10 h-10 text-[#C28E5C] mx-auto opacity-70" />
            <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
              No dishes found matching your selection
            </h3>
            <p className="text-xs text-[#736B63] max-w-sm mx-auto">
              Try adjusting your dietary filters, clearing your search, or browsing all offerings.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
                setBestsellerOnly(false);
              }}
              className="mt-2 px-5 py-2.5 bg-[#8C4A2F] hover:bg-[#A85A3B] text-white rounded-full text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          categorizedSections.map(({ category, items }) => (
            <section key={category.id} id={category.id} className="space-y-4 pt-2">
              {/* Category Title Header */}
              <div className="flex items-baseline justify-between border-b border-[#EAE3D9] pb-2.5">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-[#1E1B18] tracking-tight">
                    {category.name}
                  </h3>
                  <span className="text-xs font-mono text-[#736B63]">
                    ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </span>
                </div>
                {category.id === 'project-bachpan' && (
                  <span className="text-[11px] font-mono text-[#8C4A2F] font-bold">
                    ★ Signature Creations
                  </span>
                )}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    cartQuantity={itemQuantities[item.id] || 0}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onOpenCustomizer={(it) => setCustomizingItem(it)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3.5 px-5 bg-[#1E1B18] hover:bg-black text-white rounded-2xl shadow-2xl flex items-center justify-between transition-all active:scale-98 cursor-pointer border border-[#3B342F]"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#8C4A2F] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                  {totalCartCount}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    {orderType === 'dine-in' ? `Table ${tableNumber} Order` : 'Takeaway Order'}
                  </div>
                  <div className="text-[11px] font-mono text-[#C89D7C]">
                    ₹{totalCartSubtotal} + taxes
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-[#EAD9C9] hover:text-white">
                <span>View Order Tray</span>
                <ArrowRight className="w-4 h-4 text-[#8C4A2F]" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <RestaurantFooter />

      {/* Interactive Modals */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleCustomizedConfirm}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        outlet={currentOutlet}
        tableNumber={tableNumber}
        orderType={orderType}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      <CallServerModal
        isOpen={isCallServerOpen}
        onClose={() => setIsCallServerOpen(false)}
        tableNumber={tableNumber}
      />

      <WifiModal
        isOpen={isWifiOpen}
        onClose={() => setIsWifiOpen(false)}
        outlet={currentOutlet}
      />

      <TableSelectorModal
        isOpen={isTableSelectorOpen}
        onClose={() => setIsTableSelectorOpen(false)}
        currentTable={tableNumber}
        currentOrderType={orderType}
        onSave={(newTable, newType) => {
          setTableNumber(newTable);
          setOrderType(newType);
          showToast(newType === 'dine-in' ? `Switched to Table ${newTable}` : 'Switched to Takeaway');
        }}
      />

      <OrderStatusModal
        order={activeOrder}
        isOpen={isOrderStatusOpen}
        onClose={() => setIsOrderStatusOpen(false)}
        onRequestBill={() => {
          setIsOrderStatusOpen(false);
          setIsCallServerOpen(true);
        }}
      />
    </div>
  );
}
