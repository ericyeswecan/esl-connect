// Supabase Configuration
const SUPABASE_URL = 'https://xzqikexpxlphwdklaell.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0-pt-w7_DMNUBj8GOJwkww_ZmbQ0A-i';

// We use 'eslSupabase' to be absolutely unique and avoid any global collisions
let eslSupabase = null;

try {
    if (window.supabase) {
        eslSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('ESL Connect: Supabase client initialized.', !!eslSupabase);
        if (eslSupabase) {
            console.log('ESL Connect: Auth module status:', !!eslSupabase.auth);
        }
    } else {
        console.error('ESL Connect: Supabase library not found on window object.');
    }
} catch (err) {
    console.error('ESL Connect: Error initializing Supabase:', err);
}

// Global exposure for debugging if needed
window.eslSupabase = eslSupabase;
