import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../actions/productActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class AdminProductCreate extends Component {
   state = {
      name: '',
      image: '',
      price: '',
      description: '',
      category: '',
      countInStock: '',
      brand: '',
      imageErr: false,
      errorMessage: false,
      serverError: false,
      imageLoading: false,
   };

   componentDidMount() {
      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/signin');
      }
   }

   componentDidUpdate(prevProps) {
      const { product, isAuthenticated, error } = this.props;

      if (product !== prevProps.product) {
         return this.props.history.push('/admin-product-list');
      }

      if (!isAuthenticated) {
         return this.props.history.push('/signin');
      }

      if (error !== prevProps.error) {
         this.setState({ serverError: true });
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   uploadImage = (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      this.setState({ imageLoading: true });

      const config = {
         headers: {
            'Content-type': 'multi-part/form-data',
         },
      };

      axios
         .post('/api/uploads', formData, config)
         .then((res) => {
            this.setState({
               image: res.data,
               imageErr: false,
               imageLoading: false,
            });
         })
         .catch((err) => {
            this.setState({ image: '', imageErr: true, imageLoading: false });
         });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { name, image, price, brand, category, countInStock, description } =
         this.state;

      // Simple validation
      if (
         !name ||
         !price ||
         !image ||
         !description ||
         !category ||
         !brand ||
         !countInStock
      ) {
         return this.setState({ errorMessage: true });
      }

      const newProduct = {
         name,
         image,
         price,
         description,
         countInStock,
         brand,
         category,
      };

      this.props.createProduct(newProduct);
   };

   render() {
      const {
         name,
         price,
         description,
         category,
         countInStock,
         brand,
         imageErr,
         errorMessage,
         serverError,
         imageLoading,
      } = this.state;

      const { productLoading, error } = this.props;

      return (
         <div className="admin-product-create">
            <h1>Edit Product</h1>
            {errorMessage ? (
               <ErrorMessage message="Please enter all field!" />
            ) : null}
            {serverError ? <ErrorMessage message={error.msg} /> : null}
            {productLoading ? <Loader /> : null}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Enter Product Name"
                     name="name"
                     value={name}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="price">Price</label>
                  <input
                     type="text"
                     id="price"
                     placeholder="Enter Product Price"
                     name="price"
                     value={price}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="image">Image</label>
                  <input
                     type="file"
                     className="file"
                     id="image"
                     name="image"
                     onChange={this.uploadImage}
                  />
                  {imageLoading ? (
                     <Loader />
                  ) : imageErr ? (
                     <p className="image-error">
                        <i className="fas fa-exclamation-circle"></i> Only
                        Image!
                     </p>
                  ) : null}
               </div>
               <div>
                  <label htmlFor="brand">Brand</label>
                  <input
                     type="text"
                     id="brand"
                     placeholder="Enter Product Brand"
                     name="brand"
                     value={brand}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input
                     type="number"
                     id="countInStock"
                     placeholder="Enter Product Count In Stock"
                     name="countInStock"
                     value={countInStock}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="category">Category</label>
                  <input
                     type="text"
                     id="category"
                     placeholder="Enter Product Category"
                     name="category"
                     value={category}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="description">Description</label>

                  <textarea
                     placeholder="Enter Product Description"
                     onChange={this.onChange}
                     value={description}
                     name="description"
                     id="description"
                     cols="30"
                     rows="5"
                  ></textarea>
               </div>
               <div>
                  <button className="btn btn-dark">Add Product</button>
               </div>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   productLoading: state.products.productLoading,
   product: state.products.product,
   error: state.error,
});

export default connect(mapStateToProps, { createProduct })(AdminProductCreate);
