// ============================================
// CampusPrint PWA — Configuration
// ============================================

const CONFIG = {
    // Note: If running entirely separate from backend, change this to your Render URL.
    API_BASE: 'https://campusprint-backend-test.onrender.com/api',

    // Fetched dynamically from backend /api/config
    FIREBASE: null,
    RAZORPAY_KEY: null,

    // Current app version
    VERSION: '1.0.0',

    // Load configuration securely from the backend environment
    async loadEnvConfig() {
        try {
            const res = await fetch(`${this.API_BASE}/config`);
            const data = await res.json();
            this.FIREBASE = data.FIREBASE;
            this.RAZORPAY_KEY = data.RAZORPAY_KEY;
        } catch (err) {
            console.error("Failed to load backend configurations", err);
        }
    }
};
