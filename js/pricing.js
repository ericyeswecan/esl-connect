// ===================================
// ESL Connect - Pricing Page (Stripe Integration)
// ===================================

// Initialize Toss Payments
const TOSS_CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; // User provided Test Client Key
const tossPayments = TossPayments(TOSS_CLIENT_KEY);

// ===================================
// Subscribe Function (Toss Payments)
// ===================================
async function subscribe(plan) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!user.loggedIn) {
        alert('Please sign in to subscribe');
        window.location.href = 'login.html?redirect=pricing.html';
        return;
    }

    if (user.role !== 'employer') {
        alert('Subscriptions are only available for employers.');
        return;
    }

    // Determine amount based on plan
    const amount = plan === 'monthly' ? 29900 : 299000; // In KRW (approx equivalent for demo)
    const orderId = `order_${user.id.slice(0, 8)}_${Date.now()}`;
    const orderName = plan === 'monthly' ? 'ESL Connect Professional (Monthly)' : 'ESL Connect Annual';

    try {
        const payment = tossPayments.payment({
            customerKey: user.id, // Unique ID for the customer
        });

        await payment.requestPayment({
            method: "CARD", // Payment method: Card
            amount: {
                currency: "KRW",
                value: amount,
            },
            orderId: orderId,
            orderName: orderName,
            successUrl: `${window.location.origin}/api/toss-success?userId=${user.id}&plan=${plan}`,
            failUrl: `${window.location.origin}/api/toss-fail`,
            customerEmail: user.email,
            customerName: user.name,
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        });
    } catch (error) {
        console.error('Toss Payment Error:', error);
        alert('Payment failed to initialize: ' + error.message);
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
