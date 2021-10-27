import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';

class CartScreen extends Component {
   componentDidMount() {
      const id = this.props.match.params.id;
      const qty = this.props.location.search
         ? Number(this.props.location.search.split('=')[1])
         : '1';

      if (id) {
         this.props.addToCart(id, qty);
      } else {
         return;
      }
   }

   componentDidUpdate(prevProps) {
      const { cartItems } = this.props;
      if (cartItems !== prevProps.cartItems) {
         this.props.history.push('/cart');
      }
   }

   checkOutHandler = (e) => {
      const { user } = this.props;
      if (!user) {
         this.props.history.push('/signin?redirect=shipping');
      } else {
         this.props.history.push('/shipping');
      }
   };

   render() {
      const { cartItems, cartLoading } = this.props;
      return (
         <div className="cart-page">
            {cartLoading ? (
               <Loader />
            ) : (
               <div className="cart">
                  <div className="cart-content">
                     <h1>Shopping Cart</h1>
                     {cartItems.length === 0 ? (
                        <div className="alert">
                           Your cart is empty. <Link to="/">Go Back</Link>
                        </div>
                     ) : (
                        <div className="cart-items">
                           {cartItems.map((item) => (
                              <CartItem key={item.id} item={item} />
                           ))}
                        </div>
                     )}
                  </div>
                  <div className="box">
                     <div className="title">
                        <h3>
                           Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                           ) items
                        </h3>
                        <h4>
                           #{' '}
                           {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </h4>
                     </div>
                     <div onClick={this.checkOutHandler} className="button">
                        <button
                           disabled={cartItems.length <= 0}
                           className="btn btn-primary"
                        >
                           Proceed to checkout
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   cartItems: state.cart.cartItems,
   cartLoading: state.cart.cartLoading,
});

export default connect(mapStateToProps, { addToCart })(CartScreen);
