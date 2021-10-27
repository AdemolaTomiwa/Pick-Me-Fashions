import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
      default: 0,
   },
   brand: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   countInStock: {
      type: Number,
      required: true,
      default: 0,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

const Product = mongoose.model('product', ProductSchema);

export default Product;
