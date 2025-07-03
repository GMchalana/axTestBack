import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: process.env.STRIPE_APP_VERSION });

const createPaymentIntent = async (req, res) => {
  try {
    let { amount } = req.body;
    amount = parseInt(amount, 10);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
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
//

export default createPaymentIntent;
