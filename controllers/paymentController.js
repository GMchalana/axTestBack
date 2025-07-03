import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Rg5ltDIIYgFqdpwfKMXbJDKhliozY1elXhqSRyBqP2K8ReuJ4eFrOoRuVbCuPNUR0Q1B7DXkj7U08K6npnb7tlG00i4qLf8CU', { apiVersion: '2025-06-30.basil' });

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
