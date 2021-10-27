import axios from 'axios';
import {
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_LIST_FAIL,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_MY_LIST_FAIL,
   ORDER_MY_LIST_REQUEST,
   ORDER_MY_LIST_SUCCESS,
   ORDER_PAY_FAIL,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
} from '../constants/orderConstant';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

// Get all order
export const getOrders = () => (dispatch, getState) => {
   dispatch({
      type: ORDER_LIST_REQUEST,
   });

   axios
      .get(' /api/orders', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         const errorMsg = 'An error occured! Please try again in one minute!';
         dispatch(returnErrors(errorMsg, 400, 'ORDER_LIST_FAIL'));
         dispatch({
            type: ORDER_LIST_FAIL,
         });
      });
};

export const createOrder = (order) => (dispatch, getState) => {
   dispatch({
      type: ORDER_CREATE_REQUEST,
   });

   axios
      .post(' /api/orders', order, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res.data,
         });
         localStorage.removeItem('cartItems');
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_CREATE_FAIL'
            )
         );
         dispatch({
            type: ORDER_CREATE_FAIL,
         });
      });
};

// Get an order from DB by the ID
export const getOrder = (id) => (dispatch, getState) => {
   dispatch({
      type: ORDER_DETAILS_REQUEST,
   });

   axios
      .get(` /api/orders/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_DETAILS_FAIL'
            )
         );
         dispatch({
            type: ORDER_DETAILS_FAIL,
         });
      });
};

// Pay order action
export const payOrder = (orderId, paymentResult) => (dispatch, getState) => {
   dispatch({
      type: ORDER_PAY_REQUEST,
   });

   axios
      .put(` /api/orders/${orderId}/pay`, paymentResult, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_PAY_FAIL'
            )
         );
         dispatch({
            type: ORDER_PAY_FAIL,
         });
      });
};

// Pay on cash order action
export const payCashOrder = (orderId) => (dispatch, getState) => {
   dispatch({
      type: ORDER_PAY_REQUEST,
   });

   axios
      .put(` /api/orders/${orderId}/pay/cash`, {}, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_PAY_FAIL'
            )
         );
         dispatch({
            type: ORDER_PAY_FAIL,
         });
      });
};

// Deliver order action
export const deliverOrder = (order) => (dispatch, getState) => {
   dispatch({
      type: ORDER_DELIVER_REQUEST,
   });

   axios
      .put(` /api/orders/${order._id}/deliver`, order, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_DELIVER_FAIL'
            )
         );
         dispatch({
            type: ORDER_DELIVER_FAIL,
         });
      });
};

export const listMyOrders = () => (dispatch, getState) => {
   dispatch({
      type: ORDER_MY_LIST_REQUEST,
   });

   axios
      .get('/api/orders/myorders/mine', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(
            returnErrors(
               err.response.data.msg,
               err.response.status,
               'ORDER_MY_LIST_FAIL'
            )
         );
         dispatch({
            type: ORDER_MY_LIST_FAIL,
         });
      });
};
