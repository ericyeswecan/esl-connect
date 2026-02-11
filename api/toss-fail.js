module.exports = async (req, res) => {
    const { message, code } = req.query;
    console.error(`Toss Payment Failed: ${code} - ${message}`);

    return res.redirect(`/payment-cancel.html?error=${encodeURIComponent(message)}`);
};
