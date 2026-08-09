/* ===========================================================
   shopX — js/cart.js
   Cart state, backed by localStorage so it survives a refresh.
   Structure: [{ id, qty }]
   =========================================================== */

const CART_KEY = "shopX_cart";
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 49;

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartAdd(id, qty = 1) {
  const product = getProductById(id);
  if (!product) return;
  const cart = readCart();
  const line = cart.find((l) => l.id === id);
  const currentQty = line ? line.qty : 0;
  const nextQty = Math.min(currentQty + qty, product.stock);
  if (line) line.qty = nextQty;
  else cart.push({ id, qty: nextQty });
  writeCart(cart);
}

function cartSetQty(id, qty) {
  const product = getProductById(id);
  let cart = readCart();
  if (qty <= 0) {
    cart = cart.filter((l) => l.id !== id);
  } else {
    const clamped = product ? Math.min(qty, product.stock) : qty;
    const line = cart.find((l) => l.id === id);
    if (line) line.qty = clamped;
  }
  writeCart(cart);
}

function cartRemove(id) {
  writeCart(readCart().filter((l) => l.id !== id));
}

function cartClear() {
  writeCart([]);
}

function cartLines() {
  return readCart()
    .map((l) => ({ ...l, product: getProductById(l.id) }))
    .filter((l) => l.product);
}

function cartCount() {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartTotals() {
  const lines = cartLines();
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const originalSubtotal = lines.reduce((sum, l) => sum + l.product.originalPrice * l.qty, 0);
  const discount = originalSubtotal - subtotal;
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  return { subtotal, discount, shipping, total, lines };
}
