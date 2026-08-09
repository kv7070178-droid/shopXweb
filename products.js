/* ===========================================================
   shopX — js/products.js
   Product data + pure helper functions (search, filter, sort).
   All data below is fictional demo data for a college/learning
   project. Keep data separate from rendering so products can be
   added/removed easily.
   =========================================================== */

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, originalPrice: 2999, rating: 4.5, reviewCount: 124, stock: 7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Over-ear wireless headphones with 30-hour battery life and soft memory-foam ear cushions.",
    features: ["Bluetooth 5.2", "30-hour battery", "Foldable design", "Built-in mic"] },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 2799, originalPrice: 4999, rating: 4.3, reviewCount: 302, stock: 15,
    image: "https://picsum.photos/seed/shopX-smartwatch/600/600",
    description: "Fitness smartwatch with heart-rate tracking, sleep monitoring, and a 7-day battery.",
    features: ["Heart-rate sensor", "1.4\" AMOLED display", "7-day battery", "Water resistant"] },
  { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 1299, originalPrice: 1999, rating: 4.1, reviewCount: 156, stock: 20,
    image: "https://picsum.photos/seed/shopX-speaker/600/600",
    description: "Portable Bluetooth speaker with deep bass and 12 hours of playback.",
    features: ["IPX6 splash resistant", "12-hour playtime", "TWS pairing", "Carry strap"] },
  { id: 4, name: "Wireless Mouse", category: "Electronics", price: 499, originalPrice: 899, rating: 4.2, reviewCount: 210, stock: 40,
    image: "https://picsum.photos/seed/shopX-mouse/600/600",
    description: "Ergonomic wireless mouse with silent clicks and a 1600 DPI optical sensor.",
    features: ["2.4GHz wireless", "Silent clicks", "6-month battery life", "Ambidextrous shape"] },
  { id: 5, name: "Mechanical Keyboard", category: "Electronics", price: 2199, originalPrice: 3499, rating: 4.4, reviewCount: 98, stock: 12,
    image: "https://picsum.photos/seed/shopX-keyboard/600/600",
    description: "Compact mechanical keyboard with hot-swappable switches and per-key RGB.",
    features: ["Hot-swappable switches", "Per-key RGB", "USB-C detachable cable", "87-key layout"] },

  { id: 6, name: "Smartphone Neo 12", category: "Mobiles", price: 12999, originalPrice: 16999, rating: 4.0, reviewCount: 540, stock: 25,
    image: "https://picsum.photos/seed/shopX-phone1/600/600",
    description: "6.5-inch display smartphone with a 5000mAh battery and 50MP main camera.",
    features: ["6.5\" 90Hz display", "5000mAh battery", "50MP camera", "128GB storage"] },
  { id: 7, name: "Smartphone Neo 12 Pro", category: "Mobiles", price: 21999, originalPrice: 27999, rating: 4.3, reviewCount: 312, stock: 10,
    image: "https://picsum.photos/seed/shopX-phone2/600/600",
    description: "Pro variant with a faster chipset, 120Hz display, and triple camera setup.",
    features: ["6.7\" 120Hz AMOLED", "Triple camera", "8GB RAM / 256GB storage", "67W fast charging"] },

  { id: 8, name: "Casual Sneakers", category: "Fashion", price: 1199, originalPrice: 1999, rating: 4.0, reviewCount: 289, stock: 18,
    image: "https://picsum.photos/seed/shopX-sneakers/600/600",
    description: "Lightweight everyday sneakers with a breathable knit upper.",
    features: ["Breathable knit upper", "Cushioned sole", "Available in half sizes"] },
  { id: 9, name: "Hoodie", category: "Fashion", price: 799, originalPrice: 1299, rating: 4.1, reviewCount: 342, stock: 30,
    image: "https://picsum.photos/seed/shopX-hoodie/600/600",
    description: "Fleece-lined pullover hoodie with a kangaroo pocket, pre-shrunk cotton blend.",
    features: ["Fleece lined", "Kangaroo pocket", "Pre-shrunk cotton blend"] },
  { id: 10, name: "Backpack", category: "Fashion", price: 999, originalPrice: 1799, rating: 4.4, reviewCount: 176, stock: 22,
    image: "https://picsum.photos/seed/shopX-backpack/600/600",
    description: "Water-resistant backpack with a padded 15.6-inch laptop sleeve.",
    features: ["Padded laptop sleeve", "Water resistant", "Multiple compartments"] },
  { id: 11, name: "Analog Watch", category: "Fashion", price: 1599, originalPrice: 2999, rating: 4.2, reviewCount: 88, stock: 14,
    image: "https://picsum.photos/seed/shopX-watch/600/600",
    description: "Minimalist analog watch with a stainless steel case and leather strap.",
    features: ["Stainless steel case", "Genuine leather strap", "Water resistant to 3ATM"] },

  { id: 12, name: "Table Lamp", category: "Home", price: 449, originalPrice: 799, rating: 4.2, reviewCount: 221, stock: 35,
    image: "https://picsum.photos/seed/shopX-lamp/600/600",
    description: "Adjustable LED desk lamp with three brightness levels and a USB port.",
    features: ["3 brightness levels", "Flexible gooseneck", "USB charging port"] },
  { id: 13, name: "Coffee Maker", category: "Home", price: 1899, originalPrice: 2999, rating: 4.3, reviewCount: 145, stock: 9,
    image: "https://picsum.photos/seed/shopX-coffeemaker/600/600",
    description: "Drip coffee maker with a 600ml carafe and auto shut-off.",
    features: ["600ml carafe", "Auto shut-off", "Reusable filter"] },
  { id: 14, name: "Non-stick Cookware Set", category: "Home", price: 1699, originalPrice: 2999, rating: 4.5, reviewCount: 512, stock: 11,
    image: "https://picsum.photos/seed/shopX-cookware/600/600",
    description: "5-piece non-stick cookware set with heat-resistant handles, induction compatible.",
    features: ["5-piece set", "Induction compatible", "Heat-resistant handles"] },

  { id: 15, name: "Face Serum", category: "Beauty", price: 399, originalPrice: 699, rating: 4.1, reviewCount: 430, stock: 60,
    image: "https://picsum.photos/seed/shopX-serum/600/600",
    description: "Vitamin C face serum for daily use, lightweight and non-greasy.",
    features: ["Vitamin C formula", "Lightweight, non-greasy", "30ml bottle"] },
  { id: 16, name: "Hair Dryer", category: "Beauty", price: 899, originalPrice: 1499, rating: 4.0, reviewCount: 198, stock: 25,
    image: "https://picsum.photos/seed/shopX-hairdryer/600/600",
    description: "1800W hair dryer with two heat settings and a cool-shot button.",
    features: ["1800W motor", "2 heat settings", "Cool-shot button"] },
  { id: 17, name: "Trimmer", category: "Beauty", price: 699, originalPrice: 1199, rating: 4.2, reviewCount: 267, stock: 33,
    image: "https://picsum.photos/seed/shopX-trimmer/600/600",
    description: "Cordless trimmer with 20 length settings and 90 minutes of runtime.",
    features: ["20 length settings", "90-min runtime", "USB-C charging"] },

  { id: 18, name: "Gaming Mouse Pad", category: "Gaming", price: 349, originalPrice: 599, rating: 4.3, reviewCount: 190, stock: 50,
    image: "https://picsum.photos/seed/shopX-mousepad/600/600",
    description: "Extended gaming mouse pad with stitched edges and a non-slip base.",
    features: ["900 x 300mm", "Stitched edges", "Non-slip rubber base"] },
  { id: 19, name: "Gaming Controller", category: "Gaming", price: 1599, originalPrice: 2499, rating: 4.1, reviewCount: 234, stock: 16,
    image: "https://picsum.photos/seed/shopX-controller/600/600",
    description: "Wireless gaming controller with programmable back paddles and vibration feedback.",
    features: ["Wireless, 20hr battery", "Programmable back paddles", "Vibration feedback"] },
  { id: 20, name: "Gaming Headset", category: "Gaming", price: 1999, originalPrice: 3299, rating: 4.4, reviewCount: 167, stock: 19,
    image: "https://picsum.photos/seed/shopX-gheadset/600/600",
    description: "Over-ear gaming headset with a detachable noise-cancelling mic and 7.1 surround.",
    features: ["7.1 surround sound", "Detachable mic", "Memory foam ear cups"] },
];

/** Discount % is always derived from price/originalPrice — never stored separately,
 * so the displayed badge can never drift out of sync with the actual prices. */
function discountPct(product) {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

function formatPrice(n) {
  return `\u20B9${n.toLocaleString("en-IN")}`;
}

function getCategories() {
  return ["All", ...new Set(PRODUCTS.map((p) => p.category))];
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

/** Filters + sorts products. opts: { category, query, minPrice, maxPrice, minRating, sort } */
function queryProducts(opts = {}) {
  let list = [...PRODUCTS];

  if (opts.category && opts.category !== "All") {
    list = list.filter((p) => p.category === opts.category);
  }
  if (opts.query) {
    const q = opts.query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
  }
  if (opts.minPrice != null) list = list.filter((p) => p.price >= opts.minPrice);
  if (opts.maxPrice != null) list = list.filter((p) => p.price <= opts.maxPrice);
  if (opts.minRating != null) list = list.filter((p) => p.rating >= opts.minRating);

  switch (opts.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "discount-desc":
      list.sort((a, b) => discountPct(b) - discountPct(a));
      break;
    default:
      break; // "featured" — keep catalog order
  }
  return list;
}

/** Deals of the Day: a fixed daily-rotating subset with the biggest discounts. */
function getDealsOfTheDay(count = 4) {
  return [...PRODUCTS].sort((a, b) => discountPct(b) - discountPct(a)).slice(0, count);
}
