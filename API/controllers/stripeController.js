const stripe = require("stripe")(process.env.STRIPE_KEY)

function payment(req, res){
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeError, StripeResponse) => {
            if (stripeError) {
                res.status(500).json(stripeError)
            } else {
                res.status(200).json(StripeResponse)
            }
        }
    )
}

module.exports = { payment }