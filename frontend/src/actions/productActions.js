import axios from 'axios';
import {
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   LATEST_PRODUCT_LIST_FAIL,
   LATEST_PRODUCT_LIST_REQUEST,
   LATEST_PRODUCT_LIST_SUCCESS,
} from '../constants/productConstant';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

// Get all products from DB
export const getProducts = () => (dispatch) => {
   dispatch({
      type: PRODUCT_LIST_REQUEST,
   });

   axios
      .get('/api/products')
      .then((res) => {
         dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         const errorMsg = 'An error occured! Please try again in one minute!';
         dispatch(returnErrors(errorMsg, 400, 'PRODUCT_LIST_FAIL'));
         dispatch({
            type: PRODUCT_LIST_FAIL,
         });
      });
};

// Get a product from DB by the ID
export const getProduct = (id) => (dispatch) => {
   dispatch({
      type: PRODUCT_DETAILS_REQUEST,
   });

   axios
      .get(`/api/products/${id}`)
      .then((res) => {
         dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'PRODUCT_DETAILS_FAIL'
            )
         );
         dispatch({
            type: PRODUCT_DETAILS_FAIL,
         });
      });
};

export const createProduct = (product) => (dispatch, getState) => {
   dispatch({
      type: PRODUCT_CREATE_REQUEST,
   });

   const user = getState().user.user;

   if (user.isAdmin) {
      axios
         .post('/api/products', product, tokenConfig(getState))
         .then((res) => {
            dispatch({
               type: PRODUCT_CREATE_SUCCESS,
               payload: res.data,
            });
         })
         .catch((err) => {
            dispatch(
               returnErrors(
                  err.response.data.msg,
                  err.response.status,
                  'PRODUCT_CREATE_FAIL'
               )
            );
            dispatch({
               type: PRODUCT_CREATE_FAIL,
            });
         });
   } else {
      dispatch({
         type: PRODUCT_CREATE_FAIL,
      });
   }
};

export const deleteProduct = (id) => (dispatch, getState) => {
   dispatch({
      type: PRODUCT_DELETE_REQUEST,
   });

   axios
      .delete(`/api/products/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: id,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'PRODUCT_DELETE_FAIL'
            )
         );
         dispatch({
            type: PRODUCT_DELETE_FAIL,
         });
      });
};

export const latestProduct = () => (dispatch) => {
   dispatch({
      type: LATEST_PRODUCT_LIST_REQUEST,
   });

   axios
      .get('/api/products/latest/products')
      .then((res) => {
         dispatch({
            type: LATEST_PRODUCT_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'LATEST_PRODUCT_LIST_FAIL'
            )
         );
         dispatch({
            type: LATEST_PRODUCT_LIST_FAIL,
         });
      });
};
