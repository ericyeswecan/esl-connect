// Supabase Configuration
// Using the project details provided by the user
const SUPABASE_URL = 'https://xzqikexpxlphwdklaell.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0-pt-w7_DMNUBj8GOJwkww_ZmbQ0A-i';

// Initialize the Supabase client
// We use 'supabaseClient' instead of 'supabase' to avoid conflict with the global object from the CDN
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

if (!supabaseClient) {
    console.error('Supabase library not found. Please ensure the CDN script is included.');
} else {
    console.log('Supabase client initialized successfully.');
}
