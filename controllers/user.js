import User from '../models/User.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';


const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const editUser = async (req, res) => {
  try {
    let profileImageUrl = req.body.profileImage;

    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const uploadParams = {
        Bucket: process.env.R2_BUCKET,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));
      profileImageUrl = `${process.env.IMAGE_BASE_URL}/${fileName}`;
    }

 
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: profileImageUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};


export { getUser, editUser };