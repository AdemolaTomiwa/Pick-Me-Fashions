import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
   render() {
      const { product } = this.props;
      return (
         <div className="product">
            <Link to={`/product/${product._id}`}>
               <div className="img">
                  <img src={product.image} alt={product.name} />
               </div>
            </Link>

            <div className="details">
               <Link to={`/product/${product._id}`}>
                  <h4>{product.name}</h4>
               </Link>
               <h3>#{product.price}</h3>
            </div>
         </div>
      );
   }
}

export default Product;
