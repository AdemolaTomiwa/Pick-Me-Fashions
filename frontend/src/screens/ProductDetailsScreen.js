import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct } from '../actions/productActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class ProductDetailsScreen extends Component {
   state = {
      qty: '1',
   };

   componentDidMount() {
      const id = this.props.match.params.id;
      this.props.getProduct(id);
   }

   setQty = (e) => {
      this.setState({ qty: e.target.value });
   };

   addToCart = () => {
      const id = this.props.match.params.id;
      this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
   };

   render() {
      const { error, productLoading, product } = this.props;
      return (
         <>
            {productLoading ? (
               <Loader />
            ) : error.msg !== null ? (
               <>
                  <div className="back">
                     <Link to="/">Go Back</Link>
                  </div>
                  <ErrorMessage message={error.msg} />
               </>
            ) : (
               <div className="product-details">
                  <div className="back">
                     <Link to="/">Go Back</Link>
                  </div>
                  <div className="details">
                     <div className="img">
                        <img src={product.image} alt={product.name} />
                     </div>
                     <div className="title">
                        <h2>{product.name}</h2>
                        <div className="line"></div>
                        <p>Price: #{product.price}</p>
                        <div className="line"></div>
                        <p>Description: {product.description}</p>
                     </div>
                     <div className="box">
                        <div>
                           <p>Price: </p> <span>#{product.price}</span>
                        </div>
                        <div>
                           <p>Status: </p>{' '}
                           <span>
                              {product.countInStock >= 1
                                 ? 'In Stock'
                                 : 'Out of Stock'}
                           </span>
                        </div>
                        {product.countInStock >= 1 ? (
                           <div className="select-box">
                              <p>Qty:</p>
                              <div className="select">
                                 <select
                                    value={this.state.qty}
                                    onChange={this.setQty}
                                 >
                                    {[
                                       ...Array(product.countInStock).keys(),
                                    ].map((x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    ))}
                                 </select>
                                 <i className="fas fa-caret-down"></i>
                              </div>
                           </div>
                        ) : null}
                        <div onClick={this.addToCart} className="button">
                           <button
                              disabled={product.countInStock <= 0}
                              className="btn btn-primary"
                           >
                              Add To cart
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </>
      );
   }
}

const mapStateToProps = (state) => ({
   error: state.error,
   product: state.products.product,
   productLoading: state.products.productLoading,
});

export default connect(mapStateToProps, { getProduct })(ProductDetailsScreen);
