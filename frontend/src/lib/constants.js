/**
 * LAWLENS — Global Constants Layer
 * Centralized configuration for routes, API endpoints, and theme keys.
 */

export const ROUTES = {
  LANDING: '/index.html',
  LOGIN: '/login.html',
  SIGNUP: '/signup.html',
  PRIVACY: '/privacy.html',
  TERMS: '/terms.html',
  APP: '/app.html',
};

export const STORAGE_KEYS = {
  THEME_MODE: 'lawlens_theme_mode',
  AUTH_TOKEN: 'lawlens_auth_token',
  USER_PREFS: 'lawlens_user_prefs',
};

export const API_CONFIG = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

export const UI_CONFIG = {
  SIDEBAR_WIDTH: 240,
  SIDEBAR_MINI_WIDTH: 68,
  TOPBAR_HEIGHT: 54,
  ANIMATION_DURATION: 300, // ms
};
