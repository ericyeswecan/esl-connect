const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase admin client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin access
);

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
    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                const session = stripeEvent.data.object;
                console.log('Payment successful for session:', session.id);

                const userId = session.client_reference_id || session.metadata.userId;
                const plan = session.metadata.plan;

                if (userId) {
                    // Update subscription in Supabase
                    const { error } = await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userId,
                            stripe_customer_id: session.customer,
                            stripe_subscription_id: session.subscription,
                            plan_name: plan,
                            status: 'active',
                            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Placeholder, Stripe provides actual end date in subscription object
                        });

                    if (error) {
                        console.error('Error saving subscription to Supabase:', error);
                    } else {
                        console.log('Successfully saved subscription for user:', userId);
                    }
                }
                break;

            case 'customer.subscription.updated':
                const subscription = stripeEvent.data.object;
                // Update subscription status in Supabase if needed
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = stripeEvent.data.object;
                // Mark subscription as inactive in Supabase
                const { error: deleteError } = await supabase
                    .from('subscriptions')
                    .update({ status: 'canceled' })
                    .eq('stripe_subscription_id', deletedSubscription.id);

                if (deleteError) console.error('Error deleting subscription:', deleteError);
                break;

            default:
                console.log(`Unhandled event type: ${stripeEvent.type}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true })
        };
    } catch (error) {
        console.error('Error handling webhook event:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
