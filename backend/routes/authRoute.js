import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Product Model
import User from '../models/userModel.js';

// Login a user
// POST @/api/users
// Public
router.post('/', (req, res) => {
   const { email, password } = req.body;

   // Validation
   if (!email) {
      res.status(400).json({ msg: 'Please enter email!' });
   } else if (!password) {
      res.status(400).json({ msg: 'Please enter password!' });
   } else {
      // Check for existing user
      User.findOne({ email })
         .then((user) => {
            if (!user)
               return res.status(400).json({ msg: 'User does not exist!' });

            //    Validate Password
            bcrypt
               .compare(password, user.password)
               .then((isMatch) => {
                  // Validate password
                  if (!isMatch) {
                     return res
                        .status(400)
                        .json({ msg: 'Invalid Credentials!' });
                  }

                  jwt.sign(
                     { id: user._id },
                     process.env.jwtSecret,
                     { expiresIn: 7200 },
                     (err, token) => {
                        if (err) throw err;

                        res.status(200).json({
                           token,
                           user: {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                              isAdmin: user.isAdmin,
                           },
                        });
                     }
                  );
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   }
});

export default router;
