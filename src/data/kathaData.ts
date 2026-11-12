import { MenuItem, RestaurantOutlet } from '../types/restaurant';

export const HERO_IMAGE = '/src/assets/images/hero_bakehouse_coffee_spread_1794483032448.jpg';
export const CROISSANT_IMAGE = '/src/assets/images/item_croissant_pastry_1794483031768.jpg';
export const POUROVER_IMAGE = '/src/assets/images/item_specialty_pourover_1794483032208.jpg';
export const AVOCADO_TOAST_IMAGE = '/src/assets/images/item_avocado_sourdough_1794483032690.jpg';

export const OUTLETS: RestaurantOutlet[] = [
  {
    id: 'banjara-hills',
    name: 'Coffee House Special & Bakehouse',
    slug: 'banjara-hills',
    locality: 'Banjara Hills, Hyderabad',
    address: 'Plot 32, Road No. 12, Opposite Century Super Specialty Hospital, Banjara Hills, Hyderabad 500034',
    timings: '08:00 AM – 11:30 PM (Daily)',
    phone: '+91 91000 84721',
    wifiSsid: 'CoffeeHouseSpecial_Banjara',
    wifiPassword: 'specialtycoffee',
    seatingCapacity: 48,
    instagram: '@coffeehousespecial'
  },
  {
    id: 'jubilee-hills',
    name: 'Coffee House Special Garden',
    slug: 'jubilee-hills',
    locality: 'Jubilee Hills, Hyderabad',
    address: 'Plot 812, Road No. 45, Nandagiri Hills, Jubilee Hills, Hyderabad 500033',
    timings: '07:30 AM – 11:30 PM (Daily)',
    phone: '+91 91000 84722',
    wifiSsid: 'CoffeeHouseSpecial_45',
    wifiPassword: 'coffeehousespecial',
    seatingCapacity: 65,
    instagram: '@coffeehousespecial'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Offerings', icon: 'Sparkles' },
  { id: 'project-bachpan', name: 'Project Bachpan', icon: 'Heart' },
  { id: 'artisan-bakes', name: 'Artisan Bakes & Viennoiserie', icon: 'Croissant' },
  { id: 'specialty-coffee', name: 'Specialty Coffee & Brews', icon: 'Coffee' },
  { id: 'brekkie-sourdough', name: 'Brekkie & Sourdough Toasts', icon: 'Utensils' },
  { id: 'matcha-teas', name: 'Matcha, Teas & Coolers', icon: 'GlassWater' },
  { id: 'savory-plates', name: 'Small Plates & Bowls', icon: 'Soup' },
  { id: 'desserts', name: 'Plated Desserts & Tarts', icon: 'Cake' },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. PROJECT BACHPAN (Katha Signature Nostalgia Series)
  {
    id: 'pb-1',
    name: 'Jim Jam Cinnamon Roll',
    category: 'project-bachpan',
    price: 360,
    dietary: 'veg',
    description: 'Slow-proved brioche scroll rolled with Ceylon cinnamon, topped with reduced house strawberry jam glaze and biscuit shortbread crumb.',
    image: CROISSANT_IMAGE,
    badge: 'Project Bachpan',
    portion: 'Serves 1',
    isAvailable: true,
    customizations: [
      {
        name: 'Serving Temperature',
        type: 'radio',
        required: true,
        options: [
          { label: 'Warmed Up (Recommended)', price: 0 },
          { label: 'Room Temperature', price: 0 }
        ]
      },
      {
        name: 'Extra Toppings',
        type: 'checkbox',
        options: [
          { label: 'Extra Madagascar Vanilla Glaze', price: 60 },
          { label: 'Double Jim Jam Crumb', price: 40 }
        ]
      }
    ]
  },
  {
    id: 'pb-2',
    name: 'Oh So Ferrero Diner French Toast',
    category: 'project-bachpan',
    price: 440,
    dietary: 'veg',
    description: 'Custard-soaked house brioche, griddled in French butter, drenched in Gianduja hazelnut chocolate sauce, roasted hazelnut crunch, and sea salt.',
    image: HERO_IMAGE,
    badge: 'Bestseller',
    portion: 'Serves 1–2',
    isAvailable: true,
    customizations: [
      {
        name: 'Accompaniment',
        type: 'radio',
        options: [
          { label: 'Fresh Pouring Cream', price: 0 },
          { label: 'French Vanilla Gelato Scoop', price: 90 }
        ]
      }
    ]
  },
  {
    id: 'pb-3',
    name: 'Oh So Alpenliebe Caramel Latte',
    category: 'project-bachpan',
    price: 320,
    dietary: 'veg',
    description: 'Rich double espresso pulled over salted butter-toffee caramel syrup inspired by 90s Alpenliebe candies, with textured microfoam.',
    image: POUROVER_IMAGE,
    badge: 'Must Try',
    isAvailable: true,
    customizations: [
      {
        name: 'Preparation Style',
        type: 'radio',
        required: true,
        options: [
          { label: 'Hot Velvety Latte', price: 0 },
          { label: 'Iced Over Crystal Rocks', price: 20 }
        ]
      },
      {
        name: 'Milk Choice',
        type: 'radio',
        required: true,
        options: [
          { label: 'Full Cream Farm Milk', price: 0 },
          { label: 'Oat Milk (Barista Edition)', price: 60 },
          { label: 'Almond Milk (Unsweetened)', price: 60 }
        ]
      }
    ]
  },
  {
    id: 'pb-4',
    name: 'Jim Jam Thick Frappe',
    category: 'project-bachpan',
    price: 350,
    dietary: 'veg',
    description: 'Nostalgic milkshake spun with real Jim Jam biscuits, strawberry puree, rich vanilla dairy base, and whipped cream crown.',
    image: HERO_IMAGE,
    badge: 'Project Bachpan',
    isAvailable: true,
    customizations: [
      {
        name: 'Sweetness',
        type: 'radio',
        options: [
          { label: 'Standard Sweetness', price: 0 },
          { label: 'Less Sweet', price: 0 }
        ]
      }
    ]
  },

  // 2. ARTISAN BAKES & VIENNOISERIE
  {
    id: 'ab-1',
    name: 'Almond Twice-Baked Frangipane Croissant',
    category: 'artisan-bakes',
    price: 380,
    dietary: 'veg',
    description: '36-hour French laminated croissant infused with orange blossom syrup, loaded with roasted almond frangipane paste and toasted flaked almonds.',
    image: CROISSANT_IMAGE,
    badge: 'Bestseller',
    portion: 'Serves 1',
    isAvailable: true,
    customizations: [
      {
        name: 'Preparation',
        type: 'radio',
        required: true,
        options: [
          { label: 'Warm & Flaky', price: 0 },
          { label: 'As Is', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'ab-2',
    name: 'Pain au Chocolat (Valrhona 64%)',
    category: 'artisan-bakes',
    price: 340,
    dietary: 'veg',
    description: 'Classic Viennoiserie layers folded around two bars of single-origin dark French Valrhona chocolate. Golden, shatteringly crisp crust.',
    image: CROISSANT_IMAGE,
    badge: 'Chef Special',
    isAvailable: true
  },
  {
    id: 'ab-3',
    name: 'Cardamom & Brown Sugar Morning Bun',
    category: 'artisan-bakes',
    price: 310,
    dietary: 'veg',
    description: 'Caramelized croissant pastry dough tossed in freshly ground Idukki green cardamom and Muscovado cane sugar.',
    image: CROISSANT_IMAGE,
    isAvailable: true
  },
  {
    id: 'ab-4',
    name: 'Smoked Chicken & Emmental Croissant Sandwich',
    category: 'artisan-bakes',
    price: 460,
    dietary: 'non-veg',
    description: 'Flaky butter croissant stuffed with house-smoked pepper chicken breast, melted Swiss Emmental cheese, baby arugula, and Dijon aioli.',
    image: CROISSANT_IMAGE,
    isAvailable: true
  },

  // 3. SPECIALTY COFFEE & MANUAL BREWS
  {
    id: 'sc-1',
    name: 'V60 Pour-Over (Ratnagiri Estate)',
    category: 'specialty-coffee',
    price: 310,
    dietary: 'vegan',
    description: 'Single-origin washed Arabica from Ratnagiri Estate. Tasting notes of Meyer lemon, jasmine blossom, and raw honey with silky mouthfeel.',
    image: POUROVER_IMAGE,
    badge: 'Chef Special',
    portion: '240 ml carafe',
    isAvailable: true,
    customizations: [
      {
        name: 'Serving Style',
        type: 'radio',
        required: true,
        options: [
          { label: 'Hot Brew (Served in Carafe)', price: 0 },
          { label: 'Flash-Chilled on Clear Ice', price: 20 }
        ]
      }
    ]
  },
  {
    id: 'sc-2',
    name: 'Classic Spanish Latte',
    category: 'specialty-coffee',
    price: 290,
    dietary: 'veg',
    description: 'Bold double espresso harmonized with condensed caramelized milk and silky textured steamed milk. Balanced and velvety.',
    image: HERO_IMAGE,
    badge: 'Bestseller',
    isAvailable: true,
    customizations: [
      {
        name: 'Temperature',
        type: 'radio',
        required: true,
        options: [
          { label: 'Hot', price: 0 },
          { label: 'Iced', price: 20 }
        ]
      },
      {
        name: 'Milk Preference',
        type: 'radio',
        options: [
          { label: 'Dairy Whole Milk', price: 0 },
          { label: 'Oat Milk', price: 60 },
          { label: 'Almond Milk', price: 60 }
        ]
      }
    ]
  },
  {
    id: 'sc-3',
    name: 'Aeropress Kyoto Style Tonic',
    category: 'specialty-coffee',
    price: 330,
    dietary: 'vegan',
    description: 'Concentrated anaerobic coffee extracted via Aeropress, stirred with premium botanical tonic water and an expressed orange peel.',
    image: POUROVER_IMAGE,
    badge: 'New',
    isAvailable: true
  },
  {
    id: 'sc-4',
    name: 'Cortado (1:1 Ratio)',
    category: 'specialty-coffee',
    price: 240,
    dietary: 'veg',
    description: 'Equal parts double ristretto and silky steamed milk served in an artisanal Gibraltar glass. Intense and pure.',
    image: POUROVER_IMAGE,
    isAvailable: true
  },

  // 4. BREKKIE & ALL-DAY SOURDOUGH
  {
    id: 'bs-1',
    name: 'Avocado Tartine on House Sourdough',
    category: 'brekkie-sourdough',
    price: 480,
    dietary: 'veg',
    description: 'Hass avocado mash with lime, French sourdough toasted in olive oil, Danish feta crumble, pickled shallots, microgreens, and Aleppo chili flakes.',
    image: AVOCADO_TOAST_IMAGE,
    badge: 'Bestseller',
    portion: 'Serves 1',
    isAvailable: true,
    customizations: [
      {
        name: 'Add-Ons',
        type: 'checkbox',
        options: [
          { label: 'Soft Poached Organic Egg', price: 60 },
          { label: 'Marinated Sun-dried Tomatoes', price: 70 },
          { label: 'Smoked Salmon Slices', price: 180 }
        ]
      }
    ]
  },
  {
    id: 'bs-2',
    name: 'Truffle Mushroom Melt on Brioche',
    category: 'brekkie-sourdough',
    price: 460,
    dietary: 'veg',
    description: 'Pan-roasted wild button and shiitake mushrooms, black truffle butter, Gruyere and white cheddar melt on thick brioche toast.',
    image: AVOCADO_TOAST_IMAGE,
    isAvailable: true
  },
  {
    id: 'bs-3',
    name: 'Turkish Cilbir Poached Eggs',
    category: 'brekkie-sourdough',
    price: 420,
    dietary: 'non-veg',
    description: 'Two poached farm eggs over garlicky Greek labneh, warm Urfa biber smoked chili butter, fresh dill, served with toasted sourdough spears.',
    image: AVOCADO_TOAST_IMAGE,
    badge: 'Chef Special',
    isAvailable: true
  },

  // 5. MATCHA, TEAS & SIGNATURE BEVERAGES
  {
    id: 'mt-1',
    name: 'Ceremonial Uji Iced Matcha Latte',
    category: 'matcha-teas',
    price: 360,
    dietary: 'veg',
    description: 'First-harvest ceremonial grade green tea stone-ground in Kyoto, whisked with mineral water and layered over chilled milk.',
    image: HERO_IMAGE,
    badge: 'Must Try',
    isAvailable: true,
    customizations: [
      {
        name: 'Milk Choice',
        type: 'radio',
        required: true,
        options: [
          { label: 'Whole Milk', price: 0 },
          { label: 'Oat Milk (Recommended)', price: 60 },
          { label: 'Coconut Milk', price: 60 }
        ]
      },
      {
        name: 'Sweetener',
        type: 'radio',
        options: [
          { label: 'Unsweetened (Pure Matcha)', price: 0 },
          { label: 'Touch of Pure Agave', price: 20 },
          { label: 'Vanilla Bean Infused', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'mt-2',
    name: 'Valrhona 70% Dark Hot Chocolate',
    category: 'matcha-teas',
    price: 340,
    dietary: 'veg',
    description: 'Melted Guanaja 70% French chocolate ganache, infused with roasted Madagascar vanilla and Maldon sea salt flake.',
    image: HERO_IMAGE,
    isAvailable: true
  },
  {
    id: 'mt-3',
    name: 'Hibiscus & White Peach Iced Brew',
    category: 'matcha-teas',
    price: 280,
    dietary: 'vegan',
    description: 'Egyptian wild hibiscus flowers slow cold-steeped with Japanese white peach reduction and sparkling soda. Tart and refreshing.',
    image: HERO_IMAGE,
    isAvailable: true
  },

  // 6. SMALL PLATES & SAVORY BOWLS
  {
    id: 'sp-1',
    name: 'Burrata with Charred Peach & Basil',
    category: 'savory-plates',
    price: 520,
    dietary: 'veg',
    description: '150g fresh artisanal burrata, caramelized seasonal peaches, pine nuts, basil oil, aged balsamic glaze, and sourdough crostini.',
    image: AVOCADO_TOAST_IMAGE,
    badge: 'Chef Special',
    isAvailable: true
  },
  {
    id: 'sp-2',
    name: 'Handcrafted Tagliatelle with Pistachio Pesto',
    category: 'savory-plates',
    price: 560,
    dietary: 'veg',
    description: 'Fresh egg pasta tossed in Bronte Sicilian pistachio and wild basil pesto, Parmigiano-Reggiano, and lemon zest.',
    image: HERO_IMAGE,
    isAvailable: true
  },
  {
    id: 'sp-3',
    name: 'Crispy Parmesan Polenta Fries',
    category: 'savory-plates',
    price: 340,
    dietary: 'veg',
    description: 'Golden polenta batons crisped with rosemary and 24-month parmesan, served with roasted garlic and smoked paprika aioli.',
    image: HERO_IMAGE,
    isAvailable: true
  },

  // 7. PLATED DESSERTS & TARTS
  {
    id: 'ds-1',
    name: 'Burnt Basque Cheesecake with Fig Compote',
    category: 'desserts',
    price: 390,
    dietary: 'veg',
    description: 'Caramelized burnt crust with an oozing, molten cream cheese center, paired with house simmered mission fig and thyme compote.',
    image: CROISSANT_IMAGE,
    badge: 'Bestseller',
    isAvailable: true
  },
  {
    id: 'ds-2',
    name: 'Traditional Espresso Tiramisu',
    category: 'desserts',
    price: 420,
    dietary: 'veg',
    description: 'Savoiardi ladyfingers steeped in Coffee House Special Ratnagiri espresso, layered with sabayon mascarpone cream and French cocoa powder.',
    image: HERO_IMAGE,
    badge: 'Must Try',
    isAvailable: true
  }
];
