import Bookings from '../models/Bookings.js';
import OrderItems from '../models/orderItems';
import Hotel from '../models/Hotel';

class BookingStatusUpdater {
  async updateStatuses() {
    const now = new Date();
    
    try {
     
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
      
        await Bookings.updateMany(
          { expiresAt: { $lte: now }, isCheckout: false },
          { $set: { isCheckout: true } },
          { session }
        );
        
       
        await OrderItems.updateMany(
          { expiresAt: { $lte: now }, isCheckout: false },
          { $set: { isCheckout: true } },
          { session }
        );
        

        const activeBookingHotelIds = await Bookings.distinct('hotel', 
          { isCheckout: false }, 
          { session }
        );
        
        const activeOrderHotelIds = await OrderItems.distinct('hotel', 
          { isCheckout: false }, 
          { session }
        );
        
        
        const allActiveHotelIds = [...new Set([...activeBookingHotelIds, ...activeOrderHotelIds])];
        
        
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
        
    
        await session.commitTransaction();
        console.log(`Booking status update completed at ${now}`);
      } catch (error) {
       
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