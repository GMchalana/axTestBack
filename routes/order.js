import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/order.js';
import  createPaymentIntent  from '../controllers/paymentController.js';

const router = express.Router();

router.post(
    '/place-order',
     placeOrder
    );


router.get(
    '/get-orders/:userId',
    getUserOrders
);

export default router;