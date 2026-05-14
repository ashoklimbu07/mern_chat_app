// Base URL for all API calls.
// In production (Vercel) this must be set via VITE_BACKEND_URL env var.
// In local dev the Vite proxy handles /api → localhost:3000 so we use "".
const BASE = import.meta.env.VITE_BACKEND_URL || "";

export const api = (path, options = {}) => fetch(`${BASE}${path}`, options);
