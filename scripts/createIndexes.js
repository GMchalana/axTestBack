import mongoose from 'mongoose';
import Bookings from '../models/Bookings.js';
import OrderItems from '../models/orderItems.js';

async function createIndexes() {
  try {
    
    console.log('Starting index creation..')
    await Bookings.collection.createIndex({ expiresAt: 1 });
    await Bookings.collection.createIndex({ isCheckout: 1 });
    await Bookings.collection.createIndex({ hotel: 1 });
    
    console.log('test 01');
    await OrderItems.collection.createIndex({ expiresAt: 1 });
    await OrderItems.collection.createIndex({ isCheckout: 1 });
    await OrderItems.collection.createIndex({ hotel: 1 });
    
    await mongoose.connection.db.collection('hotels').createIndex({ isBooked: 1 });
    
    console.log('All indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
    process.exit(1);
  }
}

export default createIndexes;