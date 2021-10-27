import express from 'express';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// Product Model
import Product from '../models/productModel.js';

// Get all Products
// GET @/api/products
// Public
router.get('/', (req, res) => {
   Product.find()
      .sort({ date: -1 })
      .then((product) => res.status(200).json(product));
});

// Get a Product
// GET @/api/products/:id
// Public
router.get('/:id', (req, res) => {
   Product.findById(req.params.id)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(400).json({ msg: 'No Product Found!' }));
});

// Create a Product
// POST @/api/products
// Private
router.post('/', auth, (req, res) => {
   // Get Data from Request body
   const { name, image, description, countInStock, brand, category, price } =
      req.body;

   // Create a new Product object
   const newProduct = new Product({
      name,
      image,
      description,
      countInStock,
      brand,
      category,
      price,
   });

   // Save Product to DB
   newProduct
      .save()
      .then((product) =>
         res.status(201).json({ product, msg: 'Product created successfully!' })
      )
      .catch((err) =>
         res.status(400).json({
            msg: 'An error occured! Please try again in one minute!',
         })
      );
});

// Delete a Product
// DELETE @/api/products/:id
// Private
router.delete('/:id', auth, (req, res) => {
   Product.findById(req.params.id)
      .then((product) => {
         product
            .remove()
            .then(() =>
               res.status(200).json({ msg: 'Product deleted successfully' })
            );
      })
      .catch((err) =>
         res.status(400).json({
            msg: 'Product not deleted! Please try again in one minute',
         })
      );
});

// Get Latest Products
// GET @/api/products/latest/products
// Public
router.get('/latest/products', (req, res) => {
   Product.find()
      .sort({ date: -1 })
      .limit(3)
      .then((product) => res.status(200).json(product));
});

export default router;
