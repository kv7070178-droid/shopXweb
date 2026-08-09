# shopX — E-Commerce Demo (College/Learning Project)

A fully working shopping-flow demo built with vanilla HTML/CSS/JS. It's a
**college project**, not a real store — there's no backend, no real payments,
and no real user accounts.

## What's actually functional

- **Search** — filters products live by name, category, and description.
- **Category filter + price range + minimum rating + sort** — all combine
  and update the grid instantly, no page reload.
- **Cart** — add/remove, change quantity, live subtotal/discount/shipping/total,
  persisted in `localStorage` so it survives a refresh.
- **Wishlist** — heart toggle on every product card, persisted the same way.
- **Product details** — quantity selector, stock-aware Add to Cart/Buy Now,
  wishlist toggle, features list.
- **Login / Signup** — simulated with `localStorage` (see warning below).
- **Checkout** — 3 real steps (address → review → payment) with all four
  payment methods (UPI, Card, Demo Payment, Cash on Delivery) genuinely
  selectable — none are disabled to push you toward one option.
- **Orders** — every placed order is saved and viewable under "My Orders."
- **Countdown timer** — a real timer counting down to a fixed end time
  (persisted per-browser), including a genuine "sale expired" state once it
  hits zero. Add `?testExpiry=1` to the URL to see the expired state in ~5
  seconds instead of waiting.
- **Toast notifications** for cart/wishlist/order actions instead of
  `alert()`.
- Fully responsive: mobile hamburger menu, 2-column mobile grid scaling up
  to 4 columns on desktop.

## Important limitations (read before treating this as "real")

- **Authentication is not secure.** `js/auth.js` stores account info in
  plain text in the browser. That's fine for a demo where nobody enters a
  real password, but it is not how real login systems work — passwords
  should be hashed and checked server-side. Don't reuse this pattern for
  anything real.
- **No real payment is ever processed.** `js/checkout.js` never calls a
  payment gateway and never transmits card/UPI details anywhere — they're
  read from the form only to decide which mock confirmation to show, then
  discarded.
- **Data resets if you clear browser storage**, since everything (cart,
  wishlist, accounts, orders) lives in `localStorage`, not a database.
- Product images are placeholder photos from picsum.photos, not real
  product photography.

## File structure

```
shopX/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── products.js   — product data + search/filter/sort helpers
│   ├── cart.js        — cart state (localStorage)
│   ├── wishlist.js     — wishlist state (localStorage)
│   ├── auth.js          — simulated login/signup (localStorage)
│   ├── checkout.js       — order creation + mock payment
│   └── main.js             — view navigation, rendering, all UI wiring
└── README.md
```

This is a single-page app (all "pages" are sections toggled by
`js/main.js`) rather than separate `.html` files per page. That avoids
re-implementing the header/cart-count/wishlist-count sync logic six
different times, which is a common source of bugs in multi-page vanilla-JS
sites — the module split you'd get from separate pages is preserved in the
`js/` folder instead.

## Running it in VS Code

1. Open the `shopX` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't
   have it.
3. Right-click `index.html` → **"Open with Live Server."**
4. The site opens at something like `http://127.0.0.1:5500`.

You can also run any static server manually:

```bash
cd shopX
python3 -m http.server 8000
# then open http://localhost:8000
```

Don't just double-click `index.html` — some browsers restrict certain
features (and any future `fetch()` calls you add) on the `file://`
protocol, so a local server is the more reliable habit.

## Things worth trying while testing

- Add a few products to the cart, refresh the page — the cart should still
  be there.
- Sign up for an account, log out, then log back in with the same
  credentials.
- Place an order with each of the four payment methods and check "My
  Orders" afterward.
- Resize the browser down to ~375px width to see the mobile layout and
  hamburger menu.
- Visit with `?testExpiry=1` appended to the URL to see the countdown
  reach zero.

## Ideas if you want to extend it further

- Add product image galleries (multiple photos per product).
- Add a "Similar Products" section on the product detail page.
- Replace the `localStorage` product list with a real backend/database
  once you're ready to learn a server-side stack — at that point, also
  replace the mock checkout with a real payment gateway integration
  (e.g. Razorpay, Stripe) handled server-side, and hash passwords
  server-side instead of storing them in the browser.
