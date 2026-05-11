// /** Live storefront + admin (Render). Backend URL is not a browser origin — omit from CORS. */
// const LIVE_CLIENT_ORIGINS = [
//   'https://e-commerce-frontend-ygbl.onrender.com',
//   'https://e-commerce-admin-z3wz.onrender.com',
// ];

// const LOCAL_DEV_ORIGINS = [
//   'http://localhost:5173',
//   'http://localhost:5174',
//   'http://127.0.0.1:5173',
//   'http://127.0.0.1:5174',
// ];

// /**
//  * Allowed `Origin` values for Express `cors` and Socket.IO.
//  * `CLIENT_URL` overrides defaults when set (comma-separated, optional spaces).
//  * In non-production, local Vite dev servers are always included.
//  */
// export function getCorsAllowedOrigins() {
//   const fromEnv =
//     process.env.CLIENT_URL?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
//   const base = fromEnv.length > 0 ? fromEnv : LIVE_CLIENT_ORIGINS;
//   const dev = process.env.NODE_ENV !== 'production' ? LOCAL_DEV_ORIGINS : [];
//   return [...new Set([...base, ...dev])];
// }


const LIVE_CLIENT_ORIGINS = [
  'https://e-commerce-frontend-ygbl.onrender.com',
  'https://e-commerce-admin-z3wz.onrender.com',
  'https://e-commerce-backend-hwch.onrender.com'
  
];

const LOCAL_DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

function parseCommaOrigins(value) {
  if (!value || typeof value !== 'string') return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

/**
 * Allowed Origin values for Express cors and Socket.IO.
 * - CLIENT_URL — primary list (comma-separated, optional spaces).
 * - CORS_ORIGINS — optional extra origins (staging, preview, tunnel URLs); merged with CLIENT_URL.
 * If both are empty, LIVE_CLIENT_ORIGINS is used.
 * In non-production, local Vite dev origins are always included.
 */
export function getCorsAllowedOrigins() {
  const fromClient = parseCommaOrigins(process.env.CLIENT_URL);
  const fromExtra = parseCommaOrigins(process.env.CORS_ORIGINS);
  const explicit = [...fromClient, ...fromExtra];
  const base = explicit.length > 0 ? explicit : LIVE_CLIENT_ORIGINS;
  const dev = process.env.NODE_ENV !== 'production' ? LOCAL_DEV_ORIGINS : [];
  return [...new Set([...base, ...dev])];
}