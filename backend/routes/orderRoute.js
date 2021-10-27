import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Product Model
import Order from '../models/orderModel.js';

// Get all Order
// GET @/api/orders
// Private
router.get('/', auth, (req, res) => {
   Order.find()
      .sort({ orderDate: -1 })
      .then((order) => res.status(200).json(order))
      .catch((err) =>
         res.status(400).json({
            msg: 'An error occured! Please try again in one minute!',
         })
      );
});

// Get an Order
// GET @/api/orders/:id
// Private
router.get('/:id', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => res.status(200).json(order))
      .catch((err) => res.status(400).json({ msg: 'No Order Found!' }));
});

// Create an order
// POST @/api/orders
// Private
router.post('/', auth, (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
      userObject,
   } = req.body;

   if (orderItems.length === 0) {
      res.status(400).json({ msg: 'Cart is empty!' });
   } else {
      const newOrder = new Order({
         orderItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         shippingPrice,
         taxPrice,
         totalPrice,
         user,
         userObject,
      });

      newOrder
         .save()
         .then((order) =>
            res.status(201).json({ order, msg: 'Order created successfully!' })
         )
         .catch((err) =>
            res.status(400).json({
               msg: 'An error occured! Please try again in one minute!',
            })
         );
   }
});

// Update an order to paid
// PUT @/api/orders/:id/pay
// Private
router.put('/:id/pay', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         // Check for order
         if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
               id: req.body.id,
               status: req.body.status,
               updateTime: req.body.update_time,
               emailAddress: req.body.payer.email_address,
            };

            order.save().then(res.status(201).json(order));
         } else {
            res.status(501).json({ msg: 'Order not found!' });
         }
      })
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Update an order to paid on cash
// PUT @/api/orders/:id/pay/cash
// Private
router.put('/:id/pay/cash', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         // Check for order
         if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            order.save().then(res.status(201).json(order));
         } else {
            res.status(501).json({ msg: 'Order not found!' });
         }
      })
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Update an order to delivered
// PUT @/api/orders/:id/deliver
// Private
router.put('/:id/deliver', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         // Check for order
         if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            order.save().then(res.status(201).json(order));
         } else {
            res.status(501).json({ msg: 'Order not found!' });
         }
      })
      .catch((err) =>
         res
            .status(400)
            .json({ msg: 'An error occured! Please try again in one minute!' })
      );
});

// Get logged in user orders
// GET @/api/orders/myorders
// Private
router.get('/myorders/mine', auth, (req, res) => {
   Order.find({ user: req.user.id })
      .sort({ orderDate: -1 })
      .then((order) => res.json(order))
      .catch((err) => res.json(err));
});

// Delete an order
// DELETE @/api/orders/:id
// Private
router.delete('/:id', auth, (req, res) => {
   Order.findById(req.params.id)
      .then((order) => {
         order.remove().then(() => {
            res.status(200).json({ msg: 'Order Removed successfully!' });
         });
      })
      .catch((err) => {
         res.status(400).json({
            msg: 'An error occured! Please try again in one minute!',
         });
      });
});

export default router;
