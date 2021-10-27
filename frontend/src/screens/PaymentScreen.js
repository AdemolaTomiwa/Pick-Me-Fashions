import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePayment } from '../actions/shippingActions';
import CheckoutSteps from '../components/CheckOutSteps';
import ErrorMessage from '../components/ErrorMessage';

class PaymentScreen extends Component {
   state = {
      payment: null,
      errorMsg: null,
   };

   componentDidMount() {
      const { user, shippingAddress } = this.props;

      if (!user) {
         return this.props.history.push('/signin');
      }

      if (!shippingAddress) {
         return this.props.history.push('/shipping');
      }
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/signin');
      }
   }

   onChange = (e) => {
      this.setState({ payment: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      //  Simple validation
      if (this.state.payment === null) {
         this.setState({ errorMsg: 'Please select payment method!' });
      } else {
         this.props.savePayment(this.state.payment);

         this.setState({ errorMsg: null });

         this.props.history.push('/placeorder');
      }
   };

   render() {
      const { errorMsg } = this.state;
      return (
         <div className="container">
            <div className="payment">
               <CheckoutSteps step1 step2 step3 />
               <h1>Payment Method</h1>
               {errorMsg !== null ? <ErrorMessage message={errorMsg} /> : null}
               <form onSubmit={this.onSubmit}>
                  <div>
                     <input
                        type="radio"
                        id="paypal"
                        value="PayPal"
                        name="payment"
                        onChange={this.onChange}
                     />
                     <label htmlFor="paypal">PayPal or Credit Card</label>
                  </div>
                  <div>
                     <input
                        type="radio"
                        id="cash"
                        value="Cash on Delivery"
                        name="payment"
                        onChange={this.onChange}
                     />
                     <label htmlFor="cash">Cash on Delivery</label>
                  </div>
                  <div>
                     <button className="btn btn-primary">Continue</button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   shippingAddress: state.shipping.shippingAddress,
});

export default connect(mapStateToProps, { savePayment })(PaymentScreen);
