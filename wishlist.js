/* ===========================================================
   shopX — js/wishlist.js
   Wishlist state, backed by localStorage. Structure: [id, id, ...]
   =========================================================== */

const WISHLIST_KEY = "shopX_wishlist";

function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}
function writeWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function isWishlisted(id) {
  return readWishlist().includes(id);
}

function wishlistToggle(id) {
  const list = readWishlist();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id);
  else list.splice(idx, 1);
  writeWishlist(list);
  return idx === -1; // true = now wishlisted
}

function wishlistCount() {
  return readWishlist().length;
}

function wishlistProducts() {
  return readWishlist()
    .map((id) => getProductById(id))
    .filter(Boolean);
}
