export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const message = url.searchParams.get("message");
    const code = url.searchParams.get("code");

    console.error(`Toss Payment Failed: ${code} - ${message}`);

    return Response.redirect(`${url.origin}/payment-cancel.html?error=${encodeURIComponent(message || "Payment cancelled")}`, 302);
}
