/** Live storefront + admin (Render). Backend URL is not a browser origin — omit from CORS. */
const LIVE_CLIENT_ORIGINS = [
  'https://e-commerce-frontend-ygbl.onrender.com',
  'https://e-commerce-admin-z3wz.onrender.com',
];

const LOCAL_DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

/**
 * Allowed `Origin` values for Express `cors` and Socket.IO.
 * `CLIENT_URL` overrides defaults when set (comma-separated, optional spaces).
 * In non-production, local Vite dev servers are always included.
 */
export function getCorsAllowedOrigins() {
  const fromEnv =
    process.env.CLIENT_URL?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
  const base = fromEnv.length > 0 ? fromEnv : LIVE_CLIENT_ORIGINS;
  const dev = process.env.NODE_ENV !== 'production' ? LOCAL_DEV_ORIGINS : [];
  return [...new Set([...base, ...dev])];
}
