exports.handler = async (event) => {
    const { message, code } = event.queryStringParameters;
    console.error(`Toss Payment Failed: ${code} - ${message}`);

    return {
        statusCode: 302,
        headers: {
            Location: `/payment-cancel.html?error=${encodeURIComponent(message)}`,
        },
    };
};
