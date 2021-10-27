import axios from 'axios';
import {
   USER_DELETE_FAIL,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
} from '../constants/userConstant';
import { returnErrors } from './errorActions';

// Login existing user
export const loginUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOGIN_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post(' /api/auth', user, config)
      .then((res) => {
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
         });
         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_LOGIN_FAIL'
            )
         );
         dispatch({
            type: USER_LOGIN_FAIL,
         });
      });
};

// Register new user
export const registerUser = (user) => (dispatch) => {
   dispatch({
      type: USER_REGISTER_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post(' /api/users', user, config)
      .then((res) => {
         dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data,
         });
         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_REGISTER_FAIL'
            )
         );
         dispatch({
            type: USER_REGISTER_FAIL,
         });
      });
};

// Logout user
export const logout = () => (dispatch) => {
   dispatch({
      type: USER_LOGOUT_SUCCESS,
   });

   localStorage.removeItem('userToken');
   localStorage.removeItem('user');
   localStorage.removeItem('cartItems');
   localStorage.removeItem('shippingAddress');
};

// Get list of users from DB
export const getUserList = () => (dispatch, getState) => {
   dispatch({
      type: USER_LIST_REQUEST,
   });

   axios
      .get(' /api/users', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         const errorMsg = 'An error occured! Please try again in one minute!';
         dispatch(
            returnErrors(errorMsg, err.response.status, 'USER_LIST_FAIL')
         );
         dispatch({
            type: USER_LIST_FAIL,
         });
      });
};

export const deleteUser = (id) => (dispatch, getState) => {
   dispatch({
      type: USER_DELETE_REQUEST,
   });

   axios
      .delete(` /api/users/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_DELETE_SUCCESS,
            payload: id,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_DELETE_FAIL'
            )
         );
         dispatch({
            type: USER_DELETE_FAIL,
         });
      });
};

// Get a User from DB by the ID
export const getUser = (id) => (dispatch, getState) => {
   dispatch({
      type: USER_DETAILS_REQUEST,
   });

   axios
      .get(` /api/users/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_DETAILS_FAIL'
            )
         );
         dispatch({
            type: USER_DETAILS_FAIL,
         });
      });
};

export const updateUserProfile = (user) => (dispatch, getState) => {
   dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
   });

   axios
      .put(' /api/users/profile/mine', user, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: res.data,
         });
         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
         dispatch({
            type: USER_UPDATE_PROFILE_RESET,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_UPDATE_PROFILE_FAIL'
            )
         );
         dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
         });
      });
};

export const updateUser = (id, updatedUser) => (dispatch, getState) => {
   dispatch({
      type: USER_UPDATE_REQUEST,
   });

   axios
      .put(` /api/users/${id}`, updatedUser, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'USER_UPDATE_FAIL'
            )
         );
         dispatch({
            type: USER_UPDATE_FAIL,
         });
      });
};

export const tokenConfig = (getState) => {
   const token = getState().user.token;

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   if (token) {
      config.headers['x-auth-token'] = token;
   }

   return config;
};
