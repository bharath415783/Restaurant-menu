export type DietaryType = 'veg' | 'non-veg' | 'vegan';

export interface CustomizationOption {
  label: string;
  price: number;
}

export interface CustomizationGroup {
  name: string;
  type: 'radio' | 'checkbox';
  required?: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  dietary: DietaryType;
  description: string;
  image: string;
  badge?: 'Bestseller' | 'Chef Special' | 'Project Bachpan' | 'New' | 'Must Try';
  portion?: string;
  calories?: string;
  isAvailable: boolean;
  customizations?: CustomizationGroup[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: { [groupName: string]: string[] };
  itemTotal: number;
  notes?: string;
}

export interface RestaurantOutlet {
  id: string;
  name: string;
  slug: string;
  locality: string;
  address: string;
  timings: string;
  phone: string;
  wifiSsid: string;
  wifiPassword: string;
  seatingCapacity: number;
  instagram: string;
}

export interface Order {
  orderId: string;
  outletId: string;
  orderType: 'dine-in' | 'takeaway';
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  serviceFee: number;
  total: number;
  status: 'received' | 'preparing' | 'served' | 'paid';
  createdAt: string;
  estimatedMinutes: number;
  notes?: string;
}
