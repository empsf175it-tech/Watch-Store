/**
 * NovaPulse - Main JavaScript
 * Handles navigation, theme toggling, interactive components, forms, and product filtering.
 */

// Image error fallback listener
document.addEventListener("error", function (e) {
  var img = e.target;
  if (!img || img.tagName !== "IMG" || img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "1";
  img.style.objectFit = "cover";
  img.src =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8ff00"/><stop offset=".55" stop-color="#7058ff"/><stop offset="1" stop-color="#ff5b5b"/></linearGradient></defs><rect width="1200" height="800" fill="#111"/><circle cx="930" cy="180" r="260" fill="url(#g)" opacity=".85"/><rect x="380" y="155" width="440" height="490" rx="105" fill="#f4f2ed"/><rect x="435" y="220" width="330" height="360" rx="65" fill="#111"/><circle cx="600" cy="400" r="80" fill="#c8ff00"/><text x="600" y="710" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="#fff">NOVAPULSE</text></svg>'
    );
}, true);

// Page mapping for cross-page navigation
var PAGE_MAP = {
  home: "index.html",
  products: "products.html",
  about: "about.html",
  related: "accessories.html",
  accessories: "accessories.html",
  contact: "contact.html",
  login: "login.html",
  signup: "signup.html",
  dashboard: "dashboard.html"
};

/**
 * Navigate to a specific page
 * @param {string} name - Page identifier
 */
function showPage(name) {
  var target = PAGE_MAP[name] || name + ".html";
  var current = window.location.pathname.split("/").pop() || "index.html";
  
  if (current === target || (target === "index.html" && current === "")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.href = target;
}

/**
 * Navigate from mobile menu
 * @param {string} name - Page identifier
 */
function mobilePage(name) {
  var menu = document.getElementById("mobileMenu");
  var button = document.querySelector(".mobile-button");
  if (menu) menu.classList.remove("open");
  document.body.classList.remove("menu-open");
  if (button) {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    button.textContent = "☰";
  }
  showPage(name);
}

/**
 * Toggle mobile menu
 */
function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var button = document.querySelector(".mobile-button");
  if (!menu) return;
  var open = !menu.classList.contains("open");
  menu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  if (button) {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    button.textContent = open ? "×" : "☰";
  }
}

/**
 * Toggle Dark/Light Theme
 */
function toggleTheme() {
  var html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("np-theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("np-theme", "dark");
  }
}

/**
 * Display toast notification
 * @param {string} message 
 */
function toast(message) {
  var box = document.getElementById("toast");
  if (!box) {
    box = document.createElement("div");
    box.id = "toast";
    box.className = "toast";
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(function () {
    box.classList.remove("show");
  }, 2200);
}

/**
 * Shopping Bag / Cart System
 */
var productCatalog = {
  "Pulse X1": { price: 14999, img: "image/pulse-x1.jpg" },
  "Orbit Pro": { price: 18999, img: "image/orbit-pro.jpg" },
  "Aero Buds": { price: 7999, img: "image/aero-buds.jpg" },
  "Pulse Core": { price: 11999, img: "image/watch-pulse-core.jpg" },
  "Nova One": { price: 12499, img: "image/watch-nova-one.jpg" },
  "Apex Blue": { price: 14499, img: "image/watch-apex-blue.jpg" },
  "Orbit Blue": { price: 15999, img: "image/watch-orbit-blue.jpg" },
  "Sky Round": { price: 13999, img: "image/watch-sky-round.jpg" },
  "Titan Sport": { price: 16499, img: "image/watch-titan-sport.jpg" },
  "Flex Black": { price: 10999, img: "image/watch-flex-black.jpg" },
  "Marine": { price: 15499, img: "image/watch-marine.jpg" },
  "Nova White": { price: 12999, img: "image/watch-nova-white.jpg" },
  "Galaxy Fit": { price: 13499, img: "image/watch-galaxy-fit.jpg" },
  "Urban Connect": { price: 14999, img: "image/watch-urban-connect.jpg" },
  "Pulse Active": { price: 11499, img: "image/watch-pulse-active.jpg" },
  "Aero White": { price: 6999, img: "image/buds-aero-white.jpg" },
  "Studio Buds": { price: 8999, img: "image/buds-studio.jpg" },
  "Pure Air": { price: 5999, img: "image/buds-pure-air.jpg" },
  "Aero Noir": { price: 7499, img: "image/buds-aero-noir.jpg" },
  "Flow Buds": { price: 6499, img: "image/buds-flow.jpg" },
  "Motion Pods": { price: 8499, img: "image/buds-motion.jpg" },
  "Cloud White": { price: 5499, img: "image/buds-cloud-white.jpg" },
  "Aero Pro": { price: 9999, img: "image/buds-aero-pro.jpg" },
  "Shadow ANC": { price: 9499, img: "image/buds-shadow-anc.jpg" },
  "Aura Buds": { price: 7999, img: "image/buds-aura.jpg" },
  "Classic White": { price: 4999, img: "image/buds-classic-white.jpg" },
  "Desk Air": { price: 6999, img: "image/buds-desk-air.jpg" },
  "USB-C Travel Dock": { price: 2499, img: "image/acc-travel-dock.jpg" },
  "Magnetic Watch Band": { price: 1999, img: "image/acc-magnetic-band.jpg" },
  "Earbud Carry Case": { price: 1299, img: "image/acc-carry-case.jpg" }
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("np-cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("np-cart", JSON.stringify(cart));
  } catch (e) {}
}

function injectCartDrawer() {
  if (document.getElementById("cartDrawer")) return;

  var overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.id = "cartOverlay";
  overlay.onclick = toggleCart;

  var drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.id = "cartDrawer";
  drawer.setAttribute("aria-label", "Shopping Cart Drawer");
  drawer.innerHTML =
    '<div class="cart-header">' +
      '<div class="cart-title-row">' +
        '<h3>Your Bag</h3>' +
        '<span class="cart-count-pill" id="cartCountPill">0 items</span>' +
      '</div>' +
      '<button class="cart-close" type="button" aria-label="Close Cart" onclick="toggleCart()">✕</button>' +
    '</div>' +
    '<div class="cart-items" id="cartItems"></div>' +
    '<div class="cart-footer" id="cartFooter">' +
      '<div class="cart-subtotal-row">' +
        '<span>Subtotal</span>' +
        '<span class="cart-total-price" id="cartTotalPrice">₹0</span>' +
      '</div>' +
      '<p class="cart-shipping-note">Free standard shipping on all orders</p>' +
      '<button class="btn lime full-width" onclick="checkoutCart()">Proceed to Checkout ↗</button>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

function toggleCart() {
  injectCartDrawer();
  var drawer = document.getElementById("cartDrawer");
  var overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;

  var isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  } else {
    updateCartUI();
    drawer.classList.add("open");
    overlay.classList.add("open");
  }
}

function updateCartUI() {
  injectCartDrawer();
  var cart = getCart();
  var totalItems = 0;
  var subtotal = 0;

  cart.forEach(function (item) {
    totalItems += item.qty;
    subtotal += item.price * item.qty;
  });

  // Update navbar badges
  document.querySelectorAll(".cart-badge").forEach(function (badge) {
    badge.textContent = totalItems;
  });
  document.querySelectorAll(".mobile-cart-count").forEach(function (el) {
    el.textContent = totalItems;
  });

  var pill = document.getElementById("cartCountPill");
  if (pill) {
    pill.textContent = totalItems + (totalItems === 1 ? " item" : " items");
  }

  var totalPriceEl = document.getElementById("cartTotalPrice");
  if (totalPriceEl) {
    totalPriceEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
  }

  var itemsContainer = document.getElementById("cartItems");
  var footerEl = document.getElementById("cartFooter");

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML =
      '<div class="cart-empty">' +
        '<div class="cart-empty-icon">🛍️</div>' +
        '<h4>Your bag is empty</h4>' +
        '<p>Explore the collection to add premium wearables and accessories.</p>' +
        '<a href="products.html" class="btn lime" onclick="toggleCart()">Shop products ↗</a>' +
      '</div>';
    if (footerEl) footerEl.style.display = "none";
  } else {
    if (footerEl) footerEl.style.display = "block";
    var html = "";
    cart.forEach(function (item, index) {
      html +=
        '<div class="cart-item">' +
          '<img src="' + item.img + '" alt="' + item.name + '" class="cart-item-img">' +
          '<div class="cart-item-details">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-price">₹' + item.price.toLocaleString("en-IN") + '</div>' +
            '<div class="cart-item-qty">' +
              '<button type="button" class="qty-btn" aria-label="Decrease quantity" onclick="changeCartQty(' + index + ', -1)">−</button>' +
              '<span class="qty-value">' + item.qty + '</span>' +
              '<button type="button" class="qty-btn" aria-label="Increase quantity" onclick="changeCartQty(' + index + ', 1)">+</button>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="cart-item-remove" aria-label="Remove ' + item.name + '" onclick="removeCartItem(' + index + ')">🗑</button>' +
        '</div>';
    });
    itemsContainer.innerHTML = html;
  }
}

/**
 * Add item to bag
 * @param {string} name 
 */
function addBag(name) {
  var cart = getCart();
  var info = productCatalog[name] || { price: 9999, img: "image/hero-watch.jpg" };

  var existingIndex = cart.findIndex(function (item) {
    return item.name === name;
  });

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      name: name,
      price: info.price,
      img: info.img,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartUI();

  // Bump animation on badges
  document.querySelectorAll(".cart-badge").forEach(function (badge) {
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
  });

  toast(name + " added to bag");
}

function changeCartQty(index, delta) {
  var cart = getCart();
  if (!cart[index]) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  updateCartUI();
}

function removeCartItem(index) {
  var cart = getCart();
  if (!cart[index]) return;

  var removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
  toast(removedName + " removed from bag");
}

function checkoutCart() {
  var cart = getCart();
  if (cart.length === 0) {
    toast("Your bag is empty");
    return;
  }
  toast("Proceeding to checkout — demo mode ✦");
}

/**
 * Display quick product info
 * @param {string} name 
 * @param {string} price 
 */
function productInfo(name, price) {
  toast(name + " · " + price);
}

/**
 * Newsletter subscription
 */
function subscribe() {
  toast("You're on the NovaPulse list ✦");
}

/**
 * Contact form submit
 */
function sendMessage(event) {
  event.preventDefault();
  toast("Message sent successfully");
  event.target.reset();
}

/**
 * Social login simulation
 * @param {string} provider 
 */
function socialLogin(provider) {
  toast(provider + " sign-in selected — demo mode");
  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 600);
}

/**
 * Sign up form submit
 */
function signupSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var fields = form.querySelectorAll('input[type="password"]');
  if (fields.length >= 2 && fields[0].value !== fields[1].value) {
    toast("Passwords do not match");
    fields[1].focus();
    return;
  }
  toast("Account created successfully");
  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 700);
}

/**
 * Login form submit
 */
function loginSubmit(event) {
  event.preventDefault();
  toast("Login successful");
  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 600);
}

/**
 * Filter products on products page
 * @param {string} type - 'all', 'watch', or 'earbuds'
 * @param {HTMLElement} button 
 */
function filterProducts(type, button) {
  document.querySelectorAll(".filter").forEach(function (x) {
    x.classList.remove("active");
  });
  if (button) button.classList.add("active");
  document.querySelectorAll("#productGrid .product-card").forEach(function (card) {
    if (type === "all") {
      card.style.display = "";
      return;
    }
    if (type === "watch") {
      card.style.display = card.classList.contains("item-watch") ? "" : "none";
      return;
    }
    if (type === "earbuds") {
      card.style.display = card.classList.contains("item-earbuds") ? "" : "none";
    }
  });
}

/**
 * Switch view inside dashboard
 * @param {string} view 
 * @param {HTMLElement} button 
 */
function dashboardView(view, button) {
  var content = document.getElementById("dashboardContent");
  if (!content) return;
  document.querySelectorAll(".dashboard-tabs button").forEach(function (x) {
    x.classList.remove("active");
  });
  if (button) button.classList.add("active");

  if (view === "orders") {
    content.innerHTML =
      '<div class="dash-head"><div><h1>Orders</h1><div class="welcome">Track purchases, deliveries and recent activity.</div></div><a href="products.html" class="btn lime">Shop again ↗</a></div>' +
      '<div class="dash-grid">' +
      '<div class="dash-card"><small>Total orders</small><strong>8</strong></div>' +
      '<div class="dash-card"><small>Delivered</small><strong>7</strong></div>' +
      '<div class="dash-card"><small>In progress</small><strong>1</strong></div>' +
      '<div class="dash-card"><small>Total saved</small><strong>₹3,240</strong></div>' +
      '<div class="dash-card dash-wide"><small>Order history</small><table class="dash-table"><tr><th>Order</th><th>Product</th><th>Total</th><th>Date</th><th>Status</th></tr>' +
      '<tr><td>#NP-2408</td><td>Orbit Pro</td><td>₹18,999</td><td>18 Sep</td><td><span class="status">Delivered</span></td></tr>' +
      '<tr><td>#NP-2387</td><td>Aero Buds</td><td>₹7,999</td><td>05 Sep</td><td><span class="status">Delivered</span></td></tr>' +
      '<tr><td>#NP-2312</td><td>Watch Band</td><td>₹1,499</td><td>22 Aug</td><td><span class="status">Delivered</span></td></tr></table></div>' +
      '<div class="dash-card dash-wide"><small>Current delivery</small><h3 style="margin-top:12px">Aero Buds replacement tips</h3><p style="color:var(--muted)">Expected delivery · 27 Sep</p><div class="dashboard-progress"><span style="width:68%"></span></div><p style="font-size:12px;color:var(--muted)">68% of the delivery journey completed.</p></div>' +
      '</div>';
  } else if (view === "devices") {
    content.innerHTML =
      '<div class="dash-head"><div><h1>My Devices</h1><div class="welcome">Your connected NovaPulse products and battery status.</div></div><a href="products.html" class="btn lime">Add device ↗</a></div>' +
      '<div class="product-grid">' +
      '<article class="product-card"><div class="product-media dashboard-device-art"><div class="device-shape watch-shape"></div></div><div class="product-info"><h3>Orbit Pro</h3><p>Connected · 87% battery · Syncing now</p><button class="btn outline" onclick="toast(\'Orbit Pro settings opened\')">Manage device</button></div></article>' +
      '<article class="product-card"><div class="product-media dashboard-device-art"><div class="device-shape buds-shape"></div></div><div class="product-info"><h3>Aero Buds</h3><p>Connected · 64% case · ANC on</p><button class="btn outline" onclick="toast(\'Aero Buds controls opened\')">Manage device</button></div></article>' +
      '<article class="product-card"><div class="product-media dashboard-device-art"><div class="device-shape watch-shape"></div></div><div class="product-info"><h3>Pulse Core</h3><p>Connected · 52% battery · Last sync 2m ago</p><button class="btn outline" onclick="toast(\'Pulse Core settings opened\')">Manage device</button></div></article>' +
      '</div>';
  } else if (view === "profile") {
    content.innerHTML =
      '<div class="dash-head"><div><h1>Profile</h1><div class="welcome">Manage your NovaPulse account details.</div></div></div>' +
      '<div class="form-card"><div class="form-grid">' +
      '<div class="field"><label>Name</label><input value="Aravind"></div>' +
      '<div class="field"><label>Email</label><input value="hello@example.com"></div>' +
      '<div class="field"><label>Phone</label><input value="+91 8000 123 456"></div>' +
      '<div class="field"><label>City</label><input value="Hyderabad"></div>' +
      '<div class="field"><label>Preferred device</label><select><option>Orbit Pro</option><option>Pulse X1</option><option>Aero Buds</option></select></div>' +
      '<div class="field"><label>Notifications</label><select><option>All updates</option><option>Orders only</option><option>Off</option></select></div>' +
      '<div class="field full"><button class="btn lime" onclick="toast(\'Profile saved successfully\')">Save changes</button></div>' +
      '</div></div>';
  }
}

// Navbar & Back-to-top scroll listener
window.addEventListener("scroll", function () {
  var back = document.getElementById("backtop");
  if (back) {
    if (window.scrollY > 500) {
      back.classList.add("show");
    } else {
      back.classList.remove("show");
    }
  }

  var topbar = document.querySelector(".topbar, .dashboard-simple-head");
  if (topbar) {
    if (window.scrollY > 15) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }
});

// Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Theme initialization
  if (localStorage.getItem("np-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
  
  // Highlight active nav link
  var currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a, .mobile-menu a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentFile || (currentFile === "index.html" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Cart initialization
  injectCartDrawer();
  updateCartUI();

  // Reveal elements on scroll
  setTimeout(function () {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }, 100);
});
