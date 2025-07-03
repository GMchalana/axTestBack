import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isCheckout: Boolean,
  totalAmount: Number
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
