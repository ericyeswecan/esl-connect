// ===================================
// ESL Connect - Authentication (Supabase)
// ===================================

/**
 * Sign Up a new user
 */
async function signUp(email, password, metadata) {
    console.log('signUp called for:', email);
    if (!eslSupabase) {
        console.error('eslSupabase is null');
        return { error: { message: 'Supabase client not initialized' } };
    }

    if (!eslSupabase.auth) {
        console.error('eslSupabase.auth is undefined!', eslSupabase);
        return { error: { message: 'Supabase Auth module missing' } };
    }

    try {
        const { data, error } = await eslSupabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: metadata.fullName,
                    role: metadata.role
                }
            }
        });

        if (error) throw error;

        if (data.user) {
            const { error: profileError } = await eslSupabase
                .from('profiles')
                .upsert([
                    {
                        id: data.user.id,
                        email: email,
                        full_name: metadata.fullName,
                        role: metadata.role
                    }
                ]);

            if (profileError) console.error('Profile creation error:', profileError);
        }

        return { data, error: null };
    } catch (error) {
        console.error('Signup error detail:', error);
        return { data: null, error };
    }
}

/**
 * Sign In an existing user
 */
async function signIn(email, password) {
    if (!eslSupabase) return { error: { message: 'Supabase client not initialized' } };

    try {
        const { data, error } = await eslSupabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Fetch additional profile data
        const { data: profile } = await eslSupabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        // Fetch subscription status
        const { data: subscription } = await eslSupabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', data.user.id)
            .single();

        // Sync with localStorage
        const userData = {
            id: data.user.id,
            email: data.user.email,
            name: profile ? profile.full_name : email.split('@')[0],
            role: profile ? profile.role : 'teacher',
            loggedIn: true,
            subscription: subscription || null,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('eslconnect_user', JSON.stringify(userData));

        return { data, profile, error: null };
    } catch (error) {
        console.error('Login error detail:', error);
        return { data: null, error };
    }
}

/**
 * Sign Out
 */
async function signOut() {
    if (eslSupabase) {
        await eslSupabase.auth.signOut();
    }
    localStorage.removeItem('eslconnect_user');
    window.location.href = 'index.html';
}

/**
 * Check and refresh session on page load
 */
async function checkAuthState() {
    if (!eslSupabase || !eslSupabase.auth) return;

    try {
        const { data: { session } } = await eslSupabase.auth.getSession();

        if (session) {
            const { data: profile } = await eslSupabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            const { data: subscription } = await eslSupabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            const userData = {
                id: session.user.id,
                email: session.user.email,
                name: profile ? profile.full_name : session.user.email.split('@')[0],
                role: profile ? profile.role : 'teacher',
                loggedIn: true,
                subscription: subscription || null,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('eslconnect_user', JSON.stringify(userData));
        }
    } catch (err) {
        console.error('AuthState check error:', err);
    }
}

// Initial check
document.addEventListener('DOMContentLoaded', checkAuthState);
