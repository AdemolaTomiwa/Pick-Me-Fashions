import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoute from './routes/productRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import orderRoute from './routes/orderRoute.js';

dotenv.config();

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connect
const db = process.env.MONGO_URI;

mongoose
   .connect(db)
   .then(() => console.log('Mongo DB Connected...'))
   .catch((err) => console.log('Not Connected...'));

// Api Routes
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', orderRoute);

// Test
// app.get('/', (req, res) => {
//    res.send('Hello world');
// });

// Paypal
app.get('/api/config/paypal', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
});

// Make upload folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Make Public folder static
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + './frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server Stated...'));
