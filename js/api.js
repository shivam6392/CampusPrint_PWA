// ============================================
// CampusPrint PWA — API Module
// ============================================

const API = {
    // Get auth headers
    _headers(json = true) {
        const token = localStorage.getItem('token');
        const h = {};
        if (json) h['Content-Type'] = 'application/json';
        if (token) h['Authorization'] = `Bearer ${token}`;
        return h;
    },

    // ── Auth ────────────────────────────────
    async login(email, password) {
        const res = await fetch(`${CONFIG.API_BASE}/auth/login`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        return data;
    },

    async register(name, email, password) {
        const res = await fetch(`${CONFIG.API_BASE}/auth/register`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        return data;
    },

    async sync(name, email, password) {
        const res = await fetch(`${CONFIG.API_BASE}/auth/sync`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Google Auth Sync failed');
        return data;
    },

    // ── Print (Direct-to-Cloud) ───────────────────────────────
    async getUploadSignature() {
        const res = await fetch(`${CONFIG.API_BASE}/print/upload-signature`, {
            headers: this._headers()
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signature fetch failed');
        return data;
    },

    async createOrder(pdfUrl, publicId, originalName, copies, color, idempotencyKey) {
        const res = await fetch(`${CONFIG.API_BASE}/print/orders`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ pdfUrl, publicId, originalName, copies, color, idempotencyKey })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Secure Order mapping failed');
        return data;
    },

    async updateOrder(orderId, copies, color) {
        const res = await fetch(`${CONFIG.API_BASE}/print/orders/${orderId}`, {
            method: 'PATCH',
            headers: this._headers(),
            body: JSON.stringify({ copies, color })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Update failed');
        return data;
    },

    async pay(printRequestId, paymentId) {
        const res = await fetch(`${CONFIG.API_BASE}/print/pay`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ printRequestId, paymentId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Payment confirmation failed');
        return data;
    },

    async payFailed(printRequestId, reason) {
        const res = await fetch(`${CONFIG.API_BASE}/print/pay-failed`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ printRequestId, reason })
        });
        return res.json();
    },

    async getOrders() {
        const res = await fetch(`${CONFIG.API_BASE}/print/orders`, {
            headers: this._headers()
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
        return data;
    }
};
