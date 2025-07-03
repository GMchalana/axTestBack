import Bookings from '../models/Bookings.js';
import Order from '../models/Order.js';
import OrderItems from '../models/orderItems.js';




const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });


    const bookings = await Bookings.find({ user: userId });
    if (!bookings.length) return res.status(404).json({ message: 'No bookings found' });

    const totalAmount = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

    const order = await Order.create({
      user: userId,
      isCheckout: true,
      totalAmount
    });

    const orderItems = await OrderItems.insertMany(
      bookings.map(b => ({
        order: order._id,
        user: userId,
        hotel: b.hotel,
        date: b.date,
        time: b.time,
        duration: b.duration,
        isCheckout: true,
        amount: b.amount
      }))
    );

    await Bookings.deleteMany({ user: userId });

    res.status(201).json({ order, orderItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItems.find({ order: order._id })
          .populate('hotel', 'name'); 
        return { order, items };
      })
    );

    res.status(200).json(ordersWithItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { placeOrder, getUserOrders };