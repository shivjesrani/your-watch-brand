/* ================= DATA ================= */
const PRODUCTS = [
  { id:1, name:"Meridian Chrono", cat:"men", price:18500, old:22000, badge:"Best seller", case:"#c9ccd3", dial:"#14161d", strap:"#1d1f27", mark:"#ff7a4d", glow:"rgba(255,122,77,.35)", desc:"A stainless steel chronograph with sapphire crystal and 100 metre water resistance. Built to be worn every day.", specs:[["Movement","Quartz chrono"],["Case","42 mm steel"],["Crystal","Sapphire"],["Water","100 m"]] },
  { id:2, name:"Champagne Heritage", cat:"men", price:24900, old:0, badge:"Signature", case:"#d4b07a", dial:"#1a1510", strap:"#4a2f1d", mark:"#f6e7cf", glow:"rgba(212,176,122,.35)", desc:"Gold-plated case, hand-stitched leather strap and a champagne dial inspired by classical horology.", specs:[["Movement","Automatic"],["Case","40 mm gold steel"],["Crystal","Sapphire"],["Water","30 m"]] },
  { id:3, name:"Rose Petal Slim", cat:"women", price:11900, old:14500, badge:"New", case:"#e0a9a3", dial:"#f6ebe7", strap:"#d7a7a1", mark:"#8a4f4d", glow:"rgba(224,169,163,.35)", desc:"A slim 32 mm case with a mother-of-pearl dial and soft mesh bracelet for effortless elegance.", specs:[["Movement","Quartz"],["Case","32 mm rose steel"],["Crystal","Mineral"],["Bracelet","Mesh"]] },
  { id:4, name:"Pearl Elegance", cat:"women", price:9900, old:0, badge:"", case:"#ece5d8", dial:"#fbf8f2", strap:"#2b2b31", mark:"#9a8560", glow:"rgba(236,229,216,.25)", desc:"A minimalist piece with a pearl dial and soft leather strap, designed to disappear into your day.", specs:[["Movement","Quartz"],["Case","30 mm steel"],["Crystal","Mineral"],["Strap","Leather"]] },
  { id:5, name:"Titan Smart Pro", cat:"smart", price:15900, old:17900, badge:"Smart", case:"#5e6b80", dial:"#0c0e13", strap:"#1f2330", mark:"#7fd1ff", glow:"rgba(127,209,255,.3)", desc:"AMOLED display, heart-rate and SpO2 tracking, built-in GPS and up to ten days of battery life.", specs:[["Display","1.4\" AMOLED"],["Sensors","HR, SpO2"],["Battery","10 days"],["Water","5 ATM"]] },
  { id:6, name:"Pulse Sport GMT", cat:"sport", price:13500, old:0, badge:"Sport", case:"#3f8f6e", dial:"#0e1c16", strap:"#1a2b23", mark:"#c8f5dc", glow:"rgba(63,143,110,.35)", desc:"Dual time zone GMT with a rotating bezel and a durable rubber strap built for the outdoors.", specs:[["Movement","Quartz GMT"],["Case","44 mm steel"],["Bezel","Rotating"],["Water","200 m"]] },
  { id:7, name:"Midnight Skeleton", cat:"men", price:32000, old:0, badge:"Limited", case:"#34343c", dial:"#07070a", strap:"#111116", mark:"#ff7a4d", glow:"rgba(255,122,77,.3)", desc:"An open-heart skeleton dial revealing the movement beneath a domed sapphire crystal. Limited to 200 pieces.", specs:[["Movement","Manual skeleton"],["Case","43 mm PVD steel"],["Crystal","Domed sapphire"],["Edition","200 pcs"]] },
  { id:8, name:"Silver Minimal", cat:"women", price:7500, old:8900, badge:"Sale", case:"#d3d8de", dial:"#f5f5f2", strap:"#55585f", mark:"#3d3f45", glow:"rgba(211,216,222,.25)", desc:"An ultra-thin 6 mm profile with a clean silver dial, made to pair with anything you wear.", specs:[["Movement","Quartz"],["Case","34 mm silver"],["Thickness","6 mm"],["Strap","Mesh"]] }
];
const CATS = { all:"All", men:"Men", women:"Women", smart:"Smart", sport:"Sport" };
const SHIP_FEE = 350, FREE_SHIP_AT = 5000;
const PAY_LABEL = { cod:"Cash on delivery", bank:"Bank transfer", card:"Debit / credit card" };
const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Hyderabad","Multan","Peshawar","Quetta","Other"];
const NAV = [["index.html","Home"],["shop.html","Collection"],["about.html","About"],["contact.html","Contact"]];

/* ================= HELPERS ================= */
const $ = s => document.querySelector(s);
const fmt = n => "PKR " + Number(n).toLocaleString("en-PK");
const findP = id => PRODUCTS.find(p => p.id === id);
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
};
let cart = store.get("yw-cart", []);
let wish = new Set(store.get("yw-wish", []));
const heartSVG = `<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21z"/></svg>`;

/* ================= WATCH ARTWORK ================= */
function watchSVG(p){
  let marks = "";
  for(let i = 0; i < 12; i++){
    const a = i * Math.PI / 6, big = i % 3 === 0;
    const r1 = big ? 50 : 55, r2 = 64;
    marks += `<line x1="${(100 + r1*Math.sin(a)).toFixed(2)}" y1="${(130 - r1*Math.cos(a)).toFixed(2)}" x2="${(100 + r2*Math.sin(a)).toFixed(2)}" y2="${(130 - r2*Math.cos(a)).toFixed(2)}" stroke="${p.mark}" stroke-width="${big ? 3.2 : 1.4}" stroke-linecap="round"/>`;
  }
  const gid = "g" + p.id + Math.random().toString(36).slice(2, 7);
  return `<svg class="watch-svg" viewBox="0 0 200 260" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/>
    </linearGradient></defs>
    <rect x="70" y="2" width="60" height="82" rx="12" fill="${p.strap}"/>
    <rect x="70" y="176" width="60" height="82" rx="12" fill="${p.strap}"/>
    <circle cx="100" cy="130" r="78" fill="${p.case}"/>
    <circle cx="100" cy="130" r="78" fill="url(#${gid})"/>
    <circle cx="100" cy="130" r="70" fill="${p.dial}"/>
    <circle cx="100" cy="130" r="66" fill="none" stroke="${p.mark}" stroke-width=".7" opacity=".45"/>
    ${marks}
    <line x1="100" y1="130" x2="100" y2="84" stroke="${p.mark}" stroke-width="3.2" stroke-linecap="round"/>
    <line x1="100" y1="130" x2="142" y2="136" stroke="${p.mark}" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="100" cy="130" r="4.5" fill="${p.mark}"/>
  </svg>`;
}

/* ================= SHARED HEADER / FOOTER / OVERLAYS ================= */
function injectShell(){
  const page = location.pathname.split("/").pop() || "index.html";
  const hdr = $("#site-header");
  if(hdr){
    hdr.innerHTML = `
    <header class="header">
      <div class="container nav-wrap">
        <a href="index.html" class="logo"><span class="logo-mark"></span>Your Watches</a>
        <nav class="nav" id="nav">
          ${NAV.map(([h, l]) => `<a href="${h}" class="${h === page ? "active" : ""}">${l}</a>`).join("")}
        </nav>
        <div class="nav-actions">
          <button class="pill-btn" id="openSearch" aria-label="Search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          </button>
          <button class="pill-btn" id="openBag" aria-label="Bag">
            <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            <span class="count" id="bagCount">0</span>
          </button>
          <button class="pill-btn burger" id="burger" aria-label="Menu">
            <svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>
          </button>
        </div>
      </div>
    </header>`;
  }
  const ftr = $("#site-footer");
  if(ftr){
    ftr.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div><h4>Your Watches</h4><p>Premium timepieces for people who value every second. Designed in Karachi.</p></div>
        <div><h4>Explore</h4><a href="shop.html">Collection</a><a href="about.html">About</a><a href="contact.html">Contact</a></div>
        <div><h4>Client care</h4><a href="contact.html">Warranty</a><a href="contact.html">Returns</a><a href="contact.html">Shipping</a></div>
        <div><h4>Contact</h4><a href="mailto:support@yourwatches.com">support@yourwatches.com</a><a href="tel:+923001234567">+92 300 1234567</a><p>Clifton Block 5, Karachi</p></div>
      </div>
      <div class="container footer-bottom"><span>© 2026 Your Watches. All rights reserved.</span><span>Cash on delivery · Bank transfer · Cards</span></div>
    </footer>
    <a class="wa" href="https://wa.me/923001234567" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
    </a>`;
  }
  document.body.insertAdjacentHTML("beforeend", `
    <div class="search-overlay" id="searchOverlay">
      <button class="search-close" id="closeSearch">Close ✕</button>
      <div class="search-box">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        <input type="text" id="searchIn" placeholder="Search watches, styles, brands..." autocomplete="off">
      </div>
      <div class="search-results" id="searchResults"></div>
      <div class="search-foot" id="searchFoot"></div>
    </div>
    <div class="scrim" id="scrim"></div>
    <aside class="drawer" id="drawer" aria-label="Shopping bag">
      <div class="drawer-head"><h3>Your bag</h3><button class="close-x" id="closeBag" aria-label="Close">✕</button></div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot" id="drawerFoot"></div>
    </aside>
    <div class="toast" id="toast"></div>`);

  $("#burger").onclick = () => $("#nav").classList.toggle("open");
  $("#openBag").onclick = openBag;
  $("#closeBag").onclick = closeBag;
  $("#scrim").onclick = () => { closeBag(); closeSearch(); };
  $("#openSearch").onclick = openSearch;
  $("#closeSearch").onclick = closeSearch;
  $("#searchIn").oninput = e => renderSearch(e.target.value);
  $("#searchIn").onkeydown = e => {
    if(e.key === "Enter") goShopSearch($("#searchIn").value);
    if(e.key === "Escape") closeSearch();
  };
  $("#searchResults").onclick = e => {
    const r = e.target.closest("[data-product]");
    if(r) location.href = "product.html?id=" + r.dataset.product;
  };
}

/* ================= TOAST ================= */
let toastTimer;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ================= BAG ================= */
function bagCount(){ return cart.reduce((s, i) => s + i.qty, 0); }
function bagTotals(){
  const lines = cart.map(i => ({ ...i, p:findP(i.id) })).filter(l => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIP_AT ? 0 : SHIP_FEE);
  return { lines, subtotal, shipping, total: subtotal + shipping };
}
function persistCart(){ store.set("yw-cart", cart); renderBag(); }
function addToBag(id, qty = 1){
  const item = cart.find(i => i.id === id);
  if(item) item.qty = Math.min(item.qty + qty, 20);
  else cart.push({ id, qty: Math.min(qty, 20) });
  persistCart();
  toast("Added to bag · " + findP(id).name);
}
function changeQty(id, d){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += d;
  if(item.qty < 1) cart = cart.filter(i => i.id !== id);
  persistCart();
  if($("#checkoutWrap")) renderCheckout();
}
function removeItem(id){
  cart = cart.filter(i => i.id !== id);
  persistCart();
  if($("#checkoutWrap")) renderCheckout();
  toast("Removed from bag");
}
function renderBag(){
  const { lines, subtotal, shipping, total } = bagTotals();
  const badge = $("#bagCount");
  if(badge) badge.textContent = bagCount();
  const body = $("#drawerBody"), foot = $("#drawerFoot");
  if(!body) return;
  if(!lines.length){
    body.innerHTML = `<div class="drawer-empty"><div class="big">⌚</div>Your bag is empty.<br><br><a href="shop.html" class="btn btn-ghost">Explore the collection</a></div>`;
    foot.innerHTML = "";
    return;
  }
  body.innerHTML = lines.map(l => `
    <div class="line-item">
      <div class="thumb">${watchSVG(l.p)}</div>
      <div>
        <h5>${l.p.name}</h5>
        <div class="unit">${fmt(l.p.price)} each</div>
        <div class="mini-qty">
          <button onclick="changeQty(${l.id},-1)" aria-label="Decrease">−</button>
          <span>${l.qty}</span>
          <button onclick="changeQty(${l.id},1)" aria-label="Increase">+</button>
        </div>
        <button class="remove" onclick="removeItem(${l.id})">Remove</button>
      </div>
      <div class="sum-price">${fmt(l.p.price * l.qty)}</div>
    </div>`).join("");
  foot.innerHTML = `
    <div class="totals">
      <div><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
      <div><span>Shipping</span><span>${shipping ? fmt(shipping) : "Complimentary"}</span></div>
      <div class="grand"><span>Total</span><span>${fmt(total)}</span></div>
    </div>
    ${shipping ? `<p class="free-note">Add ${fmt(FREE_SHIP_AT - subtotal)} more for free delivery.</p>` : ""}
    <a href="checkout.html" class="btn btn-primary btn-block">Checkout →</a>
    <button class="btn btn-ghost btn-block" onclick="closeBag()">Keep browsing</button>`;
}
function openBag(){ renderBag(); $("#drawer").classList.add("open"); $("#scrim").classList.add("show"); }
function closeBag(){ $("#drawer").classList.remove("open"); $("#scrim").classList.remove("show"); }

/* ================= SEARCH ================= */
function matchSearch(p, q){
  if(!q) return true;
  return (p.name + " " + CATS[p.cat] + " " + p.desc).toLowerCase().includes(q);
}
function openSearch(){
  $("#searchOverlay").classList.add("open");
  $("#searchIn").value = "";
  renderSearch("");
  setTimeout(() => $("#searchIn").focus(), 150);
}
function closeSearch(){ $("#searchOverlay").classList.remove("open"); }
function renderSearch(raw){
  const q = raw.trim().toLowerCase();
  const res = q ? PRODUCTS.filter(p => matchSearch(p, q)) : PRODUCTS.slice(0, 4);
  $("#searchResults").innerHTML = res.length
    ? res.map(p => `
      <div class="sr" data-product="${p.id}">
        <div class="thumb">${watchSVG(p)}</div>
        <div><small>${CATS[p.cat]}</small><h5>${p.name}</h5></div>
        <div class="sum-price">${fmt(p.price)}</div>
      </div>`).join("")
    : `<p class="no-match">No pieces match "${raw.replace(/[<>&"]/g, "")}".</p>`;
  $("#searchFoot").innerHTML = q
    ? `<button class="btn btn-primary" onclick="goShopSearch(document.getElementById('searchIn').value)">View all results</button>`
    : `<p class="search-hint">Try "chrono", "gold", "smart" or "women"</p>`;
}
function goShopSearch(raw){
  location.href = "shop.html?q=" + encodeURIComponent(raw.trim());
}

/* ================= PRODUCT CARD ================= */
function card(p){
  return `
  <article class="card reveal">
    <a href="product.html?id=${p.id}" class="card-img" style="background:radial-gradient(circle at 50% 35%,${p.glow},transparent 60%),linear-gradient(180deg,#1a1e2b,#0c0e15)">
      ${watchSVG(p)}
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
    </a>
    <button class="fav ${wish.has(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="Wishlist" style="top:12px;right:12px">${heartSVG}</button>
    <div class="card-body">
      <span class="cat-tag">${CATS[p.cat]}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
      <button class="btn btn-ghost btn-block" data-add="${p.id}">Add to bag</button>
    </div>
  </article>`;
}
function toggleWish(id){
  wish.has(id) ? wish.delete(id) : wish.add(id);
  store.set("yw-wish", [...wish]);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => b.classList.toggle("on", wish.has(id)));
  toast(wish.has(id) ? "Saved to wishlist" : "Removed from wishlist");
}

/* ================= HOME ================= */
function initHome(){
  if($("#heroWatch")) $("#heroWatch").innerHTML = watchSVG({ id:0, case:"#d9dde4", dial:"#0c0d12", strap:"#1d1f27", mark:"#ff7a4d" });
  if($("#storyWatch")) $("#storyWatch").innerHTML = watchSVG(PRODUCTS[1]);
  if($("#marquee")) $("#marquee").innerHTML = Array(2).fill(
    ["Swiss-inspired movements","Sapphire crystal","Hand-finished cases","Two-year warranty","Free delivery over PKR 5,000"]
    .map(t => `<span>${t}</span>`).join("")).join("");
  document.querySelectorAll("[data-art]").forEach(el => {
    const key = el.dataset.art;
    const p = key === "all" ? PRODUCTS[0] : (PRODUCTS.find(x => x.cat === key) || PRODUCTS[0]);
    el.innerHTML = watchSVG(p);
  });
  if($("#featuredGrid")) $("#featuredGrid").innerHTML = PRODUCTS.slice(0, 4).map(card).join("");
  const nf = $("#newsForm");
  if(nf) nf.onsubmit = e => { e.preventDefault(); toast("You're on the list ✦"); e.target.reset(); };
}

/* ================= SHOP ================= */
function initShop(){
  const grid = $("#productGrid");
  if(!grid) return;
  const params = new URLSearchParams(location.search);
  const state = { cat: params.get("cat") || "all", q: (params.get("q") || "").toLowerCase(), price: "all", sort: "default" };
  $("#shopSearch").value = params.get("q") || "";

  function buildFilters(){
    $("#filters").innerHTML = Object.entries(CATS).map(([k, v]) =>
      `<button class="chip ${state.cat === k ? "active" : ""}" data-cat="${k}">${v}</button>`).join("");
  }
  function draw(){
    buildFilters();
    let list = PRODUCTS.filter(p => {
      const catOk = state.cat === "all" || p.cat === state.cat;
      let priceOk = true;
      if(state.price !== "all"){
        const [lo, hi] = state.price.split("-").map(Number);
        priceOk = p.price >= lo && p.price <= hi;
      }
      return catOk && priceOk && matchSearch(p, state.q);
    });
    if(state.sort === "low")  list.sort((a, b) => a.price - b.price);
    if(state.sort === "high") list.sort((a, b) => b.price - a.price);
    if(state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.map(card).join("");
    $("#emptyMsg").style.display = list.length ? "none" : "block";
    $("#resultCount").textContent = list.length + (list.length === 1 ? " piece" : " pieces");
    observeReveal();
  }
  $("#filters").onclick = e => {
    const b = e.target.closest("[data-cat]");
    if(!b) return;
    state.cat = b.dataset.cat;
    draw();
  };
  $("#shopSearch").oninput = e => { state.q = e.target.value.trim().toLowerCase(); draw(); };
  $("#priceSel").onchange = e => { state.price = e.target.value; draw(); };
  $("#sortSel").onchange = e => { state.sort = e.target.value; draw(); };
  draw();
}

/* ================= PRODUCT PAGE ================= */
function initProduct(){
  const box = $("#productDetail");
  if(!box) return;
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const p = findP(id) || PRODUCTS[0];
  let qty = 1;
  document.title = p.name + " | Your Watches";
  box.innerHTML = `
    <div class="pd-gallery reveal" style="background:radial-gradient(circle at 50% 30%,${p.glow},transparent 55%),linear-gradient(180deg,#1a1e2b,#0c0e15)">
      ${watchSVG(p)}
    </div>
    <div class="pd-info reveal">
      <span class="eyebrow">${CATS[p.cat]} collection</span>
      <h1>${p.name}</h1>
      <div class="pd-price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
      <p class="pd-desc">${p.desc}</p>
      <div class="spec-grid">${p.specs.map(s => `<div class="spec"><small>${s[0]}</small><span>${s[1]}</span></div>`).join("")}</div>
      <div class="buy-row">
        <div class="qty">
          <button id="minus" aria-label="Less">−</button>
          <span id="qtyVal">1</span>
          <button id="plus" aria-label="More">+</button>
        </div>
        <button class="btn btn-primary" id="addBtn">Add to bag</button>
        <button class="round-btn ${wish.has(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="Wishlist">${heartSVG}</button>
      </div>
      <a href="checkout.html" class="btn btn-ghost btn-block" id="buyNow">Buy now</a>
      <ul class="perks">
        <li>Two-year manufacturer warranty</li>
        <li>Complimentary delivery above PKR 5,000</li>
        <li>Seven-day hassle-free returns</li>
        <li>Cash on delivery, bank transfer or card</li>
      </ul>
    </div>`;
  $("#minus").onclick = () => { if(qty > 1) qty--; $("#qtyVal").textContent = qty; };
  $("#plus").onclick  = () => { if(qty < 10) qty++; $("#qtyVal").textContent = qty; };
  $("#addBtn").onclick = () => addToBag(p.id, qty);
  $("#buyNow").onclick = e => { e.preventDefault(); addToBag(p.id, qty); location.href = "checkout.html"; };
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id)
    .concat(PRODUCTS.filter(x => x.cat !== p.cat && x.id !== p.id)).slice(0, 4);
  $("#relatedGrid").innerHTML = related.map(card).join("");
  observeReveal();
}

/* ================= CHECKOUT ================= */
function renderCheckout(){
  const wrap = $("#checkoutWrap");
  const { lines, subtotal, shipping, total } = bagTotals();
  if(!lines.length){
    wrap.innerHTML = `
      <div class="empty-box">
        <div class="big-ic">⌚</div>
        <h2>Your bag is <em>empty</em></h2>
        <p>Add a piece from the collection to continue.</p>
        <a href="shop.html" class="btn btn-primary">Explore the collection</a>
      </div>`;
    return;
  }
  wrap.innerHTML = `
  <div class="checkout">
    <form class="co-form" id="orderForm" novalidate>
      <div class="panel">
        <h3><span>1</span>Contact details</h3>
        <div class="form-grid">
          <div class="fld" data-field="fName"><label>Full name *</label><input name="fullName" placeholder="As on your CNIC"><span class="msg">Please enter your full name.</span></div>
          <div class="fld" data-field="fPhone"><label>Mobile number *</label><input name="phone" placeholder="03XX XXXXXXX"><span class="msg">Enter a valid mobile number (03XXXXXXXXX).</span></div>
          <div class="fld" data-field="fEmail" style="grid-column:1/-1"><label>Email (for confirmation)</label><input name="email" placeholder="you@example.com"><span class="msg">Please enter a valid email.</span></div>
        </div>
      </div>
      <div class="panel">
        <h3><span>2</span>Delivery address</h3>
        <div class="form-grid">
          <div class="fld" data-field="fAddr" style="grid-column:1/-1"><label>Address *</label><input name="address" placeholder="House no., street, area"><span class="msg">Please enter your delivery address (at least 8 characters).</span></div>
          <div class="fld" data-field="fCity"><label>City *</label>
            <select name="city"><option value="">Select city</option>${CITIES.map(c => `<option>${c}</option>`).join("")}</select>
            <span class="msg">Please select your city.</span></div>
          <div class="fld"><label>Postal code</label><input name="postal" placeholder="Optional"></div>
          <div class="fld" style="grid-column:1/-1"><label>Order notes</label><textarea name="notes" placeholder="Gift wrapping, preferred delivery time, etc."></textarea></div>
        </div>
      </div>
      <div class="panel">
        <h3><span>3</span>Payment method</h3>
        <div class="pay-opts">
          <label class="pay"><input type="radio" name="pay" value="cod" checked><div><strong>Cash on delivery</strong><small>Pay in cash when your order arrives.</small></div></label>
          <label class="pay"><input type="radio" name="pay" value="bank"><div><strong>Bank transfer</strong><small>We will share our account details and confirm by WhatsApp.</small></div></label>
          <label class="pay"><input type="radio" name="pay" value="card"><div><strong>Debit or credit card</strong><small>A secure payment link will be sent to your email or phone.</small></div></label>
        </div>
      </div>
      <div class="panel">
        <label class="pay" style="align-items:center">
          <input type="checkbox" name="terms">
          <div><small style="color:var(--text)">I agree to the terms of sale, returns policy and warranty conditions. *</small></div>
        </label>
        <div class="fld" data-field="fTerms" style="margin-top:8px"><span class="msg">Please accept the terms to continue.</span></div>
        <button type="submit" class="btn btn-primary btn-block pay-btn">Place order · ${fmt(total)}</button>
        <p class="form-status" id="orderStatus"></p>
      </div>
    </form>
    <aside class="summary">
      <h3>Order summary</h3>
      ${lines.map(l => `
        <div class="sum-item">
          <div class="thumb">${watchSVG(l.p)}</div>
          <div><h5>${l.p.name}</h5><small>Qty ${l.qty} × ${fmt(l.p.price)}</small></div>
          <div class="sum-price">${fmt(l.p.price * l.qty)}</div>
        </div>`).join("")}
      <div class="totals">
        <div><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        <div><span>Shipping</span><span>${shipping ? fmt(shipping) : "Complimentary"}</span></div>
        <div class="grand"><span>Total</span><span>${fmt(total)}</span></div>
      </div>
      <p class="note">Delivery within 3–5 working days across Pakistan. Our team will call to confirm before dispatch.</p>
    </aside>
  </div>`;
  $("#orderForm").onsubmit = placeOrder;
}
function setErr(field, bad){
  const el = document.querySelector(`[data-field="${field}"]`);
  if(el) el.classList.toggle("err", bad);
}
function placeOrder(e){
  e.preventDefault();
  const f = e.target;
  const v = {
    fullName: f.fullName.value.trim(),
    phone: f.phone.value.replace(/[\s-]/g, ""),
    email: f.email.value.trim(),
    address: f.address.value.trim(),
    city: f.city.value,
    postal: f.postal.value.trim(),
    notes: f.notes.value.trim(),
    pay: f.pay.value,
    terms: f.terms.checked
  };
  const checks = {
    fName: v.fullName.length >= 3,
    fPhone: /^03\d{9}$/.test(v.phone),
    fEmail: v.email === "" || /^\S+@\S+\.\S+$/.test(v.email),
    fAddr: v.address.length >= 8,
    fCity: !!v.city,
    fTerms: v.terms
  };
  let firstBad = null;
  Object.entries(checks).forEach(([k, ok]) => {
    setErr(k, !ok);
    if(!ok && !firstBad) firstBad = k;
  });
  const st = $("#orderStatus");
  if(firstBad){
    st.classList.add("err");
    st.textContent = "Please correct the highlighted fields.";
    document.querySelector(`[data-field="${firstBad}"]`).scrollIntoView({ behavior:"smooth", block:"center" });
    return;
  }
  const { lines, subtotal, shipping, total } = bagTotals();
  const order = {
    orderNo: "YW-" + new Date().getFullYear() + "-" + String(Math.floor(100000 + Math.random() * 900000)),
    ...v, lines, subtotal, shipping, total,
    date: new Date().toLocaleDateString("en-PK", { day:"numeric", month:"long", year:"numeric" })
  };
  store.set("yw-last-order", order);
  cart = [];
  store.set("yw-cart", cart);
  location.href = "success.html";
}

/* ================= SUCCESS ================= */
function initSuccess(){
  const wrap = $("#successWrap");
  if(!wrap) return;
  const o = store.get("yw-last-order", null);
  if(!o){
    wrap.innerHTML = `<div class="empty-box"><div class="big-ic">⌚</div><h2>No recent <em>order</em></h2><p>Your confirmation will appear here after you place an order.</p><a href="shop.html" class="btn btn-primary">Shop now</a></div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="check">✓</div>
    <span class="eyebrow" style="justify-content:center">Thank you, ${o.fullName.split(" ")[0]}</span>
    <h1>Order <em>confirmed</em>.</h1>
    <p>We will call you on ${o.phone} shortly to confirm delivery.</p>
    <div class="order-no">${o.orderNo}</div>
    <div class="success-box">
      <div><span>Order date</span><span>${o.date}</span></div>
      <div><span>Deliver to</span><span>${o.city}</span></div>
      <div><span>Payment</span><span>${PAY_LABEL[o.pay]}</span></div>
      <div><span>Items</span><span>${o.lines.reduce((s, l) => s + l.qty, 0)}</span></div>
      <div><span>Total</span><span style="color:var(--ember);font-weight:700">${fmt(o.total)}</span></div>
    </div>
    <a href="shop.html" class="btn btn-primary">Continue shopping</a>`;
}

/* ================= CONTACT ================= */
function initContact(){
  const form = $("#contactForm");
  if(!form) return;
  form.onsubmit = e => {
    e.preventDefault();
    const okName = form.name.value.trim().length >= 3;
    const okEmail = /^\S+@\S+\.\S+$/.test(form.email.value.trim());
    const okMsg = form.message.value.trim().length >= 5;
    setErr("cName", !okName);
    setErr("cEmail", !okEmail);
    setErr("cMsg", !okMsg);
    const st = $("#contactStatus");
    if(okName && okEmail && okMsg){
      st.classList.remove("err");
      st.textContent = "Thank you. Our concierge will reply within 24 hours.";
      form.reset();
    } else {
      st.classList.add("err");
      st.textContent = "Please complete the highlighted fields.";
    }
  };
}

/* ================= REVEAL ON SCROLL ================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.1 });
function observeReveal(){
  document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
}

/* ================= INIT ================= */
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if(add){ e.preventDefault(); addToBag(Number(add.dataset.add)); return; }
  const fav = e.target.closest("[data-fav]");
  if(fav){ e.preventDefault(); toggleWish(Number(fav.dataset.fav)); }
});

injectShell();
renderBag();
initHome();
initShop();
initProduct();
initContact();
initSuccess();
if($("#checkoutWrap")) renderCheckout();
observeReveal();
