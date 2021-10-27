import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import Message from '../components/Message';

class ProfileScreen extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: null,
   };

   componentDidMount() {
      const { user } = this.props;

      if (!user) {
         this.props.history.push('/signin');
      } else {
         this.setState({ name: user.name, email: user.email });
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

      const { name, email, password, confirmPassword } = this.state;

      // Simple validation
      if (!name) {
         this.setState({ errorMsg: 'Please enter your Name' });
      } else if (!email) {
         this.setState({ errorMsg: 'Please enter your Email' });
      } else if (!password) {
         this.setState({ errorMsg: 'Please enter your Password' });
      } else if (password.length <= 5) {
         this.setState({ errorMsg: 'Password should be at least 6 character' });
      } else if (password !== confirmPassword) {
         return this.setState({ errorMsg: 'Password do not match' });
      } else {
         const updatedProfile = {
            name,
            email,
            password,
         };
         this.props.updateUserProfile(updatedProfile);
         this.setState({ errorMsg: null });
      }
   };
   render() {
      const { name, email, password, confirmPassword, errorMsg } = this.state;
      const { userUpdated, userLoading } = this.props;
      return (
         <div className="profile-page">
            <h1>User Profile</h1>
            {userLoading ? <Loader /> : ''}
            {errorMsg ? <ErrorMessage message={errorMsg} /> : ''}
            {userUpdated ? <Message message={'Profile Updated!'} /> : null}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="name"
                     name="name"
                     value={name}
                     placeholder="Enter Name"
                     id="name"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="email">Email</label>
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
                     placeholder="Confirm Password"
                     id="confirmPassword"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Update</button>
               </div>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   userUpdated: state.user.userUpdated,
   userLoading: state.user.userLoading,
});

export default connect(mapStateToProps, { updateUserProfile })(ProfileScreen);
