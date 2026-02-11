export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const paymentKey = url.searchParams.get("paymentKey");
    const orderId = url.searchParams.get("orderId");
    const amount = url.searchParams.get("amount");
    const userId = url.searchParams.get("userId");
    const plan = url.searchParams.get("plan");

    if (!paymentKey || !orderId || !amount) {
        return Response.redirect(`${url.origin}/payment-cancel.html`, 302);
    }

    try {
        // 1. Confirm payment with Toss API
        const secretKey = env.TOSS_SECRET_KEY;
        const basicToken = btoa(secretKey + ":");

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
            console.error("Toss Confirmation Failed:", error);
            return Response.redirect(`${url.origin}/payment-cancel.html`, 302);
        }

        // 2. Update Supabase
        // Note: In Cloudflare, we don't need a Node.js client for simple POST requests
        // but using the SDK is easier. Assuming @supabase/supabase-js works in Workers.
        const expiryDate = new Date();
        if (plan === "annual") {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }

        // Direct fetch to Supabase to keep it lightweight and avoid SDK issues in Workers
        const supabaseResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions`, {
            method: "POST",
            headers: {
                "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
                "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "resolution=merge-duplicates"
            },
            body: JSON.stringify({
                user_id: userId,
                toss_payment_key: paymentKey,
                toss_order_id: orderId,
                plan_name: plan,
                status: "active",
                current_period_end: expiryDate.toISOString(),
            }),
        });

        if (!supabaseResponse.ok) {
            console.error("Supabase Update Failed:", await supabaseResponse.text());
        }

        // 3. Redirect to success page
        return Response.redirect(`${url.origin}/payment-success.html`, 302);
    } catch (error) {
        console.error("Internal Error:", error);
        return Response.redirect(`${url.origin}/payment-cancel.html`, 302);
    }
}
