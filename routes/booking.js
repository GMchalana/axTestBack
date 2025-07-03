import express from 'express';
import { placeBooking, cancelBooking, getAllBookingHotels } from '../controllers/booking.js';
import  createPaymentIntent  from '../controllers/paymentController.js';

const router = express.Router();

router.post(
    '/place-book',
     placeBooking
    );

router.delete(
    '/cancel-book', 
    cancelBooking
);

router.get(
    '/get-bookings', 
    getAllBookingHotels
);

router.post(
    '/create-payment-intent',
     createPaymentIntent
    );



export default router;