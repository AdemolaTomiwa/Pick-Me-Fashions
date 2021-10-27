import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
   orderItems: [
      {
         name: {
            type: String,
            required: true,
         },
         qty: {
            type: Number,
            required: true,
         },
         image: {
            type: String,
            required: true,
         },
         price: {
            type: Number,
            required: true,
         },
      },
   ],
   shippingAddress: {
      address: {
         type: String,
         required: true,
      },
      postalCode: {
         type: String,
         required: true,
      },
      city: {
         type: String,
         required: true,
      },
      country: {
         type: String,
         required: true,
      },
   },
   paymentMethod: {
      type: String,
      required: true,
   },
   paymentResult: {
      id: {
         type: String,
      },
      status: { type: String },
      updateTime: { type: String },
      emailAddress: { type: String },
   },
   itemPrice: {
      type: Number,
      required: true,
   },
   shippingPrice: {
      type: Number,
      required: true,
   },
   taxPrice: {
      type: Number,
      required: true,
   },
   totalPrice: {
      type: Number,
      required: true,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
   },
   userObject: {
      type: Object,
      required: true,
   },
   isPaid: {
      type: Boolean,
      required: false,
      default: false,
   },
   paidAt: {
      type: Date,
   },
   isDelivered: {
      type: Boolean,
      required: false,
      default: false,
   },
   deliveredAt: {
      type: Date,
   },
   orderDate: {
      type: Date,
      default: Date.now,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

const Order = mongoose.model('order', OrderSchema);

export default Order;
