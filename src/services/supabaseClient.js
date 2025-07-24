import { createClient } from '@supabase/supabase-js';

// Accedes a las variables de entorno a través de import.meta.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Asegúrate de que las variables se cargaron correctamente antes de crear el cliente
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL or Anon Key are missing. Check your .env file.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);