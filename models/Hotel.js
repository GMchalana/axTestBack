import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema({
  type: String,
  value: String,
}, { _id: false });

const PolicySchema = new mongoose.Schema({
  type: String,
  value: String,
}, { _id: false });

const AmenitySchema = new mongoose.Schema({
  code: String,
  description: String,
  complimentary: Boolean,
  value: String,
}, { _id: false });

const ImageSchema = new mongoose.Schema({
  url: String,
  caption: String,
  categoryCode: Number,
  categoryDescription: String,
  id: String,
  ordinal: Number,
  format: String,
  lastModifiedDate: String,
  sizes: {
    original: String,
    large: String,
    medium: String,
    small: String,
    thumbnail: String,
  },
}, { _id: false });

const LocationSchema = new mongoose.Schema({
  address: String,
  city: String,
  country: String,
  countryName: String,
  state: String,
  postalCode: String,
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
  },
  latitude: Number,
  longitude: Number,
  attractions: [String],
  transportationInfo: String,
}, { _id: false });

const ContactSchema = new mongoose.Schema({
  phone: String,
  fax: String,
  email: String,
  website: String,
}, { _id: false });

const PropertyInfoSchema = new mongoose.Schema({
  floors: Number,
  rooms: Number,
  yearBuilt: Number,
  yearRemodeled: Number,
  policies: [PolicySchema],
  checkInTime: String,
  checkOutTime: String,
}, { _id: false });

const PropertyQualitySchema = new mongoose.Schema({
  description: String,
  stars: Number,
}, { _id: false });

const PropertyTypeSchema = new mongoose.Schema({
  code: String,
  description: String,
}, { _id: false });

const HotelSchema = new mongoose.Schema({
  hotelCode: String,
  sabreHotelCode: String,
  codeContext: String,
  name: String,
  chainCode: String,
  chainName: String,
  brandCode: String,
  brandName: String,
  description: String,
  descriptions: [DescriptionSchema],
  isEcoFriendly: Boolean,
  isBooked: Boolean,
  location: LocationSchema,
  contact: ContactSchema,
  propertyInfo: PropertyInfoSchema,
  propertyQuality: PropertyQualitySchema,
  propertyTypes: [PropertyTypeSchema],
  securityFeatures: [String],
  amenities: [AmenitySchema],
  images: [ImageSchema],
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;
