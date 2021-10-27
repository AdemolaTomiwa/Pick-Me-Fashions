import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrder, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

class OrderReviewScreen extends Component {
   componentDidMount() {
      const id = this.props.match.params.id;

      const { order, user } = this.props;

      if (!user) {
         return this.props.history.push('/signin');
      }

      const addPayPalScript = async () => {
         const { data: clientId } = await axios.get('/api/config/paypal');
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
         script.async = true;
         script.onload = () => {
            this.setState({ sdk: true });
         };
         document.body.appendChild(script);
      };
      // window.location.reload(false);

      if (!order || order._id !== id) {
         this.props.getOrder(id);
      } else if (!order.isPaid) {
         if (!window.paypal) {
            addPayPalScript();
         } else {
            this.setState({ sdk: true });
         }
      }
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/signin');
      }
   }

   successPaymentHandler = (paymentResult) => {
      const { order } = this.props;
      this.props.payOrder(order._id, paymentResult);
   };
   render() {
      const { order, orderLoading, loadingPay, error } = this.props;
      return (
         <div className="order-review-page">
            <div className="order-review">
               {orderLoading ? (
                  <Loader />
               ) : error.msg !== null ? (
                  <ErrorMessage message={error.msg} />
               ) : order === null ? (
                  <Loader />
               ) : (
                  <>
                     <h1>Order {order._id}</h1>
                     <div className="boxes">
                        <div className="box">
                           <h3>Shipping</h3>
                           <p>Name: {order.userObject.name} </p>
                           <p>Email: {order.userObject.email} </p>
                           <p>
                              Address: {order.shippingAddress.address},{' '}
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.postalCode},{' '}
                              {order.shippingAddress.country}{' '}
                           </p>
                           {order.isDelivered ? (
                              <Message
                                 message={`Delivered at ${order.deliveredAt}`}
                              />
                           ) : (
                              <ErrorMessage message={'Not Delivered'} />
                           )}
                        </div>
                        <div className="box">
                           <h3>Payment Method</h3>
                           <p>Method: {order.paymentMethod}</p>
                           {order.isPaid ? (
                              <Message message={`Paid at ${order.paidAt}`} />
                           ) : (
                              <ErrorMessage message="Not Paid" />
                           )}
                        </div>
                        <div className="box">
                           <h3>Order Items</h3>
                           {order.orderItems.map((item) => (
                              <div key={item._id} className="item-box">
                                 <div className="img">
                                    <img src={item.image} alt={item.name} />
                                 </div>
                                 <div className="name">
                                    <h5> {item.name} </h5>
                                 </div>
                                 <div className="qty">
                                    <h5>
                                       {item.qty} x {item.price} = #{' '}
                                       {item.qty * item.price}
                                    </h5>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </>
               )}
            </div>
            <div className="summary-box">
               {order === null ? (
                  <Loader />
               ) : (
                  <div className="box">
                     <div>
                        <h3>Order Summary</h3>
                     </div>
                     <div>
                        <p>Items:</p>
                        <span># {order.itemPrice} </span>
                     </div>
                     <div>
                        <p>Shipping:</p>
                        <span># {order.shippingPrice} </span>
                     </div>
                     <div>
                        <p>Tax:</p>
                        <span># {order.taxPrice} </span>
                     </div>
                     <div>
                        <p>Total:</p>
                        <span>
                           <b># {order.totalPrice}</b>{' '}
                        </span>
                     </div>
                     {!order.isPaid ? (
                        order.paymentMethod === 'PayPal' ? (
                           <>
                              {loadingPay ? <Loader /> : null}
                              <PayPalButton
                                 amount={order.totalPrice}
                                 onSuccess={this.successPaymentHandler}
                              />
                           </>
                        ) : null
                     ) : null}
                  </div>
               )}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   order: state.order.order,
   orderLoading: state.order.orderLoading,
   loadingPay: state.order.loading,
   successPay: state.order.success,
   error: state.error,
});

export default connect(mapStateToProps, { getOrder, payOrder })(
   OrderReviewScreen
);
