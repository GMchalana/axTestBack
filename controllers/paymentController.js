// server/controllers/paymentController.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2025-06-30.basil' });

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents (e.g., 1000 = $10)
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Payment failed' });
  }
};

export default createPaymentIntent;
