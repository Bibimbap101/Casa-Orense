// ============================================================
// CASA ORENSE — CATALOG JS
// catalog.js — requires catalog-data.js + main.js loaded first
// ============================================================

const CatalogUI = (() => {

  // ── STATE ──────────────────────────────────────────────────
  let state = {
    activeSection: 'all',
    activeGender: 'all',
    search: '',
    sort: 'default',
    view: '4col',
    selectedSizes: {},
    openProductId: null,
    activeThumbIndex: 0,
  };

  // ── SECTION DEFINITIONS ────────────────────────────────────
  const SECTIONS = {
    // CLOTHES — MEN
    'men-shirts':    { label: 'Shirts',    data: 'men_shirts',    parent: 'Men — Tops',        gender: 'mens',   type: 'clothing' },
    'men-tshirts':   { label: 'T-Shirts',  data: 'men_tshirts',   parent: 'Men — Tops',        gender: 'mens',   type: 'clothing' },
    'men-cardigans': { label: 'Cardigans', data: 'men_cardigans', parent: 'Men — Outerwear',   gender: 'mens',   type: 'clothing' },
    'men-hoodies':   { label: 'Hoodies',   data: 'men_hoodies',   parent: 'Men — Outerwear',   gender: 'mens',   type: 'clothing' },
    'men-jackets':   { label: 'Jackets',   data: 'men_jackets',   parent: 'Men — Outerwear',   gender: 'mens',   type: 'clothing' },
    'men-cargos':    { label: 'Cargos',    data: 'men_cargos',    parent: 'Men — Bottoms',     gender: 'mens',   type: 'clothing' },
    'men-jeans':     { label: 'Jeans',     data: 'men_jeans',     parent: 'Men — Bottoms',     gender: 'mens',   type: 'clothing' },
    'men-shorts':    { label: 'Shorts',    data: 'men_shorts',    parent: 'Men — Bottoms',     gender: 'mens',   type: 'clothing' },
    'men-trousers':  { label: 'Trousers',  data: 'men_trousers',  parent: 'Men — Bottoms',     gender: 'mens',   type: 'clothing' },
    // CLOTHES — WOMEN
    'women-blouses':   { label: 'Blouses',   data: 'women_blouses',   parent: 'Women — Tops',      gender: 'womens', type: 'clothing' },
    'women-shirts':    { label: 'Shirts',    data: 'women_shirts',    parent: 'Women — Tops',      gender: 'womens', type: 'clothing' },
    'women-sleeveless':{ label: 'Sleeveless',data: 'women_sleeveless',parent: 'Women — Tops',      gender: 'womens', type: 'clothing' },
    'women-tshirts':   { label: 'T-Shirts',  data: 'women_tshirts',   parent: 'Women — Tops',      gender: 'womens', type: 'clothing' },
    'women-cardigans': { label: 'Cardigans', data: 'women_cardigans', parent: 'Women — Outerwear', gender: 'womens', type: 'clothing' },
    'women-jackets':   { label: 'Jackets',   data: 'women_jackets',   parent: 'Women — Outerwear', gender: 'womens', type: 'clothing' },
    'women-jeans':     { label: 'Jeans',     data: 'women_jeans',     parent: 'Women — Bottoms',   gender: 'womens', type: 'clothing' },
    'women-shorts':    { label: 'Shorts',    data: 'women_shorts',    parent: 'Women — Bottoms',   gender: 'womens', type: 'clothing' },
    'women-skirts':    { label: 'Skirts',    data: 'women_skirts',    parent: 'Women — Bottoms',   gender: 'womens', type: 'clothing' },
    'women-trousers':  { label: 'Trousers',  data: 'women_trousers',  parent: 'Women — Bottoms',   gender: 'womens', type: 'clothing' },
    // SHOES
    'shoes-mens':    { label: 'Men\'s Shoes',  data: 'shoes_mens',    parent: 'Shoes',             gender: 'mens',   type: 'shoes' },
    'shoes-womens':  { label: 'Women\'s Shoes',data: 'shoes_womens',  parent: 'Shoes',             gender: 'womens', type: 'shoes' },
    // BAGS
    'bags-impress':  { label: 'Impress',    data: 'bags_impress',  parent: 'Bags',              gender: 'all',    type: 'bags' },
    'bags-klasiko':  { label: 'Klasiko',    data: 'bags_klasiko',  parent: 'Bags',              gender: 'all',    type: 'bags' },
    'bags-shine':    { label: 'Shine',      data: 'bags_shine',    parent: 'Bags',              gender: 'all',    type: 'bags' },
  };

  const fallbackBagImg = () => CATALOG._assetUrl('web utilities/bags.jpg');
  const fallbackLibraryImg = () => CATALOG._assetUrl('web utilities/her-library.png');

  // Fallback handler: all product images are .jpg, so go straight to the placeholder.
  // Prevents infinite error loops if the fallback asset itself is missing.
  function handleImgFallback(imgElement, fallbackSource) {
    if (imgElement.src !== fallbackSource) {
      imgElement.src = fallbackSource;
    }
  }

  // ── GET ACTIVE PRODUCTS ────────────────────────────────────
  function getProducts() {
    let sections = Object.entries(SECTIONS);

    // Filter by active section
    if (state.activeSection !== 'all') {
      sections = sections.filter(([key]) => key === state.activeSection);
    }

    // Filter by gender tab
    if (state.activeGender !== 'all') {
      sections = sections.filter(([, meta]) =>
        meta.gender === state.activeGender || meta.gender === 'all'
      );
    }

    // Flatten all products
    let products = sections.flatMap(([sectionKey, meta]) =>
      (CATALOG[meta.data] || []).map(p => ({ ...p, _section: sectionKey, _meta: meta }))
    );

    // Search
    if (state.search) {
      const q = state.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p._meta.label.toLowerCase().includes(q) ||
        p._meta.parent.toLowerCase().includes(q)
      );
    }

    // Sort
    if (state.sort === 'asc')   products.sort((a,b) => a.price - b.price);
    if (state.sort === 'desc')  products.sort((a,b) => b.price - a.price);
    if (state.sort === 'alpha') products.sort((a,b) => a.name.localeCompare(b.name));

    return products;
  }

  // ── RENDER GRID ────────────────────────────────────────────
  function renderGrid() {
    const grid = document.getElementById('catalogGrid');
    const countEl = document.getElementById('catalogCount');
    if (!grid) return;

    const products = getProducts();
    if (countEl) countEl.textContent = products.length + ' Pieces';

    grid.className = `catalog-grid view-${state.view}`;

    if (!products.length) {
      grid.innerHTML = `
        <div class="catalog-empty">
          <span class="catalog-empty-icon">◻</span>
          <span class="catalog-empty-text">No pieces found</span>
        </div>`;
      return;
    }

    // Group by section if showing multiple
    if (state.activeSection === 'all' || !SECTIONS[state.activeSection]) {
      const grouped = {};
      products.forEach(p => {
        const key = p._section;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(p);
      });

      grid.innerHTML = '';
      Object.entries(grouped).forEach(([sectionKey, items]) => {
        const meta = SECTIONS[sectionKey];
        const headerEl = document.createElement('div');
        headerEl.className = 'subcategory-header';
        headerEl.style.gridColumn = '1 / -1';
        headerEl.innerHTML = `
          <h3 class="subcategory-label">${meta.parent} — ${meta.label}</h3>
          <div class="subcategory-line"></div>
          <span class="subcategory-count">${items.length} piece${items.length !== 1 ? 's' : ''}</span>
        `;
        grid.appendChild(headerEl);
        items.forEach(p => grid.appendChild(createCard(p)));
      });
    } else {
      grid.innerHTML = '';
      products.forEach(p => grid.appendChild(createCard(p)));
    }

    // Reveal animation
    requestAnimationFrame(() => {
      grid.querySelectorAll('.catalog-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 40);
      });
    });
  }

  // ── CREATE CARD ────────────────────────────────────────────
  function createCard(product) {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.dataset.id = product.id;

    const flatImg = CATALOG.imgFlat(product.id);
    const modelImg = CATALOG.imgModel(product.id);

    card.innerHTML = `
      <div class="catalog-card-img-wrap">
        <img class="catalog-card-img-flat"
             src="${flatImg}"
             alt="${product.name}"
             onerror="CatalogUI.handleImgFallback(this, CatalogUI.fallbackBagImg())">
        <img class="catalog-card-img-model"
             src="${modelImg}"
             alt="${product.name} on model"
             loading="lazy"
             onerror="CatalogUI.handleImgFallback(this, CatalogUI.fallbackLibraryImg())">
        <span class="catalog-card-swap-label">On Model</span>
        ${product.badge ? `<span class="catalog-card-badge">${product.badge}</span>` : ''}
        <div class="catalog-card-actions">
          <button class="catalog-card-quick-btn" onclick="CatalogUI.openProduct('${product.id}')">View Piece</button>
          <button class="catalog-card-quick-btn icon-only" title="Add to Basket" onclick="addToBasket('${product.id}')">◻</button>
        </div>
      </div>
      <div class="catalog-card-info">
        <span class="catalog-card-category">${product._meta.parent} — ${product._meta.label}</span>
        <h3 class="catalog-card-name">${product.name}</h3>
        <div class="catalog-card-footer">
          <span class="catalog-card-price">${formatPrice(product.price)}</span>
          <div class="catalog-card-sizes">
            <span class="catalog-card-size-dot"></span>
            <span class="catalog-card-size-dot"></span>
            <span class="catalog-card-size-dot"></span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) openProduct(product.id);
    });

    return card;
  }

  // ── OPEN PRODUCT DETAIL MODAL ──────────────────────────────
  function openProduct(id) {
    const product = CATALOG.findById(id);
    if (!product) return;

    const meta = Object.values(SECTIONS).find(s => (CATALOG[s.data] || []).find(p => p.id === id));
    const sizes = CATALOG.getSizes(id);
    const chart = CATALOG.getSizeChart(id);

    const flatImg   = CATALOG.imgFlat(id);
    const modelImg  = CATALOG.imgModel(id);

    // Thumbnails: main + model + 2 extras (use existing assets as fallbacks)
    const extraImgs = [
      CATALOG._assetUrl('web utilities/bags.jpg'),
      CATALOG._assetUrl('web utilities/shoes.jpg')
    ];
    const allImgs = [flatImg, modelImg, ...extraImgs];

    // Size chart rows
    const chartHTML = `
      <table class="size-table">
        <thead>
          <tr>${chart.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${chart.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    // Size buttons
    const sizeHTML = sizes.map((s, i) => {
      const isUnavailable = Math.random() < 0.15; // random availability demo
      return `<button class="size-option${isUnavailable ? ' unavailable' : ''}"
        onclick="CatalogUI.selectSize('${id}','${s}',this)">${s}</button>`;
    }).join('');

    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('productModalOverlay');

    modal.innerHTML = `
      <div class="product-modal-gallery">
        <button class="product-modal-close" onclick="CatalogUI.closeProduct()">✕</button>
        <img class="product-modal-main-img" id="modalMainImg" src="${allImgs[0]}"
             alt="${product.name}" onerror="CatalogUI.handleImgFallback(this, CatalogUI.fallbackBagImg())">
        <div class="product-modal-thumbnails">
          ${allImgs.map((img, i) => {
            // Static default UI assets shouldn't trigger dynamic extension conversion matching loops
            const errorAttr = `onerror="CatalogUI.handleImgFallback(this, CatalogUI.fallbackBagImg())"`;
            return `
              <img class="product-modal-thumb ${i === 0 ? 'active' : ''}"
                   src="${img}"
                   alt="${product.name} view ${i+1}"
                   onclick="CatalogUI.switchThumb('${img}', this)"
                   ${errorAttr}>
            `;
          }).join('')}
        </div>
      </div>
      <div class="product-modal-info">
        <span class="product-modal-eyebrow">${meta ? meta.parent + ' — ' + meta.label : 'Casa Orense'}</span>
        <h2 class="product-modal-name">${product.name}</h2>
        <div class="product-modal-price">${formatPrice(product.price)}</div>
        <p class="product-modal-desc">${product.desc} Each piece is constructed at our Manila atelier with meticulous attention to finish.</p>

        <div class="product-modal-specs">
          <div class="product-modal-spec">
            <span class="product-modal-spec-label">Origin</span>
            <span class="product-modal-spec-value">Atelier Made, Manila</span>
          </div>
          <div class="product-modal-spec">
            <span class="product-modal-spec-label">Season</span>
            <span class="product-modal-spec-value">AW 2025</span>
          </div>
          <div class="product-modal-spec">
            <span class="product-modal-spec-label">Care</span>
            <span class="product-modal-spec-value">Dry Clean Only</span>
          </div>
        </div>

        <div class="size-selector">
          <span class="size-selector-label">Select Size</span>
          <div class="size-options" id="sizeOptions-${id}">${sizeHTML}</div>
        </div>

        <div class="size-chart-section">
          <button class="size-chart-toggle" onclick="CatalogUI.toggleSizeChart(this)">
            <span class="size-chart-toggle-label">Size Chart</span>
            <span class="size-chart-toggle-icon">▾</span>
          </button>
          <div class="size-chart-body">${chartHTML}</div>
        </div>

        <div class="product-modal-actions">
          <button class="btn-reserve-full" onclick="addToBasket('${product.id}')">
            Reserve This Piece ◻
          </button>
          <button class="btn-appt-full" data-open-appt onclick="CatalogUI.closeProduct()">
            Book In-Store Visit
          </button>
          <p class="product-modal-disclaimer">
            Reservation is for in-store pickup only.<br>
            Walk-in visits are not permitted — appointment required.
          </p>
        </div>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    state.openProductId = id;
    state.activeThumbIndex = 0;
  }

  function closeProduct() {
    document.getElementById('productModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    state.openProductId = null;
  }

  function switchThumb(src, thumbEl) {
    const mainImg = document.getElementById('modalMainImg');
    mainImg.src = src;

    document.querySelectorAll('.product-modal-thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }

  function selectSize(productId, size, btn) {
    document.querySelectorAll(`#sizeOptions-${productId} .size-option`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.selectedSizes[productId] = size;
  }

  function toggleSizeChart(btn) {
    btn.classList.toggle('open');
  }

  // ── SIDEBAR CATEGORY CLICK ─────────────────────────────────
  function setSection(key, el) {
    state.activeSection = key;
    document.querySelectorAll('.sidebar-cat').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');

    // Update hero title
    const heroTitle = document.getElementById('catalogHeroTitle');
    const heroCount = document.getElementById('catalogHeroCount');
    if (heroTitle) {
      if (key === 'all') {
        heroTitle.innerHTML = 'The <em>Boutique</em>';
      } else {
        const meta = SECTIONS[key];
        heroTitle.innerHTML = `${meta.parent.split(' — ')[0]} <em>${meta.label}</em>`;
      }
    }

    renderGrid();

    if (heroCount) {
      heroCount.textContent = getProducts().length + ' pieces';
    }

    // Scroll to top of catalog
    document.querySelector('.catalog-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── INIT ───────────────────────────────────────────────────
  function init() {
    // Search
    document.getElementById('catalogSearch')?.addEventListener('input', e => {
      state.search = e.target.value.toLowerCase().trim();
      renderGrid();
    });

    // Sort
    document.getElementById('catalogSort')?.addEventListener('change', e => {
      state.sort = e.target.value;
      renderGrid();
    });

    // View toggles
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.view = btn.dataset.view;
        document.getElementById('catalogGrid').className = `catalog-grid view-${state.view}`;
      });
    });

    // Gender tabs
    document.querySelectorAll('.gender-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.gender-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeGender = tab.dataset.gender;
        renderGrid();
      });
    });

    // Sidebar toggle (collapse)
    document.querySelectorAll('.sidebar-title[data-toggle]').forEach(title => {
      title.addEventListener('click', () => {
        title.closest('.sidebar-section').classList.toggle('collapsed');
      });
    });

    // Parent category toggles
    document.querySelectorAll('.sidebar-cat-parent').forEach(parent => {
      parent.addEventListener('click', () => {
        const children = parent.nextElementSibling;
        if (children) children.classList.toggle('hidden');
        const icon = parent.querySelector('.parent-icon');
        if (icon) icon.style.transform = children?.classList.contains('hidden') ? 'rotate(-90deg)' : '';
      });
    });

    // Close modal on overlay click
    document.getElementById('productModalOverlay')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('productModalOverlay')) closeProduct();
    });

    // ESC to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeProduct();
    });

    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceLabel = document.getElementById('priceLabel');
    if (priceRange) {
      priceRange.addEventListener('input', () => {
        if (priceLabel) priceLabel.textContent = '₱' + parseInt(priceRange.value).toLocaleString('en-PH');
      });
    }

    renderGrid();
  }

  return {
    init,
    setSection,
    openProduct,
    closeProduct,
    switchThumb,
    selectSize,
    toggleSizeChart,
    handleImgFallback,
    fallbackBagImg,
    fallbackLibraryImg
  };
})();

document.addEventListener('DOMContentLoaded', CatalogUI.init);
