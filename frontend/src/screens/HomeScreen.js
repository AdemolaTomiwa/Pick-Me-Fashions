import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, latestProduct } from '../actions/productActions';
import { clearErrors } from '../actions/errorActions';
import ProductListScreen from './ProductListScreen';
import ProductCarousel from '../components/ProductCarousel';

class HomeScreen extends Component {
   componentDidMount() {
      this.props.getProducts();
      this.props.latestProduct();
      this.props.clearErrors();
   }

   render() {
      return (
         <div className="home-screen">
            <ProductCarousel />
            <ProductListScreen />
         </div>
      );
   }
}

export default connect(null, {
   getProducts,
   latestProduct,
   clearErrors,
})(HomeScreen);
