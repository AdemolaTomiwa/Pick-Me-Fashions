import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../actions/userActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class AdminUserEditScreen extends Component {
   state = {
      id: '',
      name: '',
      email: '',
      isAdmin: '',
   };

   componentDidMount() {
      const id = this.props.match.params.id;

      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/signin');
      }

      this.props.getUser(id);
   }

   componentDidUpdate(prevProps) {
      const { isAuthenticated, singleUser, updateSuccess } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/signin');
      }

      if (singleUser !== prevProps.singleUser) {
         return this.setState({
            isAdmin: singleUser.isAdmin,
            name: singleUser.name,
            email: singleUser.email,
            id: singleUser._id,
         });
      }

      if (updateSuccess) {
         this.props.history.push('/admin-user-list');
      }
   }

   onChange = () => {
      this.setState({ isAdmin: !this.state.isAdmin });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { id } = this.state;

      const updatedUser = {
         isAdmin: this.state.isAdmin,
      };

      this.props.updateUser(id, updatedUser);
   };

   render() {
      const { isAdmin, name, email } = this.state;
      const { userLoading, error } = this.props;
      return (
         <div className="admin-user-edit">
            <h1>User Edit</h1>
            {userLoading ? (
               <Loader />
            ) : error.msg !== null ? (
               <ErrorMessage message={error.msg} />
            ) : (
               <form onSubmit={this.onSubmit}>
                  <div>
                     <div className="box">
                        <label htmlFor="name">Name</label>
                        <div>{name}</div>
                     </div>
                     <div className="box">
                        <label htmlFor="email">Email</label>
                        <div>{email}</div>
                     </div>
                     <div className="checkbox">
                        <input
                           value={isAdmin}
                           checked={isAdmin}
                           type="checkbox"
                           id="isAdmin"
                           name="isAdmin"
                           onChange={this.onChange}
                        />
                        <label htmlFor="isAdmin">Is Admin</label>
                     </div>
                     <div>
                        <button className="btn btn-dark">Update</button>
                     </div>
                  </div>
               </form>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   userLoading: state.user.userLoading,
   isAuthenticated: state.user.isAuthenticated,
   error: state.error,
   singleUser: state.user.singleUser,
   updateSuccess: state.user.updateSuccess,
});

export default connect(mapStateToProps, { getUser, updateUser })(
   AdminUserEditScreen
);
