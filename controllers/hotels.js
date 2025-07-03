import Hotel from '../models/Hotel.js';

const getAllHotels = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 9
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword || '';
       const searchQuery = keyword
      ? { name: { $regex: keyword, $options: 'i' } }
      : {};

    const hotels = await Hotel.find(searchQuery).select(
      '_id hotelCode sabreHotelCode codeContext name chainName brandName description primaryImage isBooked pricePerNight'
    ).skip(skip).limit(limit);

    const total = await Hotel.countDocuments();

    res.status(200).json({
      hotels,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
};

export default getAllHotels;