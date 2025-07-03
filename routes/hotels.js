import express from 'express';
import  getAllHotels  from '../controllers/hotels.js';

const router = express.Router();

router.get(
    '/get-all-hotels', 
    getAllHotels
);


export default router;