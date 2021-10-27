import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class RegisterScreen extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      msg: null,
   };

   componentDidMount() {
      const { isAuthenticated } = this.props;
      if (isAuthenticated) {
         this.props.history.push('/');
      }
   }

   componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props;
      if (error !== prevProps.error) {
         if (error.id === 'USER_REGISTER_FAIL') {
            this.setState({ msg: error.msg });
         } else {
            this.setState({ msg: null });
         }
      }

      if (isAuthenticated) {
         this.props.history.push('/');
         this.props.clearErrors();
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { name, email, password, confirmPassword } = this.state;

      //   Simple Validation
      if (password !== confirmPassword) {
         return this.setState({ msg: 'Password do not match' });
      }

      const newUser = {
         name,
         email,
         password,
      };

      // Attempt Login
      this.props.registerUser(newUser);
   };

   render() {
      const { name, email, password, confirmPassword, msg } = this.state;
      const { userLoading } = this.props;
      return (
         <div className="auth-page">
            <h1>Regsiter</h1>
            {userLoading ? <Loader /> : ''}
            {msg ? <ErrorMessage message={msg} /> : ''}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">name Address</label>
                  <input
                     type="text"
                     name="name"
                     value={name}
                     placeholder="Enter Name"
                     id="name"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                     type="email"
                     name="email"
                     value={email}
                     placeholder="Enter Email"
                     id="email"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     name="password"
                     value={password}
                     placeholder="Enter Password"
                     id="password"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                     type="password"
                     name="confirmPassword"
                     value={confirmPassword}
                     placeholder="Enter Password"
                     id="confirmPassword"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Register</button>
               </div>
               <p>
                  Have an Account? <Link to="/signin">Login</Link>
               </p>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   error: state.error,
   userLoading: state.user.userLoading,
   isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
   RegisterScreen
);
