const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { plan, userEmail, userName } = JSON.parse(event.body);

        // Define price IDs (you'll need to create these in Stripe Dashboard)
        const prices = {
            monthly: process.env.STRIPE_PRICE_MONTHLY,
            annual: process.env.STRIPE_PRICE_ANNUAL
        };

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
            client_reference_id: userName,
            success_url: `${process.env.URL}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL}/payment-cancel.html`,
            metadata: {
                plan: plan,
                userName: userName
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
