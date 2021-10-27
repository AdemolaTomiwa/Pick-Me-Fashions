import { combineReducers } from 'redux';
import productReducer from './productReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import shippingReducer from './shippingReducer';
import orderReducer from './orderReducer';
// import latestProductReducer from './latestProductsReducer';

export default combineReducers({
   products: productReducer,
   error: errorReducer,
   cart: cartReducer,
   user: userReducer,
   shipping: shippingReducer,
   order: orderReducer,
   //    latestProduct: latestProductReducer,
});
