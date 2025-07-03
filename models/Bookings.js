import mongoose from 'mongoose';


const BookingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  date: String,
  time: String,
  duration: Number,
}, { timestamps: true });

const Bookings = mongoose.model('Bookings', BookingsSchema);
export default Bookings;
