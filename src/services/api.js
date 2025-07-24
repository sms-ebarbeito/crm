import { supabase } from './supabaseClient';

export const api = {
    getContacts: async (filters = {}) => {
        let query = supabase.from('contactos').select(`
            *, 
            vendedores(id, nombre), 
            estados(id, nombre)
        `);

        if (filters.searchTerm) {
            query = query.ilike('nombre', `%${filters.searchTerm}%`);
        }
        if (filters.salespersonId) {
            query = query.eq('vendedor_id', filters.salespersonId);
        }
        if (filters.statusId) {
            query = query.eq('estado_id', filters.statusId);
        }
        if (filters.zone) {
            query = query.eq('zona', filters.zone);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching contacts:', error);
            return [];
        }
        // Renombra las relaciones para que sean más fáciles de usar en el frontend
        return data.map(c => ({ ...c, salesperson: c.vendedores, status: c.estados }));
    },
    getSalespeople: async () => {
        const { data, error } = await supabase.from('vendedores').select('*');
        if (error) { console.error('Error fetching salespeople:', error); return []; }
        return data;
    },
    getStatuses: async () => {
        const { data, error } = await supabase.from('estados').select('*');
        if (error) { console.error('Error fetching statuses:', error); return []; }
        return data;
    },
    createContact: async (contactData) => {
        const { data, error } = await supabase.from('contactos').insert([contactData]).select();
        if (error) { console.error('Error creating contact:', error); throw error; }
        return data;
    },
    updateContact: async (id, contactData) => {
        const { data, error } = await supabase.from('contactos').update(contactData).eq('id', id);
        if (error) { console.error('Error updating contact:', error); throw error; }
        return data;
    },
    deleteContact: async (id) => {
        const { error } = await supabase.from('contactos').delete().eq('id', id);
        if (error) { console.error('Error deleting contact:', error); throw error; }
    },
    createSalesperson: async (name) => {
        const { data, error } = await supabase.from('vendedores').insert([{ nombre: name }]).select();
        if (error) { console.error('Error creating salesperson:', error); throw error; }
        return data[0];
    },
    createStatus: async (name) => {
        const { data, error } = await supabase.from('estados').insert([{ nombre: name }]).select();
        if (error) { console.error('Error creating status:', error); throw error; }
        return data[0];
    }
};