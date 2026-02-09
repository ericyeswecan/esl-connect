// Supabase Configuration
// Using the project details provided by the user
const SUPABASE_URL = 'https://xzqikexpxlphwdklaell.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0-pt-w7_DMNUBj8GOJwkww_ZmbQ0A-i';

// Initialize the Supabase client
// This expects the Supabase library to be loaded via CDN in the HTML
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

if (!supabase) {
    console.error('Supabase library not found. Please ensure the CDN script is included.');
} else {
    console.log('Supabase client initialized successfully.');
}
