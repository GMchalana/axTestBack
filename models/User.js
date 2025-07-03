import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
    firstName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
    lastName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
    profileImage: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;

