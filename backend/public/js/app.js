/* ==========================================================================
   SmartSpace Booking - Application Logic & Backend API Integration
   ========================================================================== */

class SmartSpaceApp {
  constructor() {
    this.apiBase = '/api';
    this.token = localStorage.getItem('auth_token') || null;
    this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
    this.spaces = [];
    this.filteredSpaces = [];
    this.activeTypeFilter = 'all';
    this.currentBookingSpace = null;
    this.appliedDiscount = 0;
    this.appliedPromoName = '';
    this.html5QrcodeScanner = null;
    this.chartInstance = null;

    this.init();
  }

  async init() {
    this.setupDateDefaults();
    this.updateAuthUI();
    await this.loadSpacesCatalog();
    await this.loadActivePromos();

    if (this.token && this.user) {
      await this.verifySession();
    }
  }

  setupDateDefaults() {
    const today = new Date().toISOString().split('T')[0];
    const widgetDate = document.getElementById('widgetDate');
    const checkoutDate = document.getElementById('checkoutDate');
    if (widgetDate) widgetDate.value = today;
    if (checkoutDate) checkoutDate.value = today;
  }

  /* --------------------------------------------------------------------------
     API Helper Methods
     -------------------------------------------------------------------------- */
  async apiFetch(endpoint, options = {}) {
    const headers = options.headers || {};

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.apiBase}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API Request Failed');
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  /* --------------------------------------------------------------------------
     Auth & Session Management
     -------------------------------------------------------------------------- */
  updateAuthUI() {
    const loggedOutNav = document.getElementById('loggedOutNav');
    const loggedInNav = document.getElementById('loggedInNav');
    const memberLinks = document.querySelectorAll('.auth-only-member');
    const adminLinks = document.querySelectorAll('.auth-only-admin');

    if (this.token && this.user) {
      if (loggedOutNav) loggedOutNav.style.display = 'none';
      if (loggedInNav) loggedInNav.style.display = 'flex';

      const navUserName = document.getElementById('navUserName');
      const navUserRole = document.getElementById('navUserRole');
      const navAvatar = document.getElementById('navAvatar');

      if (navUserName) navUserName.textContent = this.user.username;
      if (navUserRole) navUserRole.textContent = this.user.role === 'admin_space' ? 'Space Admin' : 'Member';
      if (navAvatar) navAvatar.textContent = (this.user.username || 'U').charAt(0).toUpperCase();

      if (this.user.role === 'member') {
        memberLinks.forEach(el => el.style.display = 'block');
        adminLinks.forEach(el => el.style.display = 'none');
      } else if (this.user.role === 'admin_space') {
        memberLinks.forEach(el => el.style.display = 'none');
        adminLinks.forEach(el => el.style.display = 'block');
      }
    } else {
      if (loggedOutNav) loggedOutNav.style.display = 'flex';
      if (loggedInNav) loggedInNav.style.display = 'none';
      memberLinks.forEach(el => el.style.display = 'none');
      adminLinks.forEach(el => el.style.display = 'none');
    }
  }

  async verifySession() {
    try {
      const res = await this.apiFetch('/auth/profile');
      if (res && res.data) {
        this.user = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
        };
        localStorage.setItem('user_data', JSON.stringify(this.user));
        this.updateAuthUI();
      }
    } catch (e) {
      console.warn('Session expired, logging out.');
      this.logout();
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.updateAuthUI();
    this.showSection('spaces');
    this.showToast('You have been signed out.');
  }

  openAuthModal(mode = 'login') {
    this.switchAuthMode(mode);
    this.openModal('authModal');
  }

  switchAuthMode(mode) {
    const title = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const loginTabBtn = document.getElementById('authTabLoginBtn');
    const regTabBtn = document.getElementById('authTabRegisterBtn');
    const regRoleBox = document.getElementById('registerRoleBox');

    if (mode === 'login') {
      title.textContent = 'Welcome Back to SmartSpace';
      submitBtn.textContent = 'Sign In';
      loginTabBtn.classList.add('active');
      regTabBtn.classList.remove('active');
      regRoleBox.style.display = 'none';
      document.getElementById('memberRegisterFields').style.display = 'none';
      document.getElementById('adminRegisterFields').style.display = 'none';
    } else {
      title.textContent = 'Create SmartSpace Account';
      submitBtn.textContent = 'Create Account';
      regTabBtn.classList.add('active');
      loginTabBtn.classList.remove('active');
      regRoleBox.style.display = 'block';
      this.toggleRegisterRoleFields('member');
    }
    this.authMode = mode;
  }

  toggleRegisterRoleFields(role) {
    const memberFields = document.getElementById('memberRegisterFields');
    const adminFields = document.getElementById('adminRegisterFields');
    if (role === 'member') {
      memberFields.style.display = 'block';
      adminFields.style.display = 'none';
    } else {
      memberFields.style.display = 'none';
      adminFields.style.display = 'block';
    }
  }

  async handleAuthSubmit(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('authUsername').value.trim();
    const passwordInput = document.getElementById('authPassword').value;

    try {
      if (this.authMode === 'login') {
        const payload = usernameInput.includes('@')
          ? { email: usernameInput, password: passwordInput }
          : { username: usernameInput, password: passwordInput };

        const res = await this.apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        if (res && res.data && res.data.access_token) {
          this.token = res.data.access_token;
          this.user = res.data.user;
          localStorage.setItem('auth_token', this.token);
          localStorage.setItem('user_data', JSON.stringify(this.user));
          this.updateAuthUI();
          this.closeModal('authModal');
          this.showToast(`Welcome back, ${this.user.username}!`);

          if (this.user.role === 'admin_space') {
            this.showSection('admin');
          } else {
            this.showSection('spaces');
          }
        }
      } else {
        // Registration
        const role = document.querySelector('input[name="registerRole"]:checked').value;
        if (role === 'member') {
          const payload = {
            username: usernameInput,
            email: document.getElementById('regEmail').value.trim(),
            password: passwordInput,
            nama_member: document.getElementById('regFullName').value.trim() || usernameInput,
            instansi: document.getElementById('regInstansi').value.trim() || 'General Member',
            alamat: document.getElementById('regAlamat').value.trim() || 'Malang',
            telp: document.getElementById('regTelp').value.trim() || '081234567890',
          };
          const res = await this.apiFetch('/auth/register/member', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          if (res && res.data && res.data.access_token) {
            this.token = res.data.access_token;
            this.user = res.data.user;
            localStorage.setItem('auth_token', this.token);
            localStorage.setItem('user_data', JSON.stringify(this.user));
            this.updateAuthUI();
            this.closeModal('authModal');
            this.showToast('Member account created successfully!');
          }
        } else {
          // Admin registration
          const payload = {
            username: usernameInput,
            email: document.getElementById('regEmail') ? document.getElementById('regEmail').value.trim() : `${usernameInput}@smartspace.com`,
            password: passwordInput,
            nama_coworking: document.getElementById('regCoworkingName').value.trim() || 'Smart Space Branch',
            nama_pemilik: document.getElementById('regOwnerName').value.trim() || 'Owner Name',
            telp: '081234567890',
          };
          const res = await this.apiFetch('/auth/register/admin-space', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          if (res && res.data && res.data.access_token) {
            this.token = res.data.access_token;
            this.user = res.data.user;
            localStorage.setItem('auth_token', this.token);
            localStorage.setItem('user_data', JSON.stringify(this.user));
            this.updateAuthUI();
            this.closeModal('authModal');
            this.showToast('Space Owner account registered successfully!');
            this.showSection('admin');
          }
        }
      }
    } catch (err) {
      this.showToast(err.message || 'Authentication error', 'error');
    }
  }

  toggleUserMenu() {
    if (confirm(`Logged in as ${this.user.username} (${this.user.role}). Sign out?`)) {
      this.logout();
    }
  }

  /* --------------------------------------------------------------------------
     Navigation & Section Routing
     -------------------------------------------------------------------------- */
  showSection(sectionId) {
    const hero = document.getElementById('heroSection');
    const searchWidget = document.querySelector('.search-widget-section');
    const spaces = document.getElementById('spaces');
    const amenities = document.getElementById('amenities');
    const promos = document.getElementById('promos');
    const myBookings = document.getElementById('my-bookings');
    const admin = document.getElementById('admin');

    // Reset visibility
    if (myBookings) myBookings.style.display = 'none';
    if (admin) admin.style.display = 'none';

    if (sectionId === 'my-bookings') {
      if (hero) hero.style.display = 'none';
      if (searchWidget) searchWidget.style.display = 'none';
      if (spaces) spaces.style.display = 'none';
      if (amenities) amenities.style.display = 'none';
      if (promos) promos.style.display = 'none';
      if (myBookings) myBookings.style.display = 'block';
      this.loadMemberBookings();
    } else if (sectionId === 'admin') {
      if (hero) hero.style.display = 'none';
      if (searchWidget) searchWidget.style.display = 'none';
      if (spaces) spaces.style.display = 'none';
      if (amenities) amenities.style.display = 'none';
      if (promos) promos.style.display = 'none';
      if (admin) admin.style.display = 'block';
      this.loadAdminDashboard();
    } else {
      if (hero) hero.style.display = 'block';
      if (searchWidget) searchWidget.style.display = 'block';
      if (spaces) spaces.style.display = 'block';
      if (amenities) amenities.style.display = 'block';
      if (promos) promos.style.display = 'block';

      if (sectionId && document.getElementById(sectionId)) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Update nav links active class
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Catalog & Spaces Showcase
     -------------------------------------------------------------------------- */
  async loadSpacesCatalog() {
    try {
      const res = await this.apiFetch('/spaces');
      if (res && res.data) {
        this.spaces = res.data;
        this.filteredSpaces = [...this.spaces];
        this.renderCatalog();

        const statTotal = document.getElementById('statTotalSpaces');
        if (statTotal) statTotal.textContent = `${this.spaces.length}+`;

        const liveText = document.getElementById('liveStatusText');
        if (liveText) liveText.textContent = `${this.spaces.length} Spaces Available Today`;
      }
    } catch (e) {
      console.error('Failed to load spaces:', e);
    }
  }

  filterCatalog(type, btnElement) {
    this.activeTypeFilter = type;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (type === 'all') {
      this.filteredSpaces = [...this.spaces];
    } else {
      this.filteredSpaces = this.spaces.filter(s => s.tipe === type);
    }
    this.renderCatalog();
  }

  handleCatalogSearch(keyword) {
    const term = keyword.toLowerCase().trim();
    this.filteredSpaces = this.spaces.filter(s => {
      const matchesType = this.activeTypeFilter === 'all' || s.tipe === this.activeTypeFilter;
      const matchesText = s.nama_space.toLowerCase().includes(term) || (s.deskripsi && s.deskripsi.toLowerCase().includes(term));
      return matchesType && matchesText;
    });
    this.renderCatalog();
  }

  renderCatalog() {
    const grid = document.getElementById('spacesGrid');
    if (!grid) return;

    if (this.filteredSpaces.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
          <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
          <h3>No spaces found matching your search.</h3>
        </div>
      `;
      return;
    }

    const defaultImages = {
      desk: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop',
      meeting_room: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop',
      private_office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    };

    grid.innerHTML = this.filteredSpaces.map(s => {
      const imgSrc = s.foto ? (s.foto.startsWith('http') ? s.foto : `/uploads/${s.foto}`) : defaultImages[s.tipe];
      const typeLabel = s.tipe === 'desk' ? 'Personal Desk' : s.tipe === 'meeting_room' ? 'Meeting Room' : 'Private Office';
      const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(s.harga_per_jam);

      return `
        <div class="space-card">
          <div class="space-card-img">
            <img src="${imgSrc}" alt="${s.nama_space}">
            <div class="space-card-badge">${typeLabel}</div>
            <div class="space-card-capacity"><i class="fa-solid fa-user-group"></i> ${s.kapasitas} ${s.kapasitas > 1 ? 'People' : 'Person'}</div>
          </div>
          <div class="space-card-body">
            <div class="space-location"><i class="fa-solid fa-location-dot"></i> ${s.kota || 'Malang'}</div>
            <h3 class="space-name">${s.nama_space}</h3>
            <p class="space-desc">${s.deskripsi}</p>
            <div class="space-card-footer">
              <div class="space-price">
                <span class="price-amount">${formattedPrice}</span>
                <span class="price-unit">per hour</span>
              </div>
              <button class="btn btn-accent btn-sm" onclick="app.openBookingModal(${s.id})"><i class="fa-solid fa-arrow-right"></i> Reserve</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  async handleSearchWidget(e) {
    e.preventDefault();
    const type = document.getElementById('widgetType').value;
    const date = document.getElementById('widgetDate').value;
    const time = document.getElementById('widgetTime').value;
    const duration = document.getElementById('widgetDuration').value;

    this.showSection('spaces');

    if (type) {
      const tabBtn = document.querySelector(`.tab-btn[data-type="${type}"]`);
      this.filterCatalog(type, tabBtn);
    }

    this.showToast(`Found available spaces for ${date} at ${time}`);
  }

  /* --------------------------------------------------------------------------
     Promotions Loading
     -------------------------------------------------------------------------- */
  async loadActivePromos() {
    try {
      const res = await this.apiFetch('/diskon/active');
      if (res && res.data && res.data.length > 0) {
        const container = document.getElementById('promosContainer');
        if (container) {
          container.innerHTML = res.data.map(p => `
            <div class="promo-code-box">
              <div>
                <div style="font-size: 0.78rem; color: var(--text-light-muted);">${p.persentase_diskon}% DISCOUNT</div>
                <div class="code-text">${p.nama_diskon}</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="app.copyPromo('${p.nama_diskon}')"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('Could not load active promos:', e);
    }
  }

  copyPromo(code) {
    navigator.clipboard.writeText(code);
    this.showToast(`Promo code '${code}' copied to clipboard!`);
  }

  /* --------------------------------------------------------------------------
     Booking Multi-Step Checkout Modal
     -------------------------------------------------------------------------- */
  openBookingModal(spaceId) {
    if (!this.token) {
      this.showToast('Please sign in to make a space reservation.', 'error');
      this.openAuthModal('login');
      return;
    }

    const space = this.spaces.find(s => s.id === spaceId);
    if (!space) return;

    this.currentBookingSpace = space;
    this.appliedDiscount = 0;
    this.appliedPromoName = '';

    document.getElementById('checkoutSpaceId').value = space.id;
    document.getElementById('bookingSpaceName').textContent = space.nama_space;
    document.getElementById('bookingSpaceLocation').textContent = space.kota || 'Malang';
    document.getElementById('bookingSpaceCapacity').innerHTML = `<i class="fa-solid fa-users"></i> ${space.kapasitas} Person(s)`;

    const defaultImages = {
      desk: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop',
      meeting_room: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop',
      private_office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    };
    const imgSrc = space.foto ? (space.foto.startsWith('http') ? space.foto : `/uploads/${space.foto}`) : defaultImages[space.tipe];
    document.getElementById('bookingSpaceImg').src = imgSrc;

    const formattedRate = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(space.harga_per_jam);
    document.getElementById('bookingSpacePrice').textContent = `${formattedRate} / hr`;

    this.verifySlotAvailability();
    this.openModal('bookingModal');
  }

  async verifySlotAvailability() {
    if (!this.currentBookingSpace) return;

    const date = document.getElementById('checkoutDate').value;
    const time = document.getElementById('checkoutTime').value;
    const duration = document.getElementById('checkoutDuration').value;

    const badge = document.getElementById('slotCheckBadge');

    try {
      const res = await this.apiFetch(`/spaces/availability?id_space=${this.currentBookingSpace.id}&tanggal=${date}&jam_mulai=${time}&durasi_jam=${duration}`);
      if (res && res.data) {
        if (res.data.available) {
          badge.className = 'slot-badge available';
          badge.style.background = 'var(--accent-sage-light)';
          badge.style.color = 'var(--accent-sage)';
          badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Conflict-free! This space is completely available.';
        } else {
          badge.className = 'slot-badge unavailable';
          badge.style.background = 'var(--status-red-light)';
          badge.style.color = 'var(--status-red)';
          badge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Warning: Time slot overlaps with an existing booking.';
        }
      }
    } catch (e) {
      console.warn('Availability check failed:', e);
    }

    this.calculateTotalPrice();
  }

  async applyPromoCode() {
    const code = document.getElementById('checkoutPromoCode').value.trim();
    const feedback = document.getElementById('promoFeedback');

    if (!code) return;

    try {
      const res = await this.apiFetch('/diskon/check', {
        method: 'POST',
        body: JSON.stringify({ nama_diskon: code }),
      });

      if (res && res.data) {
        this.appliedDiscount = res.data.persentase_diskon;
        this.appliedPromoName = res.data.nama_diskon;
        feedback.style.color = 'var(--status-green)';
        feedback.textContent = `✓ Promo applied! ${res.data.persentase_diskon}% discount activated.`;
        this.calculateTotalPrice();
      }
    } catch (err) {
      this.appliedDiscount = 0;
      this.appliedPromoName = '';
      feedback.style.color = 'var(--status-red)';
      feedback.textContent = err.message || 'Invalid or expired promo code.';
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    if (!this.currentBookingSpace) return;

    const duration = parseInt(document.getElementById('checkoutDuration').value, 10) || 1;
    const rate = this.currentBookingSpace.harga_per_jam;
    const subtotal = rate * duration;
    const discountAmount = (subtotal * this.appliedDiscount) / 100;
    const total = subtotal - discountAmount;

    document.getElementById('calcHours').textContent = duration;
    document.getElementById('calcRate').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(rate);
    document.getElementById('calcSubtotal').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(subtotal);

    const discountRow = document.getElementById('calcDiscountRow');
    if (this.appliedDiscount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('calcDiscount').textContent = `- ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(discountAmount)} (${this.appliedDiscount}%)`;
    } else {
      discountRow.style.display = 'none';
    }

    document.getElementById('calcTotal').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);
  }

  async handleBookingSubmit(e) {
    e.preventDefault();
    if (!this.currentBookingSpace) return;

    const spaceId = this.currentBookingSpace.id;
    const date = document.getElementById('checkoutDate').value;
    const time = document.getElementById('checkoutTime').value;
    const duration = document.getElementById('checkoutDuration').value;

    let query = `?id_space=${spaceId}&tanggal_reservasi=${date}&jam_mulai=${time}&durasi_jam=${duration}`;
    if (this.appliedPromoName) {
      query += `&nama_diskon=${encodeURIComponent(this.appliedPromoName)}`;
    }

    try {
      const res = await this.apiFetch(`/reservasi${query}`, {
        method: 'POST',
      });

      if (res && res.data) {
        this.closeModal('bookingModal');
        this.showToast('Reservation created successfully!');
        this.openETicketModal(res.data.id);
      }
    } catch (err) {
      this.showToast(err.message || 'Failed to create reservation.', 'error');
    }
  }

  /* --------------------------------------------------------------------------
     Digital E-Ticket Generation
     -------------------------------------------------------------------------- */
  async openETicketModal(bookingId) {
    try {
      const res = await this.apiFetch(`/reservasi/${bookingId}/e-ticket`);
      if (res && res.data) {
        const ticket = res.data;
        document.getElementById('ticketBookingCode').textContent = ticket.kode_booking;
        document.getElementById('ticketSpaceName').textContent = ticket.space_name;
        document.getElementById('ticketMemberName').innerHTML = `<i class="fa-solid fa-user"></i> ${ticket.member_name}`;
        document.getElementById('ticketDate').textContent = ticket.tanggal_reservasi;
        document.getElementById('ticketTime').textContent = `${ticket.jam_mulai} (${ticket.durasi_jam} hrs)`;
        document.getElementById('ticketStatus').textContent = ticket.status.toUpperCase();
        document.getElementById('ticketTotal').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(ticket.total_bayar);

        // Generate QR Code into container
        const qrContainer = document.getElementById('qrcodeCanvas');
        qrContainer.innerHTML = '';
        if (window.QRCode) {
          new QRCode(qrContainer, {
            text: ticket.qr_payload || ticket.kode_booking,
            width: 180,
            height: 180,
            colorDark: "#191A1D",
            colorLight: "#ffffff",
          });
        }

        this.openModal('ticketModal');
      }
    } catch (err) {
      this.showToast('Could not load E-Ticket details.', 'error');
    }
  }

  /* --------------------------------------------------------------------------
     Member Dashboard Logic
     -------------------------------------------------------------------------- */
  async loadMemberBookings() {
    const list = document.getElementById('memberBookingsList');
    if (!list) return;

    try {
      const res = await this.apiFetch('/reservasi/my');
      if (res && res.data) {
        if (res.data.length === 0) {
          list.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
              <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
              <h3>No active space reservations found.</h3>
              <button class="btn btn-accent btn-sm" onclick="app.showSection('spaces')" style="margin-top: 1rem;">Browse Spaces</button>
            </div>
          `;
          return;
        }

        list.innerHTML = res.data.map(b => {
          const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(b.total_bayar);
          const dateFormatted = new Date(b.tanggal_reservasi).toISOString().split('T')[0];

          return `
            <div class="space-card" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <span class="booking-status-badge status-${b.status}">${b.status.replace('_', ' ')}</span>
                  <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); margin-top: 0.4rem;">${b.kode_booking}</div>
                </div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-wood);">${formattedTotal}</div>
              </div>

              <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem;">${b.space ? b.space.nama_space : 'Space Reservation'}</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                <i class="fa-regular fa-calendar"></i> ${dateFormatted} &bull; <i class="fa-regular fa-clock"></i> ${b.jam_mulai} (${b.durasi_jam} hrs)
              </p>

              <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem; margin-top: auto;">
                <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="app.openETicketModal(${b.id})"><i class="fa-solid fa-qrcode"></i> View E-Ticket</button>
                ${(b.status === 'belum_dikonfirm' || b.status === 'disetujui') ? `<button class="btn btn-ghost btn-sm" style="color: var(--status-red);" onclick="app.cancelBooking(${b.id})">Cancel</button>` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    } catch (err) {
      console.error('Error loading member bookings:', err);
    }
  }

  async cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      await this.apiFetch(`/reservasi/${bookingId}/cancel`, { method: 'PATCH' });
      this.showToast('Reservation cancelled successfully.');
      this.loadMemberBookings();
    } catch (err) {
      this.showToast(err.message || 'Failed to cancel reservation.', 'error');
    }
  }

  switchMemberTab(tab, btn) {
    document.querySelectorAll('#my-bookings .btn-ghost').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (tab === 'active') {
      document.getElementById('memberTabActive').style.display = 'block';
      document.getElementById('memberTabHistory').style.display = 'none';
      this.loadMemberBookings();
    } else {
      document.getElementById('memberTabActive').style.display = 'none';
      document.getElementById('memberTabHistory').style.display = 'block';
      this.loadMemberHistory();
    }
  }

  async loadMemberHistory() {
    const month = document.getElementById('historyMonth').value;
    const year = document.getElementById('historyYear').value;

    try {
      const res = await this.apiFetch(`/reservasi/my/history?month=${month}&year=${year}`);
      if (res && res.data) {
        const total = res.data.total_pengeluaran || 0;
        document.getElementById('historySummaryBox').textContent = `Total Monthly Spending: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}`;

        const container = document.getElementById('historyTableContainer');
        if (res.data.reservasi.length === 0) {
          container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No reservation records for this month.</p>';
          return;
        }

        container.innerHTML = `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted);">
                <th style="padding: 0.75rem;">Kode Booking</th>
                <th style="padding: 0.75rem;">Space</th>
                <th style="padding: 0.75rem;">Tanggal</th>
                <th style="padding: 0.75rem;">Durasi</th>
                <th style="padding: 0.75rem;">Total</th>
                <th style="padding: 0.75rem;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${res.data.reservasi.map(r => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-family: var(--font-mono);">${r.kode_booking}</td>
                  <td style="padding: 0.75rem; font-weight: 600;">${r.space ? r.space.nama_space : '-'}</td>
                  <td style="padding: 0.75rem;">${new Date(r.tanggal_reservasi).toISOString().split('T')[0]}</td>
                  <td style="padding: 0.75rem;">${r.durasi_jam} jam</td>
                  <td style="padding: 0.75rem; font-weight: 700; color: var(--accent-wood);">${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(r.total_bayar)}</td>
                  <td style="padding: 0.75rem;"><span class="booking-status-badge status-${r.status}">${r.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  }

  /* --------------------------------------------------------------------------
     Admin Portal & Space Management
     -------------------------------------------------------------------------- */
  async loadAdminDashboard() {
    if (!this.user || this.user.role !== 'admin_space') {
      this.showToast('Access denied: Space Owner privilege required.', 'error');
      this.showSection('spaces');
      return;
    }

    await this.loadAdminKPIs();
    await this.loadAdminReservations();
    await this.loadAdminSpaces();
    await this.loadAdminPromos();
    await this.loadAdminChart();
  }

  async loadAdminKPIs() {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const [reportRes, spacesRes, membersRes] = await Promise.all([
        this.apiFetch(`/admin/reports/monthly?month=${month}&year=${year}`),
        this.apiFetch('/admin/spaces'),
        this.apiFetch('/admin/members'),
      ]);

      if (reportRes && reportRes.data) {
        const rev = reportRes.data.realisasi_pendapatan || 0;
        document.getElementById('kpiRevenue').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(rev);
        document.getElementById('kpiTotalBookings').textContent = reportRes.data.total_reservasi || 0;
      }

      if (spacesRes && spacesRes.data) {
        document.getElementById('kpiActiveSpaces').textContent = spacesRes.data.length;
      }

      if (membersRes && membersRes.data) {
        document.getElementById('kpiMembers').textContent = membersRes.data.length;
      }
    } catch (err) {
      console.error('KPI fetch error:', err);
    }
  }

  async loadAdminReservations() {
    const list = document.getElementById('adminReservationsList');
    if (!list) return;

    try {
      const res = await this.apiFetch('/admin/reservasi');
      if (res && res.data) {
        if (res.data.length === 0) {
          list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No reservation records found.</p>';
          return;
        }

        list.innerHTML = `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted);">
                <th style="padding: 0.75rem;">Booking Code</th>
                <th style="padding: 0.75rem;">Member</th>
                <th style="padding: 0.75rem;">Space</th>
                <th style="padding: 0.75rem;">Date & Time</th>
                <th style="padding: 0.75rem;">Total</th>
                <th style="padding: 0.75rem;">Status</th>
                <th style="padding: 0.75rem;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${res.data.map(r => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700;">${r.kode_booking}</td>
                  <td style="padding: 0.75rem;">${r.member ? r.member.nama_member : 'Guest'}</td>
                  <td style="padding: 0.75rem; font-weight: 600;">${r.space ? r.space.nama_space : '-'}</td>
                  <td style="padding: 0.75rem;">${new Date(r.tanggal_reservasi).toISOString().split('T')[0]} @ ${r.jam_mulai}</td>
                  <td style="padding: 0.75rem; font-weight: 700; color: var(--accent-wood);">${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(r.total_bayar)}</td>
                  <td style="padding: 0.75rem;"><span class="booking-status-badge status-${r.status}">${r.status}</span></td>
                  <td style="padding: 0.75rem;">
                    <div style="display: flex; gap: 0.4rem;">
                      ${r.status === 'belum_dikonfirm' ? `
                        <button class="btn btn-accent btn-sm" onclick="app.updateReservationStatus(${r.id}, 'disetujui')">Approve</button>
                        <button class="btn btn-ghost btn-sm" style="color: var(--status-red);" onclick="app.updateReservationStatus(${r.id}, 'dibatalkan')">Reject</button>
                      ` : r.status === 'disetujui' ? `
                        <button class="btn btn-primary btn-sm" onclick="app.checkInReservation(${r.id})">Check-In</button>
                      ` : r.status === 'aktif' ? `
                        <button class="btn btn-secondary btn-sm" onclick="app.checkOutReservation(${r.id})">Check-Out</button>
                      ` : '-'}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    } catch (err) {
      console.error('Error loading admin reservations:', err);
    }
  }

  async updateReservationStatus(id, status) {
    try {
      await this.apiFetch(`/admin/reservasi/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      this.showToast(`Reservation status updated to ${status}`);
      this.loadAdminDashboard();
    } catch (err) {
      this.showToast(err.message || 'Status update failed.', 'error');
    }
  }

  async checkInReservation(id) {
    try {
      await this.apiFetch(`/admin/reservasi/${id}/check-in`, { method: 'PATCH' });
      this.showToast('Member checked in successfully!');
      this.loadAdminDashboard();
    } catch (err) {
      this.showToast(err.message || 'Check-in failed.', 'error');
    }
  }

  async checkOutReservation(id) {
    try {
      await this.apiFetch(`/admin/reservasi/${id}/check-out`, { method: 'PATCH' });
      this.showToast('Member checked out!');
      this.loadAdminDashboard();
    } catch (err) {
      this.showToast(err.message || 'Check-out failed.', 'error');
    }
  }

  switchAdminTab(tab, btn) {
    document.querySelectorAll('#admin .btn-ghost').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const tabs = ['Reservations', 'Spaces', 'Promos', 'Reports'];
    tabs.forEach(t => {
      const el = document.getElementById(`adminTab${t}`);
      if (el) el.style.display = t.toLowerCase() === tab.toLowerCase() ? 'block' : 'none';
    });

    if (tab === 'reports') {
      this.loadAdminChart();
    }
  }

  async loadAdminSpaces() {
    const grid = document.getElementById('adminSpacesGrid');
    if (!grid) return;

    try {
      const res = await this.apiFetch('/admin/spaces');
      if (res && res.data) {
        grid.innerHTML = res.data.map(s => `
          <div class="space-card" style="padding: 1.5rem;">
            <div style="font-weight: 800; color: var(--accent-wood); font-size: 0.8rem; text-transform: uppercase;">${s.tipe}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem;">${s.nama_space}</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.8rem;">${s.kota || 'Malang'} &bull; ${s.kapasitas} Person(s)</p>
            <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(s.harga_per_jam)} / hr</div>
            <div style="display: flex; gap: 0.5rem; margin-top: auto;">
              <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="app.deleteSpace(${s.id})"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
          </div>
        `).join('');
      }
    } catch (err) {
      console.error('Error loading admin spaces:', err);
    }
  }

  openAddSpaceModal() {
    document.getElementById('spaceFormId').value = '';
    document.getElementById('spaceForm').reset();
    document.getElementById('spaceFormTitle').textContent = 'Add New Space';
    this.openModal('spaceFormModal');
  }

  async handleSpaceFormSubmit(e) {
    e.preventDefault();
    const payload = {
      nama_space: document.getElementById('spaceFormName').value.trim(),
      tipe: document.getElementById('spaceFormType').value,
      kapasitas: Number(document.getElementById('spaceFormCapacity').value),
      harga_per_jam: Number(document.getElementById('spaceFormRate').value),
      kota: document.getElementById('spaceFormKota').value.trim(),
      jalan: document.getElementById('spaceFormJalan').value.trim(),
      deskripsi: document.getElementById('spaceFormDesc').value.trim(),
    };

    try {
      await this.apiFetch('/admin/spaces', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      this.showToast('Space created successfully!');
      this.closeModal('spaceFormModal');
      this.loadSpacesCatalog();
      this.loadAdminDashboard();
    } catch (err) {
      this.showToast(err.message || 'Failed to create space.', 'error');
    }
  }

  async deleteSpace(id) {
    if (!confirm('Are you sure you want to delete this space listing?')) return;
    try {
      await this.apiFetch(`/admin/spaces/${id}`, { method: 'DELETE' });
      this.showToast('Space deleted successfully.');
      this.loadSpacesCatalog();
      this.loadAdminDashboard();
    } catch (err) {
      this.showToast(err.message || 'Failed to delete space.', 'error');
    }
  }

  async loadAdminPromos() {
    const container = document.getElementById('adminPromosList');
    if (!container) return;

    try {
      const res = await this.apiFetch('/admin/diskon');
      if (res && res.data) {
        container.innerHTML = `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted);">
                <th style="padding: 0.75rem;">Promo Code</th>
                <th style="padding: 0.75rem;">Discount %</th>
                <th style="padding: 0.75rem;">Valid Period</th>
                <th style="padding: 0.75rem;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${res.data.map(p => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--accent-wood);">${p.nama_diskon}</td>
                  <td style="padding: 0.75rem; font-weight: 700;">${p.persentase_diskon}%</td>
                  <td style="padding: 0.75rem;">${new Date(p.tanggal_awal).toISOString().split('T')[0]} to ${new Date(p.tanggal_akhir).toISOString().split('T')[0]}</td>
                  <td style="padding: 0.75rem;">
                    <button class="btn btn-ghost btn-sm" style="color: var(--status-red);" onclick="app.deletePromo(${p.id})">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    } catch (err) {
      console.error('Error loading promos:', err);
    }
  }

  openAddPromoModal() {
    const code = prompt('Enter new promo code (e.g. SPECIAL15):');
    if (!code) return;
    const percent = prompt('Enter discount percentage (e.g. 15):');
    if (!percent) return;

    const now = new Date();
    const end = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

    this.apiFetch('/admin/diskon', {
      method: 'POST',
      body: JSON.stringify({
        nama_diskon: code.toUpperCase().trim(),
        persentase_diskon: Number(percent),
        tanggal_awal: now.toISOString(),
        tanggal_akhir: end.toISOString(),
      }),
    }).then(() => {
      this.showToast('Promo code created successfully!');
      this.loadAdminPromos();
    }).catch(err => {
      this.showToast(err.message || 'Failed to create promo.', 'error');
    });
  }

  async deletePromo(id) {
    if (!confirm('Delete promo code?')) return;
    try {
      await this.apiFetch(`/admin/diskon/${id}`, { method: 'DELETE' });
      this.showToast('Promo code deleted.');
      this.loadAdminPromos();
    } catch (err) {
      this.showToast(err.message || 'Failed to delete promo.', 'error');
    }
  }

  async loadAdminChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const res = await this.apiFetch(`/admin/reports/monthly?month=${month}&year=${year}`);
      if (res && res.data) {
        const est = res.data.estimasi_pendapatan || 0;
        const real = res.data.realisasi_pendapatan || 0;

        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['September 2026 Revenue Realization'],
            datasets: [
              {
                label: 'Realized Revenue (IDR)',
                data: [real],
                backgroundColor: '#C28455',
                borderRadius: 8,
              },
              {
                label: 'Estimated Potential (IDR)',
                data: [est],
                backgroundColor: '#191A1D',
                borderRadius: 8,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (val) => 'Rp ' + val.toLocaleString('id-ID'),
                }
              }
            }
          }
        });
      }
    } catch (err) {
      console.error('Chart load error:', err);
    }
  }

  /* --------------------------------------------------------------------------
     Front Desk Camera QR Code Scanner
     -------------------------------------------------------------------------- */
  openScannerModal() {
    this.openModal('scannerModal');
    if (window.Html5Qrcode) {
      this.html5QrcodeScanner = new Html5Qrcode("qr-reader");
      this.html5QrcodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          this.handleQrScanned(decodedText);
        },
        (error) => {
          // Ignore minor scan frames
        }
      ).catch(err => {
        console.warn('Camera access error:', err);
      });
    }
  }

  closeScannerModal() {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.stop().then(() => {
        this.html5QrcodeScanner = null;
      }).catch(err => console.warn(err));
    }
    this.closeModal('scannerModal');
  }

  handleQrScanned(codeText) {
    this.closeScannerModal();
    this.showToast(`Scanned Code: ${codeText}`);
    this.verifyBookingCode(codeText);
  }

  verifyManualBookingCode() {
    const code = document.getElementById('manualBookingCode').value.trim();
    if (!code) return;
    this.closeScannerModal();
    this.verifyBookingCode(code);
  }

  async verifyBookingCode(code) {
    try {
      const res = await this.apiFetch('/admin/reservasi');
      if (res && res.data) {
        const found = res.data.find(r => r.kode_booking.toLowerCase() === code.toLowerCase());
        if (found) {
          if (confirm(`Booking Code Found! \nGuest: ${found.member ? found.member.nama_member : 'Guest'} \nSpace: ${found.space ? found.space.nama_space : '-'} \nStatus: ${found.status.toUpperCase()} \n\nProceed to Check-In guest now?`)) {
            await this.checkInReservation(found.id);
          }
        } else {
          this.showToast(`No active reservation found matching '${code}'`, 'error');
        }
      }
    } catch (err) {
      this.showToast(err.message || 'Verification error', 'error');
    }
  }

  /* --------------------------------------------------------------------------
     Generic Modal Helpers
     -------------------------------------------------------------------------- */
  openModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (backdrop) backdrop.classList.add('active');
  }

  closeModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (backdrop) backdrop.classList.remove('active');
  }

  openProfileModal() {
    const name = prompt('Update Profile Name:', this.user ? this.user.username : '');
    if (name) {
      this.showToast('Profile updated!');
    }
  }
}

// Global App Singleton Initialization
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SmartSpaceApp();
});
