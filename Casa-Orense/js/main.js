// ============================================================
// CASA ORENSE — MAIN JS
// ============================================================

// ─── STATE ───────────────────────────────────────────────────
const State = {
  user: JSON.parse(localStorage.getItem('co_user') || 'null'),
  basket: JSON.parse(localStorage.getItem('co_basket') || '[]'),
};

// ─── STORES ──────────────────────────────────────────────────
const STORES = [
  { id: 'rockwell',  name: 'Rockwell',  district: 'Makati City' },
  { id: 'greenbelt', name: 'Greenbelt', district: 'Ayala, Makati' },
  { id: 'bgc',       name: 'BGC',       district: 'Bonifacio Global City, Taguig' },
];

// ─── PRODUCTS DATA (home page featured items) ────────────────
const PRODUCTS = [
  { id: 1,  name: 'Bombadier Leather Jacket', category: 'Outerwear', price: 285000, badge: 'New Arrival', img: 'assets/products/men/outerwear/jackets/BombadierLeatherJacket_ModelFront.jpg', gender: 'mens',   specs: { Material: '100% Lamb Nappa', Origin: 'Atelier Made, Manila', Care: 'Dry Clean Only', Season: 'AW 2025' } },
  { id: 2,  name: 'Black Parade Jacket',       category: 'Outerwear', price: 320000, badge: 'Exclusive',   img: 'assets/products/women/outerwear/jackets/BlackParadeJacket_ModelFront.jpg', gender: 'womens', specs: { Material: 'Pressed Wool',     Origin: 'Atelier Made, Manila', Care: 'Dry Clean Only', Season: 'AW 2025' } },
  { id: 3,  name: 'Obscura Penny Loafers',     category: 'Footwear',  price: 98000,  badge: null,          img: 'assets/web utilities/his-shoes.jpg',   gender: 'mens',   specs: { Material: 'Full-grain Calfskin', Origin: 'Handcrafted, Marikina', Care: 'Leather Conditioning', Season: 'Perennial' } },
  { id: 4,  name: 'Column Ballerinas',          category: 'Footwear',  price: 112000, badge: 'New Arrival', img: 'assets/products/shoes/womens/BlackBallerinaShoes_ModelFeet.jpg',   gender: 'womens', specs: { Material: 'Nappa Leather',    Origin: 'Handcrafted, Marikina', Care: 'Leather Care Kit', Season: 'SS 2025' } },
  { id: 5,  name: 'Impress I Amana',            category: 'Bags',      price: 285000, badge: 'Bestseller',  img: 'assets/products/bags/impress/AmanadeImpressMedium_WithModel.jpg',        gender: 'womens', specs: { Material: 'Pebbled Lambskin', Origin: 'Atelier Made, Manila', Care: 'Dust Bag Included', Season: 'Perennial' } },
  { id: 6,  name: 'Forma Penny Loafers',        category: 'Footwear',  price: 88000,  badge: null,          img: 'assets/products/shoes/mens/BlackDressPennyLoafers_ModelFront.jpg',   gender: 'mens',   specs: { Material: 'Polished Calfskin', Origin: 'Handcrafted, Marikina', Care: 'Cedar Shoe Trees', Season: 'Perennial' } },
  { id: 7,  name: 'Clasped Marl Jacket',          category: 'Outerwear', price: 195000, badge: 'Exclusive',   img: 'assets/products/women/outerwear/jackets/ClaspedMarlJacket_ModelFront.jpg', gender: 'womens', specs: { Material: 'Wool Gabardine',   Origin: 'Atelier Made, Manila', Care: 'Dry Clean Only', Season: 'AW 2025' } },
  { id: 8,  name: 'Silver Mini Klasiko',       category: 'Bags',      price: 445000, badge: null,          img: 'assets/products/bags/klasiko/SilverMiniKlasiko_WithModel.jpg',        gender: 'womens', specs: { Material: 'Vegetable-tanned Leather', Origin: 'Atelier Made, Manila', Care: 'Leather Beeswax', Season: 'Perennial' } },
];

// ─── UTILITIES ───────────────────────────────────────────────
function formatPrice(n) {
  return '₱' + Number(n).toLocaleString('en-PH');
}

function saveUser(user) {
  State.user = user;
  localStorage.setItem('co_user', JSON.stringify(user));
}

function saveBasket() {
  localStorage.setItem('co_basket', JSON.stringify(State.basket));
}

function showToast(msg, icon = '✦') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-icon').textContent = icon;
  t.querySelector('.toast-text').textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 3500);
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

// ─── CURSOR ──────────────────────────────────────────────────
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  if (!cursor || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, [data-hover], .catalog-card, .collection-card');
    if (el) { cursor.classList.add('hover'); ring.classList.add('hover'); }
    else    { cursor.classList.remove('hover'); ring.classList.remove('hover'); }
  });
}

// ─── LOADING SCREEN ──────────────────────────────────────────
function initLoading() {
  const ls  = document.getElementById('loadingScreen');
  const bar = document.getElementById('loadingBar');
  if (!ls) return;
  if (bar) bar.style.width = '100%';
  setTimeout(() => {
    ls.classList.add('done');
    setTimeout(() => ls.remove(), 1000);
  }, 2200);
}

// ─── HERO VIDEOS ─────────────────────────────────────────────
function initHeroVideos() {
  const videos     = document.querySelectorAll('.hero-video');
  const indicators = document.querySelectorAll('.hero-indicator');
  if (!videos.length) return;
  let current = 0;
  videos[0].classList.add('active');
  if (indicators[0]) indicators[0].classList.add('active');

  function goTo(i) {
    videos[current].classList.remove('active');
    if (indicators[current]) indicators[current].classList.remove('active');
    current = i;
    videos[current].classList.add('active');
    if (indicators[current]) indicators[current].classList.add('active');
  }

  indicators.forEach((ind, i) => ind.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo((current + 1) % videos.length), 7000);
}

// ─── NAV ─────────────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  updateNavUser();
}

function updateNavUser() {
  const loginBtn   = document.getElementById('navLoginBtn');
  const accountBtn = document.getElementById('navAccountBtn');
  if (loginBtn)   loginBtn.textContent = State.user ? 'Sign Out' : 'Sign In';
  if (accountBtn) accountBtn.style.display = State.user ? 'flex' : 'none';
  updateBasketCount();
}

function updateBasketCount() {
  const cnt = document.querySelector('.basket-count');
  if (!cnt) return;
  cnt.textContent = State.basket.length;
  cnt.classList.toggle('visible', State.basket.length > 0);
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

// ─── HOME PRODUCTS ────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = '<p style="color:var(--warm-grey);font-family:var(--font-body);font-size:0.7rem;letter-spacing:0.2em;padding:60px 0">No pieces found.</p>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrap">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.background='var(--dark)'">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" title="Quick View" onclick="openProductDetail(${p.id})">⊕</button>
          <button class="product-action-btn" title="Reserve"    onclick="addToBasket(${p.id})">◻</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="product-reserve" onclick="addToBasket(${p.id})">Reserve</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  document.getElementById('productsCount').textContent = list.length + ' Pieces';
}

let activeFilter = 'all';
let activeSort   = 'default';
let searchQuery  = '';

function getFilteredProducts() {
  let list = [...PRODUCTS];
  if (activeFilter !== 'all') list = list.filter(p => p.gender === activeFilter || p.category.toLowerCase() === activeFilter);
  if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery));
  if (activeSort === 'asc')   list.sort((a, b) => a.price - b.price);
  if (activeSort === 'desc')  list.sort((a, b) => b.price - a.price);
  if (activeSort === 'alpha') list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts(getFilteredProducts());
    });
  });
  document.getElementById('sortSelect')?.addEventListener('change', e => { activeSort = e.target.value; renderProducts(getFilteredProducts()); });
  document.getElementById('searchInput')?.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase().trim(); renderProducts(getFilteredProducts()); });
}

// ─── BASKET ──────────────────────────────────────────────────
// addToBasket accepts either a numeric id (home page PRODUCTS) or string id (catalog CATALOG)
function addToBasket(productId) {
  if (!State.user) {
    showToast('Please sign in to reserve pieces.', '⊘');
    openModal('loginModal');
    return;
  }

  // Find in home PRODUCTS (numeric) or CATALOG (string), whichever is available
  let p = null;
  if (typeof PRODUCTS !== 'undefined') {
    p = PRODUCTS.find(x => x.id == productId);
  }
  if (!p && typeof CATALOG !== 'undefined' && CATALOG.findById) {
    p = CATALOG.findById(String(productId));
  }
  if (!p) { showToast('Product not found.', '⊘'); return; }

  const basketId = String(p.id);
  if (State.basket.find(x => String(x.id) === basketId)) {
    showToast(`${p.name} is already in your reservation.`, '✦');
    return;
  }

  State.basket.push({
    id:       basketId,
    name:     p.name,
    category: p.category,
    price:    p.price,
    img:      p.img || '',
  });
  saveBasket();
  updateBasketCount();
  showToast(`${p.name} added to reservation.`, '✦');
  renderBasket();
}

function removeFromBasket(basketId) {
  State.basket = State.basket.filter(x => String(x.id) !== String(basketId));
  saveBasket();
  updateBasketCount();
  renderBasket();
  showToast('Item removed from reservation.', '◻');
}

function renderBasket() {
  const list   = document.getElementById('basketItemsList');
  const empty  = document.getElementById('basketEmpty');
  const footer = document.getElementById('basketFooter');
  if (!list) return;

  if (!State.basket.length) {
    list.style.display = 'none';
    if (empty)  empty.style.display  = 'flex';
    if (footer) footer.style.display = 'none';
    return;
  }

  list.style.display = 'block';
  if (empty)  empty.style.display  = 'none';
  if (footer) footer.style.display = 'block';

  list.innerHTML = State.basket.map(item => `
    <div class="basket-item">
      <img class="basket-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='var(--dark)'">
      <div class="basket-item-info">
        <div class="basket-item-name">${item.name}</div>
        <div class="basket-item-cat">${item.category}</div>
        <div class="basket-item-price">${formatPrice(item.price)}</div>
      </div>
      <button class="basket-item-remove" onclick="removeFromBasket('${item.id}')">✕</button>
    </div>`).join('');
}

function initBasket() {
  const toggleBtn  = document.getElementById('basketToggle');
  const closeBtn   = document.getElementById('basketClose');
  const overlay    = document.getElementById('basketOverlay');
  const sidebar    = document.getElementById('basketSidebar');
  const reserveBtn = document.getElementById('basketReserveBtn');

  const openBasket  = () => { sidebar?.classList.add('open');    overlay?.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const closeBasket = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = '';       };

  toggleBtn?.addEventListener('click', openBasket);
  closeBtn?.addEventListener('click',  closeBasket);
  overlay?.addEventListener('click',   closeBasket);

  reserveBtn?.addEventListener('click', () => {
    if (!State.user)          { showToast('Please sign in first.', '⊘');              return; }
    if (!State.basket.length) { showToast('Your reservation is empty.', '◻');         return; }

    const storeSelect = document.getElementById('basketStoreSelect');
    const storeId     = storeSelect?.value;
    if (!storeId)             { showToast('Please select a pickup store.', '⊘');      return; }

    closeBasket();
    // Check for existing appointment — launch reservation flow
    launchReservationApptFlow(storeId);
  });

  renderBasket();
}

// ─── RESERVATION → APPOINTMENT FLOW ─────────────────────────
/*
  Logic:
  1. User clicks "Confirm Reservation" in basket.
  2. We check if they already have a saved appointment.
     a. If YES  → show modal asking: use existing store? or new appointment?
     b. If NO   → go straight to appointment booking modal (pre-set to Shopping / Store Pickup).
  3. Once appointment is confirmed, finalize reservation and clear basket.
*/
function launchReservationApptFlow(selectedStoreId) {
  const allAppts = JSON.parse(localStorage.getItem('co_appointments') || '[]');
  const userAppts = allAppts.filter(a => a.userId === State.user?.email);

  if (userAppts.length > 0) {
    // Show "use existing or new?" modal
    showExistingApptChoice(userAppts, selectedStoreId);
  } else {
    // No appointment — open booking modal pre-filled for Store Pickup
    openApptForReservation(selectedStoreId, null);
  }
}

function showExistingApptChoice(appts, selectedStoreId) {
  openModal('reserveApptModal');

  const listEl = document.getElementById('existingApptList');
  if (!listEl) return;

  listEl.innerHTML = appts.map((a, i) => {
    const storeName = STORES.find(s => s.id === a.store)?.name || a.store;
    return `
      <div class="existing-appt-choice" data-index="${i}" onclick="selectExistingAppt(this, ${i})">
        <div>
          <div class="existing-appt-label">${storeName}</div>
          <div class="existing-appt-detail">${a.visitType} · ${a.date} at ${a.time}</div>
        </div>
        <div class="existing-appt-check">✓</div>
      </div>`;
  }).join('');

  // Store appts in a temp holder so confirm button can read them
  window._reserveAppts       = appts;
  window._reserveStoreId     = selectedStoreId;
  window._reserveSelectedIdx = null;

  document.getElementById('reserveApptConfirmBtn')?.addEventListener('click', function handler() {
    this.removeEventListener('click', handler);
    if (window._reserveSelectedIdx === null) {
      showToast('Please select an option.', '⊘'); return;
    }
    closeModal('reserveApptModal');
    if (window._reserveSelectedIdx === -1) {
      // New appointment
      openApptForReservation(window._reserveStoreId, null);
    } else {
      // Use existing
      finalizeReservation(window._reserveAppts[window._reserveSelectedIdx].store);
    }
  });
}

window.selectExistingAppt = function(el, idx) {
  document.querySelectorAll('.existing-appt-choice').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  window._reserveSelectedIdx = idx;
};

window.selectNewAppt = function(el) {
  document.querySelectorAll('.existing-appt-choice').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  window._reserveSelectedIdx = -1;
};

function openApptForReservation(storeId, _unused) {
  // Pre-fill appointment modal and open it
  openModal('appointmentModal');
  if (State.user) {
    const nameEl = document.getElementById('apptName');
    if (nameEl) nameEl.value = ((State.user.firstName || '') + ' ' + (State.user.lastName || '')).trim();
  }
  const storeEl = document.getElementById('apptStore');
  if (storeEl && storeId) storeEl.value = storeId;

  // Pre-select "Store Pickup" type button
  document.querySelectorAll('.appt-type-btn').forEach(b => {
    b.style.borderColor = 'rgba(184,151,90,0.2)';
    if (b.dataset.type === 'Store Pickup') {
      b.style.borderColor = 'var(--gold)';
      window._apptVisitType = 'Store Pickup';
    }
  });

  // After appointment is submitted, finalize the reservation
  window._pendingReservationAfterAppt = true;
  window._pendingReservationStore     = storeId;
}

function finalizeReservation(storeId) {
  const storeName = STORES.find(s => s.id === storeId)?.name || storeId;

  // Save reservation record
  const reservations = JSON.parse(localStorage.getItem('co_reservations') || '[]');
  reservations.push({
    userId:    State.user.email,
    store:     storeId,
    items:     [...State.basket],
    createdAt: new Date().toISOString(),
    status:    'pending',
  });
  localStorage.setItem('co_reservations', JSON.stringify(reservations));

  // Clear basket
  State.basket = [];
  saveBasket();
  updateBasketCount();
  renderBasket();

  showToast(`Reservation confirmed at ${storeName}. See you soon.`, '✦');
}

// ─── PRODUCT DETAIL (home page) ──────────────────────────────
function openProductDetail(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const section = document.getElementById('productDetailSection');
  if (!section) return;
  section.classList.add('open');
  section.innerHTML = `
    <div style="max-width:1200px;margin:0 auto">
      <button onclick="closeProductDetail()"
        style="background:none;border:none;color:var(--warm-grey);font-family:var(--font-body);font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;cursor:none;margin-bottom:48px;display:flex;align-items:center;gap:8px;"
        onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--warm-grey)'">← Back</button>
      <div class="product-detail-grid">
        <div class="product-detail-gallery">
          <img class="product-detail-main-img" src="${p.img}" alt="${p.name}" onerror="this.style.background='var(--dark)'">
        </div>
        <div class="product-detail-info">
          <span class="section-label">${p.category}</span>
          <h1 class="product-detail-name">${p.name}</h1>
          <div class="product-detail-price">${formatPrice(p.price)}</div>
          <div class="product-detail-specs">
            ${Object.entries(p.specs || {}).map(([k,v]) => `
              <div class="product-spec">
                <span class="product-spec-label">${k}</span>
                <span class="product-spec-value">${v}</span>
              </div>`).join('')}
          </div>
          <button class="btn-primary"   style="width:100%;justify-content:center;margin-bottom:16px" onclick="addToBasket(${p.id})">Reserve This Piece</button>
          <button class="btn-secondary" style="width:100%;justify-content:center" onclick="openModal('appointmentModal')">Book In-Store Visit</button>
          <p style="font-family:var(--font-body);font-size:0.55rem;font-weight:300;color:var(--warm-grey);letter-spacing:0.15em;margin-top:16px;text-align:center">Reservation for in-store pickup only. Walk-ins not permitted.</p>
        </div>
      </div>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('mainContent').style.display = 'none';
}

function closeProductDetail() {
  const section = document.getElementById('productDetailSection');
  if (section) { section.classList.remove('open'); section.innerHTML = ''; }
  const mc = document.getElementById('mainContent');
  if (mc) mc.style.display = 'block';
}

// ─── AUTH ─────────────────────────────────────────────────────
function initAuth() {
  // Toggle forms
  document.getElementById('showRegister')?.addEventListener('click', () => {
    document.getElementById('loginForm').style.display  = 'none';
    document.getElementById('registerForm').style.display = 'block';
    const title  = document.querySelector('#loginModal .modal-title');
    const eyebrow = document.querySelector('#loginModal .modal-eyebrow');
    if (title)   title.textContent   = 'Create Account';
    if (eyebrow) eyebrow.textContent = 'Join Casa Orense';
  });

  document.getElementById('showLogin')?.addEventListener('click', () => {
    document.getElementById('loginForm').style.display  = 'block';
    document.getElementById('registerForm').style.display = 'none';
    const title  = document.querySelector('#loginModal .modal-title');
    const eyebrow = document.querySelector('#loginModal .modal-eyebrow');
    if (title)   title.textContent   = 'Welcome Back';
    if (eyebrow) eyebrow.textContent = 'Members Only';
  });

  // Nav login/out
  document.getElementById('navLoginBtn')?.addEventListener('click', () => {
    if (State.user) {
      State.user = null;
      localStorage.removeItem('co_user');
      State.basket = [];
      saveBasket();
      updateNavUser();
      renderBasket();
      showToast('You have signed out.', '✦');
    } else {
      openModal('loginModal');
    }
  });

  // Close modals via X button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Login submit
  document.getElementById('loginFormEl')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value;

    // Default admin
    if (email === 'admin@casaorense.com' && pass === 'CasaOrense2025') {
      saveUser({ email, firstName: 'Admin', lastName: '', role: 'admin' });
      closeModal('loginModal');
      updateNavUser();
      showToast('Welcome back, Admin.', '✦');
      return;
    }

    const users = JSON.parse(localStorage.getItem('co_users') || '[]');
    const found = users.find(u => u.email === email && u.password === btoa(pass));
    if (found) {
      saveUser(found);
      closeModal('loginModal');
      updateNavUser();
      showToast(`Welcome back, ${found.firstName}.`, '✦');
    } else {
      const errEl = document.getElementById('loginError');
      if (errEl) { errEl.textContent = 'Invalid email or password.'; errEl.classList.add('visible'); }
    }
  });

  // Register submit
  document.getElementById('registerFormEl')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // Age check
    const bday  = new Date(data.birthday);
    const today = new Date();
    let age = today.getFullYear() - bday.getFullYear();
    const mm = today.getMonth() - bday.getMonth();
    if (mm < 0 || (mm === 0 && today.getDate() < bday.getDate())) age--;

    const ageErr = document.getElementById('ageError');
    if (age < 21) {
      if (ageErr) { ageErr.textContent = 'You must be 21 or older to register.'; ageErr.classList.add('visible'); }
      return;
    }
    if (ageErr) ageErr.classList.remove('visible');

    // Email format
    const emailErr = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      if (emailErr) { emailErr.textContent = 'Please enter a valid email address.'; emailErr.classList.add('visible'); }
      return;
    }
    if (emailErr) emailErr.classList.remove('visible');

    const users = JSON.parse(localStorage.getItem('co_users') || '[]');
    if (users.find(u => u.email === data.email)) {
      if (emailErr) { emailErr.textContent = 'An account with this email already exists.'; emailErr.classList.add('visible'); }
      return;
    }

    const newUser = {
      email:     data.email,
      firstName: data.firstName,
      lastName:  data.lastName,
      phone:     data.phone,
      location:  data.location,
      gender:    data.gender,
      birthday:  data.birthday,
      age,
      measurements: { chest: data.chest, waist: data.waist, hips: data.hips, inseam: data.inseam, shoulder: data.shoulder, height: data.height },
      password:  btoa(data.password),
      role:      'member',
    };
    users.push(newUser);
    localStorage.setItem('co_users', JSON.stringify(users));
    saveUser(newUser);
    closeModal('loginModal');
    updateNavUser();
    showToast(`Welcome to Casa Orense, ${newUser.firstName}.`, '✦');
  });

  // Google (simulated)
  document.querySelectorAll('.google-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = prompt('Enter your Google email:');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Invalid email address.', '⊘'); return;
      }
      const users = JSON.parse(localStorage.getItem('co_users') || '[]');
      let user = users.find(u => u.email === email);
      if (!user) {
        const firstName = prompt('First name:') || 'Guest';
        const lastName  = prompt('Last name:')  || '';
        const bdayStr   = prompt('Birthday (YYYY-MM-DD):') || '';
        const bday = new Date(bdayStr);
        const today = new Date();
        let age = today.getFullYear() - bday.getFullYear();
        const mm = today.getMonth() - bday.getMonth();
        if (mm < 0 || (mm === 0 && today.getDate() < bday.getDate())) age--;
        if (age < 21) { showToast('You must be 21+ to register.', '⊘'); return; }
        user = { email, firstName, lastName, role: 'member', age, password: '' };
        users.push(user);
        localStorage.setItem('co_users', JSON.stringify(users));
      }
      saveUser(user);
      closeModal('loginModal');
      updateNavUser();
      showToast(`Welcome, ${user.firstName}.`, '✦');
    });
  });
}

// ─── APPOINTMENT ─────────────────────────────────────────────
function initAppointment() {
  let step        = 1;
  let visitType   = '';
  let numVisitors = 1;

  function goStep(n) {
    document.querySelectorAll('.appt-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.appt-step[data-step="${n}"]`)?.classList.add('active');
    document.querySelectorAll('.appt-progress-bar').forEach((b, i) => b.classList.toggle('done', i < n));
    step = n;
  }

  function resetApptForm() {
    goStep(1);
    visitType   = '';
    numVisitors = 1;
    document.querySelectorAll('.appt-type-btn').forEach(b => b.style.borderColor = 'rgba(184,151,90,0.2)');
  }

  // Visit type buttons
  document.querySelectorAll('.appt-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.appt-type-btn').forEach(b => b.style.borderColor = 'rgba(184,151,90,0.2)');
      btn.style.borderColor = 'var(--gold)';
      visitType = btn.dataset.type;
      window._apptVisitType = visitType;
    });
  });

  // Step 1 → 2
  document.getElementById('apptNext1')?.addEventListener('click', () => {
    if (!State.user) { closeModal('appointmentModal'); openModal('loginModal'); showToast('Please sign in to book.', '⊘'); return; }
    const name  = document.getElementById('apptName')?.value.trim();
    const store = document.getElementById('apptStore')?.value;
    const date  = document.getElementById('apptDate')?.value;
    const time  = document.getElementById('apptTime')?.value;
    const vt    = window._apptVisitType || visitType;
    if (!name || !store || !date || !time || !vt) {
      showToast('Please fill all fields and select a visit type.', '⊘'); return;
    }
    visitType = vt;
    numVisitors = parseInt(document.getElementById('apptNumVisitors')?.value || 1);
    buildVisitorNames(numVisitors);
    goStep(2);
  });

  // Num visitors change
  document.getElementById('apptNumVisitors')?.addEventListener('change', e => {
    numVisitors = parseInt(e.target.value);
    buildVisitorNames(numVisitors);
  });

  function buildVisitorNames(n) {
    const wrap = document.getElementById('visitorNamesWrap');
    if (!wrap) return;
    wrap.innerHTML = '';
    for (let i = 1; i <= n; i++) {
      const row = document.createElement('div');
      row.className = 'visitor-row';
      row.innerHTML = `<span class="visitor-num">${i}.</span><input class="form-input" placeholder="Visitor ${i} full name" id="visitorName${i}" style="flex:1">`;
      wrap.appendChild(row);
    }
  }

  // Step 2 → 3
  document.getElementById('apptNext2')?.addEventListener('click', () => {
    buildConfirmStep();
    goStep(3);
  });

  // Back buttons
  document.getElementById('apptBack2')?.addEventListener('click', () => goStep(1));
  document.getElementById('apptBack3')?.addEventListener('click', () => goStep(2));

  function buildConfirmStep() {
    const el   = document.getElementById('apptConfirmDetails');
    if (!el)   return;
    const name  = document.getElementById('apptName')?.value;
    const stId  = document.getElementById('apptStore')?.value;
    const store = STORES.find(s => s.id === stId)?.name || stId;
    const date  = document.getElementById('apptDate')?.value;
    const time  = document.getElementById('apptTime')?.value;
    const vt    = window._apptVisitType || visitType;
    const visitors = Array.from({ length: numVisitors }, (_, i) => document.getElementById(`visitorName${i+1}`)?.value || '—').join(', ');
    el.innerHTML = `
      <div class="product-spec"><span class="product-spec-label">Registrant</span><span class="product-spec-value">${name}</span></div>
      <div class="product-spec"><span class="product-spec-label">Visit Type</span><span class="product-spec-value">${vt}</span></div>
      <div class="product-spec"><span class="product-spec-label">Store</span><span class="product-spec-value">${store}</span></div>
      <div class="product-spec"><span class="product-spec-label">Date</span><span class="product-spec-value">${date}</span></div>
      <div class="product-spec"><span class="product-spec-label">Time</span><span class="product-spec-value">${time}</span></div>
      <div class="product-spec"><span class="product-spec-label">Visitors</span><span class="product-spec-value">${visitors}</span></div>`;
  }

  // Submit appointment
  document.getElementById('apptSubmitBtn')?.addEventListener('click', () => {
    const stId = document.getElementById('apptStore')?.value;
    const date = document.getElementById('apptDate')?.value;
    const time = document.getElementById('apptTime')?.value;
    const vt   = window._apptVisitType || visitType;

    const appointments = JSON.parse(localStorage.getItem('co_appointments') || '[]');
    appointments.push({
      userId:      State.user?.email,
      store:       stId,
      date,
      time,
      visitType:   vt,
      numVisitors,
      createdAt:   new Date().toISOString(),
    });
    localStorage.setItem('co_appointments', JSON.stringify(appointments));

    closeModal('appointmentModal');
    showToast('Appointment confirmed. See you soon.', '✦');
    resetApptForm();

    // If opened from reservation flow, finalize reservation now
    if (window._pendingReservationAfterAppt) {
      window._pendingReservationAfterAppt = false;
      finalizeReservation(stId || window._pendingReservationStore);
    }
  });

  // Open appointment from [data-open-appt] triggers
  document.querySelectorAll('[data-open-appt]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (!State.user) { openModal('loginModal'); showToast('Please sign in to book an appointment.', '⊘'); return; }
      openModal('appointmentModal');
      const nameEl = document.getElementById('apptName');
      if (nameEl) nameEl.value = ((State.user.firstName || '') + ' ' + (State.user.lastName || '')).trim();
      // Set min date to tomorrow
      const apptDate = document.getElementById('apptDate');
      if (apptDate && !apptDate.min) {
        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        apptDate.min = tomorrow.toISOString().split('T')[0];
      }
    });
  });
}

// ─── ACCOUNT PAGE ────────────────────────────────────────────
function initAccountPage() {
  document.getElementById('navAccountBtn')?.addEventListener('click', () => {
    if (!State.user) return;
    const mc = document.getElementById('mainContent');
    const pd = document.getElementById('productDetailSection');
    const ac = document.getElementById('accountSection');
    if (mc) mc.style.display = 'none';
    if (pd) pd.classList.remove('open');
    if (ac) ac.style.display = 'block';
    populateAccount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('backFromAccount')?.addEventListener('click', () => {
    const mc = document.getElementById('mainContent');
    const ac = document.getElementById('accountSection');
    if (ac) ac.style.display = 'none';
    if (mc) mc.style.display = 'block';
  });

  document.querySelectorAll('.account-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.account-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const targetId = 'tab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
      document.getElementById(targetId)?.classList.add('active');
    });
  });
}

function populateAccount() {
  if (!State.user) return;
  const u  = State.user;
  const el = document.getElementById('accountProfile');
  if (!el) return;

  el.innerHTML = `
    <div style="margin-bottom:48px">
      <span class="section-label">Profile</span>
      <h2 style="font-family:var(--font-display);font-size:2.5rem;font-weight:300;color:var(--cream);margin-bottom:8px">${u.firstName || ''} ${u.lastName || ''}</h2>
      <span style="font-family:var(--font-body);font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold)">${u.role === 'admin' ? 'Casa Orense Admin' : 'Member'}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:48px">
      ${[['Email',u.email],['Phone',u.phone||'—'],['Location',u.location||'—'],['Gender',u.gender||'—'],['Age',u.age||'—']].map(([k,v])=>`
        <div style="background:var(--off-black);padding:24px 32px">
          <span class="product-spec-label">${k}</span>
          <p style="font-family:var(--font-body);font-size:0.8rem;font-weight:300;color:var(--cream);margin-top:8px">${v}</p>
        </div>`).join('')}
    </div>
    ${u.measurements ? `
      <div style="margin-bottom:48px">
        <span class="section-label">Body Measurements</span>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:24px">
          ${Object.entries(u.measurements).map(([k,v])=>`
            <div style="background:var(--off-black);padding:20px 24px">
              <span class="product-spec-label">${k}</span>
              <p style="font-family:var(--font-display);font-size:1.4rem;font-weight:300;color:var(--cream);margin-top:4px">${v||'—'} cm</p>
            </div>`).join('')}
        </div>
      </div>` : ''}`;

  // Reservations
  const rTab = document.getElementById('tabReservations');
  if (rTab) {
    const allRes = JSON.parse(localStorage.getItem('co_reservations') || '[]').filter(r => r.userId === u.email);
    rTab.innerHTML = allRes.length
      ? allRes.map(r => `
          <div style="background:var(--off-black);padding:28px 32px;margin-bottom:2px;max-width:700px">
            <span style="font-family:var(--font-body);font-size:0.55rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)">${STORES.find(s=>s.id===r.store)?.name||r.store} · ${r.status}</span>
            ${r.items.map(i=>`<p style="font-family:var(--font-display);font-size:1rem;color:var(--cream);margin:8px 0 2px">${i.name} <span style="color:var(--warm-grey);font-family:var(--font-body);font-size:0.65rem;">${formatPrice(i.price)}</span></p>`).join('')}
            <p style="font-family:var(--font-body);font-size:0.55rem;color:var(--ash);margin-top:8px">${new Date(r.createdAt).toLocaleDateString('en-PH', {year:'numeric',month:'long',day:'numeric'})}</p>
          </div>`)
        .join('')
      : '<p style="color:var(--warm-grey);font-family:var(--font-body);font-size:0.7rem;letter-spacing:0.2em">No active reservations.</p>';
  }

  // Appointments
  const aTab = document.getElementById('tabAppointments');
  if (aTab) {
    const apts = JSON.parse(localStorage.getItem('co_appointments') || '[]').filter(a => a.userId === u.email);
    aTab.innerHTML = apts.length
      ? apts.map(a => `
          <div style="background:var(--off-black);padding:28px 32px;margin-bottom:2px;max-width:600px">
            <span style="font-family:var(--font-body);font-size:0.55rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)">${a.visitType}</span>
            <p style="font-family:var(--font-display);font-size:1.2rem;color:var(--cream);margin:8px 0 4px">${STORES.find(s=>s.id===a.store)?.name||a.store}</p>
            <p style="font-family:var(--font-body);font-size:0.65rem;color:var(--warm-grey)">${a.date} at ${a.time} · ${a.numVisitors} visitor(s)</p>
          </div>`)
        .join('')
      : '<p style="color:var(--warm-grey);font-family:var(--font-body);font-size:0.7rem;letter-spacing:0.2em">No appointments booked.</p>';
  }
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoading();
  initNav();
  initHeroVideos();
  initReveal();

  if (document.getElementById('productsGrid')) {
    renderProducts(PRODUCTS);
    initFilters();
  }

  initBasket();
  initAuth();
  initAppointment();
  initAccountPage();

  // Set appointment min date globally
  const apptDate = document.getElementById('apptDate');
  if (apptDate) {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    apptDate.min = tomorrow.toISOString().split('T')[0];
  }

  // Smooth scroll for [data-section] links
  document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});