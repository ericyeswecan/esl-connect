const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
    const { paymentKey, orderId, amount, userId, plan } = req.query;

    try {
        // 1. Confirm payment with Toss API
        const secretKey = process.env.TOSS_SECRET_KEY;
        const basicToken = Buffer.from(secretKey + ":").toString("base64");

        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: `Basic ${basicToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Toss Confirmation Failed:', error);
            return res.redirect('/payment-cancel.html');
        }

        // 2. Update Supabase
        const expiryDate = new Date();
        if (plan === 'annual') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }

        const { error: dbError } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: userId,
                toss_payment_key: paymentKey,
                toss_order_id: orderId,
                plan_name: plan,
                status: 'active',
                current_period_end: expiryDate.toISOString(),
            });

        if (dbError) throw dbError;

        // 3. Redirect to success page
        return res.redirect('/payment-success.html');
    } catch (error) {
        console.error('Internal Error:', error);
        return res.redirect('/payment-cancel.html');
    }
};
