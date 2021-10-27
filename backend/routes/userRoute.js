import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// Product Model
import User from '../models/userModel.js';

// Register a user
// POST @/api/users
// Public
router.post('/', (req, res) => {
   const { name, email, password, isAdmin } = req.body;

   // Validation
   if (!name) {
      res.status(400).json({ msg: 'Please enter name!' });
   } else if (!email) {
      res.status(400).json({ msg: 'Please enter email!' });
   } else if (!password) {
      res.status(400).json({ msg: 'Please enter password!' });
   } else if (password.length <= 5) {
      res.status(400).json({ msg: 'Passord should be at least 6 character!' });
   } else {
      // Check for existing user
      User.findOne({ email })
         .then((user) => {
            if (user) {
               return res.status(400).json({ msg: 'User already exist!' });
            }

            const newUser = new User({
               name,
               email,
               password,
               isAdmin,
            });

            //  Create a salt
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;

                  newUser.password = hash;

                  //   Save user
                  newUser.save().then((user) => {
                     jwt.sign(
                        { id: user._id },
                        process.env.jwtSecret,
                        { expiresIn: 7200 },
                        (err, token) => {
                           if (err) throw err;

                           res.json({
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
                  });
               });
            });
         })
         .catch((err) => console.log(err));
   }
});

// Get all users
// GET @/api/users
// Private
router.get('/', auth, (req, res) => {
   User.find()
      .sort({ date: -1 })
      .select('-password')
      .then((user) => res.status(200).json(user))
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Get a user
// GET @/api/users/:id
// Private
router.get('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .select('-password')
      .then((user) => res.status(200).json(user))
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Update a user profile
// PUT @/api/users/profile
// Private
router.put('/profile/mine', auth, (req, res) => {
   User.findById(req.user.id).then((user) => {
      // Check for user
      if (user) {
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;

         if (req.body.password) {
            user.password = req.body.password;
         }

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               if (err) throw err;

               user.password = hash;

               //   update user
               user.save().then((user) => {
                  jwt.sign(
                     { id: user._id },
                     process.env.jwtSecret,
                     { expiresIn: 7200 },
                     (err, token) => {
                        if (err) throw err;

                        res.json({
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
               });
            });
         });
      } else {
         res.status(400).json({ msg: 'User not found!' });
      }
   });
});

// Update a user to admin
// PUT @/api/users/:id
// Private
router.put('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .then((user) => {
         // Check for user
         if (user) {
            user.isAdmin = req.body.isAdmin;

            //   Save user
            user.save().then(res.status(201).json(user));
         } else {
            res.status(501).json({ msg: 'User not found!' });
         }
      })
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Delete a user
// DELETE @/api/users
// Private
router.delete('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .then((user) =>
         user
            .remove()
            .then(() =>
               res.status(200).json({ msg: 'User Removed successfully!' })
            )
      )
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

export default router;
