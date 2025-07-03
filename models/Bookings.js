import mongoose from 'mongoose';

const BookingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  date: { type: Date, required: true },
  time: String,
  duration: { type: Number, required: true },
  isCheckout: { type: Boolean, default: false },
  amount: Number,
  expiresAt: Date
}, { timestamps: true });


BookingsSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isModified('duration')) {
    const bookingDate = new Date(this.date);
    this.expiresAt = new Date(bookingDate.getTime() + this.duration * 60000);
  }
  next();
});

const Bookings = mongoose.model('Bookings', BookingsSchema);
export default Bookings;