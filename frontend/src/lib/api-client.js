/**
 * LAWLENS API Client
 * Unified layer for all backend communications.
 * Handles authentication headers and standardizes response shapes.
 */

import { supabase } from './supabase.js';

export const apiClient = {
    /**
     * Securely forward requests to n8n via Supabase Edge Function
     */
    async orchestrate(action, payload) {
        if (!supabase) {
            throw new Error('BACKEND_NOT_CONFIGURED');
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            throw new Error('AUTH_REQUIRED');
        }

        const { data, error } = await supabase.functions.invoke('lawlens-orchestrator', {
            body: {
                action,
                payload,
                metadata: {
                    timestamp: new Date().toISOString(),
                    userId: session.user.id
                }
            }
        });

        if (error) {
            throw error;
        }

        return data;
    },

    /**
     * Document-specific endpoints
     */
    documents: {
        async list() {
            if (!supabase) return [];
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },

        async getById(id) {
            if (!supabase) return null;
            const { data, error } = await supabase
                .from('documents')
                .select(`
          *,
          document_versions (*)
        `)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        }
    },

    /**
     * Legal Intelligence endpoints
     */
    intelligence: {
        async listCompliancePacks() {
            if (!supabase) return [];
            const { data, error } = await supabase
                .from('compliance_checklists')
                .select('*')
                .order('law_name', { ascending: true });

            if (error) throw error;
            return data;
        },

        async listGlossary() {
            if (!supabase) return [];
            const { data, error } = await supabase
                .from('legal_glossary')
                .select('*')
                .order('term', { ascending: true });

            if (error) throw error;
            return data;
        }
    }
};
