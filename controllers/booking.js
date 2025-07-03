import Bookings from '../models/Bookings.js';
import Hotel from '../models/Hotel.js';


const placeBooking = async (req, res) => {
  try {
    const booking = new Bookings(req.body);
    const savedBooking = await booking.save();

    if (req.body.hotel) {
      await Hotel.findOneAndUpdate(
        { _id: req.body.hotel },
        { isBooked: true }
      );
    }

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Booking failed', error });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.body.id;
    console.log('Booking ID:', bookingId);
    const booking = await Bookings.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.hotel && booking.hotel) {
      await Hotel.findOneAndUpdate(
        { _id: booking.hotel },
        { isBooked: false }
      );
    }

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Cancel booking failed', error });
  }
};



const getAllBookingHotels = async (req, res) => {
  try {
    const bookings = await Bookings.find()
      .select('date time duration hotel')
      .populate({
        path: 'hotel',
        select: '_id hotelCode sabreHotelCode codeContext name chainName brandName description primaryImage'
      });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
};

export { placeBooking, cancelBooking, getAllBookingHotels };