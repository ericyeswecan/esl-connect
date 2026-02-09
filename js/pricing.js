// ===================================
// ESL Connect - Pricing Page
// ===================================

// ===================================
// Subscribe Function
// ===================================
function subscribe(plan) {
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

    // In production, this would redirect to Stripe Checkout
    // For now, we'll simulate the payment process

    const plans = {
        monthly: {
            name: 'Professional Monthly',
            price: 29.99,
            duration: 30 // days
        },
        annual: {
            name: 'Professional Annual',
            price: 299,
            duration: 365 // days
        }
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
        alert('Invalid plan selected');
        return;
    }

    // Confirm subscription
    const confirmed = confirm(
        `Subscribe to ${selectedPlan.name} for $${selectedPlan.price}?\n\n` +
        `You will get:\n` +
        `• Unlimited resume access\n` +
        `• Contact teachers directly\n` +
        `• Post unlimited jobs\n` +
        `• Priority support\n\n` +
        `This is a demo. No actual payment will be processed.`
    );

    if (!confirmed) {
        return;
    }

    // Simulate payment processing
    showLoadingOverlay();

    setTimeout(() => {
        // Create subscription
        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + selectedPlan.duration);

        const subscription = {
            active: true,
            plan: plan,
            planName: selectedPlan.name,
            startDate: startDate.toISOString(),
            expiryDate: expiryDate.toISOString(),
            amount: selectedPlan.price,
            paymentMethod: 'Demo Card',
            autoRenew: true
        };

        // Save subscription to user data
        user.subscription = subscription;
        localStorage.setItem('eslconnect_user', JSON.stringify(user));

        // Redirect to success page
        window.location.href = 'payment-success.html';
    }, 2000);
}

// ===================================
// Show Loading Overlay
// ===================================
function showLoadingOverlay() {
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
        <div style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">Processing Payment...</div>
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
// Check Current Subscription
// ===================================
function checkSubscription() {
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (user.loggedIn && user.subscription && user.subscription.active) {
        // User already has active subscription
        const expiryDate = new Date(user.subscription.expiryDate);
        const today = new Date();

        if (expiryDate > today) {
            // Show current subscription info
            showSubscriptionInfo(user.subscription);
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
});
