// ===================================
// ESL Connect - Authentication (Supabase)
// ===================================

/**
 * Sign Up a new user
 */
async function signUp(email, password, metadata) {
    if (!supabase) return { error: 'Supabase not initialized' };

    try {
        const { data, error } = await supabase.auth.signUp({
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

        // Note: Supabase automatically handles profile creation if a trigger is set up,
        // but we'll do it manually here for certain consistency.
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
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
        console.error('Signup error:', error);
        return { data: null, error };
    }
}

/**
 * Sign In an existing user
 */
async function signIn(email, password) {
    if (!supabase) return { error: 'Supabase not initialized' };

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Fetch additional profile data
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) console.error('Error fetching profile:', profileError);

        // Fetch subscription status
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', data.user.id)
            .single();

        // Sync with localStorage for compatibility with existing code
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
        console.error('Login error:', error);
        return { data: null, error };
    }
}

/**
 * Sign Out
 */
async function signOut() {
    if (!supabase) return { error: 'Supabase not initialized' };

    await supabase.auth.signOut();
    localStorage.removeItem('eslconnect_user');
    window.location.href = 'index.html';
}

/**
 * Check and refresh session on page load
 */
async function checkAuthState() {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        // Session exists, verify profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        const { data: subscription } = await supabase
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
    } else {
        localStorage.removeItem('eslconnect_user');
    }
}

// ===================================
// UI Helpers
// ===================================

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

// Initial check
document.addEventListener('DOMContentLoaded', checkAuthState);
