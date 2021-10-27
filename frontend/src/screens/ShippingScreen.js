import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveShipping } from '../actions/shippingActions';
import CheckOutSteps from '../components/CheckOutSteps';
import ErrorMessage from '../components/ErrorMessage';

class ShippingScreen extends Component {
   state = {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      errorMsg: null,
   };

   componentDidMount() {
      const { user, shippingAddress } = this.props;

      if (!user) {
         return this.props.history.push('/signin');
      }

      if (shippingAddress) {
         const { address, city, country, postalCode } = shippingAddress;

         this.setState({ address, city, country, postalCode });
      } else {
         return;
      }
   }

   componentDidUpdate(prevProps) {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/signin');
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { country, city, postalCode, address } = this.state;
      // Simple validation
      if (!address) {
         this.setState({ errorMsg: 'Please enter your address' });
      } else if (!city) {
         this.setState({ errorMsg: 'Please enter your city' });
      } else if (!postalCode) {
         this.setState({ errorMsg: 'Please enter your Postal Code' });
      } else if (!country) {
         this.setState({ errorMsg: 'Please enter your country' });
      } else {
         const addressData = {
            address,
            country,
            city,
            postalCode,
         };

         this.props.saveShipping(addressData);
         this.props.history.push('/payment');
      }
   };

   render() {
      const { address, city, postalCode, country, errorMsg } = this.state;
      return (
         <div className="container">
            <div className="shipping">
               <CheckOutSteps step1 step2 />
               <h1>Shipping</h1>
               {errorMsg !== null ? <ErrorMessage message={errorMsg} /> : null}
               <form onSubmit={this.onSubmit}>
                  <div>
                     <label htmlFor="address">Address</label>
                     <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        placeholder="Enter Address"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="city">City</label>
                     <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        placeholder="Enter City"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="postalCode">Postal Code</label>
                     <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        placeholder="Enter Postal Code"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="country">Country</label>
                     <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        placeholder="Enter Country"
                        onChange={this.onChange}
                     />
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

export default connect(mapStateToProps, { saveShipping })(ShippingScreen);
