// ===================================
// ESL Connect - Pricing Page (Stripe Integration)
// ===================================

// Initialize Stripe
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SykPiB6v5gYlR6rkMlAzeRyVl76RiWx5ksV1A0JccXnIpv0N8FDf7rb8TcB0P9Gq4WvRdPZqGFFtTDgb11bwUHj00yusZlxmO';
const stripe = window.Stripe ? window.Stripe(STRIPE_PUBLISHABLE_KEY) : null;

// ===================================
// Subscribe Function (Stripe Checkout)
// ===================================
async function subscribe(plan) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!user.loggedIn) {
        alert('Please sign in to subscribe');
        window.location.href = 'login.html?redirect=pricing.html';
        return;
    }

    // Check if user is an employer
    if (user.role !== 'employer') {
        alert('Subscriptions are only available for employers. Please sign up as an employer.');
        return;
    }

    // Check if Stripe is loaded
    if (!stripe) {
        alert('Payment system is loading. Please try again in a moment.');
        return;
    }

    // Show loading
    showLoadingOverlay('Creating checkout session...');

    try {
        // Determine the API base URL
        // If on GitHub Pages or Localhost, use the absolute Netlify URL for the backend
        const isNetlify = window.location.hostname.includes('netlify.app');
        const apiBase = isNetlify ? '' : 'https://spiffy-entremet-3857d8.netlify.app';

        console.log('Using API Base:', apiBase || 'Relative (Netlify)');

        // Call backend function to create checkout session
        const response = await fetch(`${apiBase}/.netlify/functions/create-checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan: plan,
                userEmail: user.email,
                userName: user.name,
                userId: user.id // Pass Supabase UID
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create checkout session (Status: ' + response.status + ')');
        }

        const { sessionId, url } = await response.json();

        // Redirect to Stripe Checkout
        if (url) {
            window.location.href = url;
        } else {
            // Fallback: use Stripe.js redirect
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                throw new Error(result.error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        hideLoadingOverlay();
        alert('Payment Error: ' + error.message);
    }
}

// ===================================
// Show Loading Overlay
// ===================================
function showLoadingOverlay(message = 'Processing...') {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    overlay.innerHTML = `
        <div style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">${message}</div>
        <div style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(overlay);
}

// ===================================
// Hide Loading Overlay
// ===================================
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// ===================================
// Check Current Subscription
// ===================================
function checkSubscription() {
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (user.loggedIn && user.subscription) {
        // Handle Supabase subscription status
        const isActive = user.subscription.status === 'active';

        if (isActive) {
            // Show current subscription info
            showSubscriptionInfo({
                planName: user.subscription.plan_name || 'Professional',
                expiryDate: user.subscription.current_period_end
            });
        }
    }
}

// ===================================
// Show Subscription Info
// ===================================
function showSubscriptionInfo(subscription) {
    const expiryDate = new Date(subscription.expiryDate);
    const formattedDate = expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const infoBox = document.createElement('div');
    infoBox.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
    `;

    infoBox.innerHTML = `
        <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">✓ Active Subscription</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 1rem;">
            ${subscription.planName}<br>
            Renews: ${formattedDate}
        </div>
        <button onclick="window.location.href='dashboard.html'" 
            style="width: 100%; padding: 0.75rem; background: white; color: #667eea; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
            Manage Subscription
        </button>
    `;

    document.body.appendChild(infoBox);
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    checkSubscription();

    // Check if Stripe loaded successfully
    if (!stripe) {
        console.error('Stripe.js failed to load. Please check your publishable key.');
    }
});
