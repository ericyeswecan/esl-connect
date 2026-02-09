const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Triggering new deployment to apply environment variable changes

exports.handler = async (event) => {
    // Handle CORS preflight (OPTIONS)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { plan, userEmail, userName, userId } = JSON.parse(event.body);

        // Define price IDs (you'll need to create these in Stripe Dashboard)
        const prices = {
            monthly: process.env.STRIPE_PRICE_MONTHLY,
            annual: process.env.STRIPE_PRICE_ANNUAL
        };

        console.log('Checkout request for plan:', plan);
        console.log('User ID:', userId);

        if (!prices[plan]) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid plan selected' })
            };
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: prices[plan],
                    quantity: 1,
                },
            ],
            customer_email: userEmail,
            client_reference_id: userId, // Use Supabase UID as client_reference_id
            success_url: `${process.env.SITE_URL}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL}/payment-cancel.html`,
            metadata: {
                plan: plan,
                userName: userName,
                userId: userId // Also keep in metadata
            }
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ sessionId: session.id, url: session.url })
        };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
