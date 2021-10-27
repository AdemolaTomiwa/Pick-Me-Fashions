import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Product from '../components/Product';

class ProductListScreen extends Component {
   state = {
      msg: null,
   };
   componentDidUpdate(prevProps) {
      const { error } = this.props;
      if (error !== prevProps.error) {
         // Check for PRODUCT LIST FAIL Error
         if (error.id === 'PRODUCT_LIST_FAIL') {
            this.setState({ msg: error.msg });
         } else {
            this.setState({ msg: null });
         }
      }
   }

   render() {
      const { productLoading, products, error } = this.props;
      return (
         <div className="product-list">
            <h1>Latest Products</h1>
            {productLoading ? (
               <Loader />
            ) : error.msg !== null ? (
               <ErrorMessage message={error.msg} />
            ) : products.length === 0 ? (
               <div className="alert">Your Product list is empty.</div>
            ) : (
               <div className="products">
                  {products.map((product) => (
                     <Product key={product._id} product={product} />
                  ))}
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   products: state.products.products,
   productLoading: state.products.productLoading,
   error: state.error,
});

export default connect(mapStateToProps, {})(ProductListScreen);
