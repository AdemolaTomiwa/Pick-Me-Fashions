import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class SigninScreen extends Component {
   state = {
      email: '',
      password: '',
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
         if (error.id === 'USER_LOGIN_FAIL') {
            this.setState({ msg: error.msg });
         } else {
            this.setState({ msg: null });
         }
      }

      if (isAuthenticated) {
         this.props.history.push('/');
         this.props.clearErrors();
      }

      const redirect = this.props.location.search
         ? this.props.location.search.split('=')[1]
         : '/';

      if (isAuthenticated === true) {
         return this.props.history.push(redirect);
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { email, password } = this.state;

      const user = {
         email,
         password,
      };

      // Attempt Login
      this.props.loginUser(user);
   };

   render() {
      const { email, password, msg } = this.state;
      const { userLoading } = this.props;
      return (
         <div className="auth-page">
            <h1>Sign In</h1>
            {userLoading ? <Loader /> : ''}
            {msg ? <ErrorMessage message={msg} /> : ''}
            <form onSubmit={this.onSubmit}>
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
                  <button className="btn btn-primary">Sign In</button>
               </div>
               <p>
                  New Customer? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { loginUser, clearErrors })(
   SigninScreen
);
