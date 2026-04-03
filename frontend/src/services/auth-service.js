import { supabase } from '../lib/supabase.js';

/**
 * LAWLENS Auth Service
 * Centralized logic for Supabase Authentication
 */

export const authService = {
  /**
   * Log in a user with email and password
   */
  async login(email, password) {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign up a new user with email, password, and profile metadata
   */
  async signup(email, password, metadata = {}) {
    if (!supabase) throw new Error('Supabase client is not initialized.');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.full_name || '',
          organization: metadata.organization || '',
        },
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Log out the current user
   */
  async logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = '/login.html';
  },

  /**
   * Get the current session user
   */
  async getCurrentUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Check if a user is currently logged in
   */
  async isAuthenticated() {
    if (!supabase) return false;
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }
};
