import express from 'express';
import {getUser, editUser } from '../controllers/user.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.get(
    '/get-user', 
    getUser
);

router.put(
    '/edit-user/:id',
     upload.single('profileImage'),
     editUser
    );



export default router;