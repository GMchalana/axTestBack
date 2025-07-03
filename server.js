import express from 'express';
import db from './config/db.js';
import userRouter from './routes/user.js';
import hotelRouter from './routes/hotels.js';
import bookingRouter from './routes/booking.js';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT =  process.env.PORT || 4000;

app.use(express.json());

//Initialize the database connection
db();

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/bookings', bookingRouter);

// Test route to check if the API is running
app.get('/test', (req, res) => {
  res.send('API is running');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


