import React, { Component } from 'react';
import './css/style.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminProductList from './screens/AdminProductListScreen';
import AdminProductCreate from './screens/AdminProductCreateScreen';
import AdminUserList from './screens/AdminUserListScreen';
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderReviewScreen from './screens/OrderReviewScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import AdminOrderDetailsScreen from './screens/AdminOrderDetailsScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import ScrollToTop from './components/ScrollToTop';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router className="router">
               <ScrollToTop />
               <Header />
               <div className="container">
                  <Switch>
                     <Route path="/" exact component={HomeScreen} />
                     <Route
                        path="/product/:id"
                        component={ProductDetailsScreen}
                     />
                     <Route path="/cart/:id?" component={CartScreen} />
                     <Route path="/signin" component={SigninScreen} />
                     <Route path="/register" component={RegisterScreen} />
                     <Route path="/shipping" component={ShippingScreen} />
                     <Route path="/payment" component={PaymentScreen} />
                     <Route path="/placeorder" component={PlaceOrderScreen} />
                     <Route path="/order/:id" component={OrderReviewScreen} />
                     <Route path="/profile" component={ProfileScreen} />
                     <Route path="/myorders" component={MyOrderScreen} />

                     {/* Admin Page */}
                     <Route
                        path="/admin-product-list"
                        component={AdminProductList}
                     />
                     <Route
                        path="/admin-product-create"
                        component={AdminProductCreate}
                     />
                     <Route path="/admin-user-list" component={AdminUserList} />
                     <Route
                        path="/admin-user-edit/:id"
                        component={AdminUserEditScreen}
                     />
                     <Route
                        path="/admin-order-list"
                        component={AdminOrderListScreen}
                     />
                     <Route
                        path="/admin-order-details/:id"
                        component={AdminOrderDetailsScreen}
                     />
                  </Switch>
               </div>
               <Footer />
            </Router>
         </Provider>
      );
   }
}

export default App;
