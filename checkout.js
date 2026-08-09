/* ===========================================================
   shopX — js/checkout.js
   Order creation + a SIMULATED payment step.

   No real payment gateway is called anywhere in this file. No
   card/UPI/bank details are sent over the network — they are read
   from the form only to decide which confirmation message to show,
   then discarded. If you ever wire this up to accept real orders,
   replace this whole module with a real gateway integration
   (e.g. Razorpay/Stripe) and handle payment server-side.
   =========================================================== */

const ORDERS_KEY = "shopX_orders";

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  return "SHOP" + Math.floor(100000 + Math.random() * 900000);
}

/**
 * Simulates placing an order. Always "succeeds" for Cash on Delivery
 * (nothing to fail there). For UPI / Card / Demo Payment it resolves
 * randomly (~90% success) purely to demonstrate a failure state.
 */
function placeOrder({ address, paymentMethod }) {
  const { subtotal, discount, shipping, total, lines } = cartTotals();
  if (lines.length === 0) return { ok: false, error: "Your cart is empty." };

  const success = paymentMethod === "cod" || Math.random() < 0.9;
  if (!success) {
    return { ok: false, error: "Payment simulation failed. No amount was charged — please try again." };
  }

  const order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    address,
    paymentMethod,
    items: lines.map((l) => ({ id: l.id, name: l.product.name, price: l.product.price, qty: l.qty })),
    subtotal,
    discount,
    shipping,
    total,
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  cartClear();

  return { ok: true, order };
}
