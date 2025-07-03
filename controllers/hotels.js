import Hotel from '../models/Hotel.js';

const getAllHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword || '';
    const chain = req.query.chain || '';

    let searchQuery = {};

    if (keyword && chain) {
      searchQuery = {
        $and: [
          { name: { $regex: keyword, $options: 'i' } },
          { chainName: { $regex: chain, $options: 'i' } }
        ]
      };
    } else if (keyword) {
      searchQuery = { name: { $regex: keyword, $options: 'i' } };
    } else if (chain) {
      searchQuery = { chainName: { $regex: chain, $options: 'i' } };
    }

    const hotels = await Hotel.find(searchQuery).select(
      '_id hotelCode sabreHotelCode codeContext name chainName brandName description primaryImage isBooked pricePerNight'
    ).skip(skip).limit(limit);

    const total = await Hotel.countDocuments(searchQuery);

    res.status(200).json({
      hotels,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
};

export default getAllHotels;