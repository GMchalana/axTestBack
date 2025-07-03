import Bookings from '../models/Bookings.js';
import OrderItems from '../models/orderItems';
import Hotel from '../models/Hotel';

class BookingStatusUpdater {
  async updateStatuses() {
    const now = new Date();
    
    try {
      // Start a MongoDB session for transactions
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        // 1. Update expired bookings
        await Bookings.updateMany(
          { expiresAt: { $lte: now }, isCheckout: false },
          { $set: { isCheckout: true } },
          { session }
        );
        
        // 2. Update expired order items
        await OrderItems.updateMany(
          { expiresAt: { $lte: now }, isCheckout: false },
          { $set: { isCheckout: true } },
          { session }
        );
        
        // 3. Get all hotels with active bookings/orders
        const activeBookingHotelIds = await Bookings.distinct('hotel', 
          { isCheckout: false }, 
          { session }
        );
        
        const activeOrderHotelIds = await OrderItems.distinct('hotel', 
          { isCheckout: false }, 
          { session }
        );
        
        // Combine and deduplicate hotel IDs
        const allActiveHotelIds = [...new Set([...activeBookingHotelIds, ...activeOrderHotelIds])];
        
        // 4. Update hotel statuses
        await Hotel.updateMany(
          { _id: { $in: allActiveHotelIds } },
          { $set: { isBooked: true } },
          { session }
        );
        
        await Hotel.updateMany(
          { _id: { $nin: allActiveHotelIds } },
          { $set: { isBooked: false } },
          { session }
        );
        
        // Commit the transaction
        await session.commitTransaction();
        console.log(`Booking status update completed at ${now}`);
      } catch (error) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    } catch (error) {
      console.error('Error updating booking statuses:', error);
    }
  }
}

export default new BookingStatusUpdater();