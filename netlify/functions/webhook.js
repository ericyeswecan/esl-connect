const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    // Verify webhook signature
    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Webhook signature verification failed' })
        };
    }

    // Handle the event
    switch (stripeEvent.type) {
        case 'checkout.session.completed':
            const session = stripeEvent.data.object;
            console.log('Payment successful:', session);

            // Here you would typically:
            // 1. Store subscription in database
            // 2. Send confirmation email
            // 3. Activate user's subscription

            // For now, we'll just log it
            console.log('Subscription activated for:', session.customer_email);
            break;

        case 'customer.subscription.updated':
            const subscription = stripeEvent.data.object;
            console.log('Subscription updated:', subscription);
            break;

        case 'customer.subscription.deleted':
            const deletedSubscription = stripeEvent.data.object;
            console.log('Subscription cancelled:', deletedSubscription);
            break;

        default:
            console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true })
    };
};
