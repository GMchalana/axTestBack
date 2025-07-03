import express from 'express';
import db from './config/db.js';
import userRouter from './routes/user.js';
import hotelRouter from './routes/hotels.js';
import bookingRouter from './routes/booking.js';
import orderRouter from './routes/order.js';
import cors from 'cors';
import createIndexes from './scripts/createIndexes.js';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
const PORT =  process.env.PORT || 4000;

app.use(express.json());

//start DB
await db();

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/orders', orderRouter);

// test route
app.get('/test', (req, res) => {
  res.send('API is running');
});


mongoose.connection.once('open', async () => {
  try {
    await createIndexes();
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


