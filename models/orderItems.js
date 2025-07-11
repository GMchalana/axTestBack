import mongoose from 'mongoose';

const OrderItemsSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  date: { type: Date, required: true },
  time: String,
  duration: { type: Number, required: true }, 
  isCheckout: { type: Boolean, default: false },
  amount: Number,
  expiresAt: Date 
}, { timestamps: true });


OrderItemsSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isModified('duration')) {
    const bookingDate = new Date(this.date);
    this.expiresAt = new Date(bookingDate.getTime() + this.duration * 60000);
  }
  next();
});

const OrderItems = mongoose.model('OrderItems', OrderItemsSchema);
export default OrderItems;