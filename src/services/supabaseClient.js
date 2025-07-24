import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jsbgutbsckwintsnhnno.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzYmd1dGJzY2t3aW50c25obm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjk3MjIsImV4cCI6MjA2ODY0NTcyMn0.aRa4s9rzVIFbPBQYcaPDnbRgFXWZ8jmVDYmO2HhY930';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);