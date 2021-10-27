import {
   LATEST_PRODUCT_LIST_FAIL,
   LATEST_PRODUCT_LIST_REQUEST,
   LATEST_PRODUCT_LIST_SUCCESS,
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
} from '../constants/productConstant';

const initialState = {
   products: [],
   product: {},
   latestProducts: [],
   productLoading: false,
};

export default function productReducer(state = initialState, action) {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
      case PRODUCT_DETAILS_REQUEST:
      case PRODUCT_CREATE_REQUEST:
      case PRODUCT_DELETE_REQUEST:
      case LATEST_PRODUCT_LIST_REQUEST:
         return {
            ...state,
            productLoading: true,
         };
      case PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            products: action.payload,
            productLoading: false,
         };
      case LATEST_PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            latestProducts: action.payload,
            productLoading: false,
         };
      case PRODUCT_LIST_FAIL:
         return {
            ...state,
            products: [],
            productLoading: false,
         };
      case LATEST_PRODUCT_LIST_FAIL:
         return {
            ...state,
            productLoading: false,
         };
      case PRODUCT_DETAILS_SUCCESS:
         return {
            ...state,
            product: action.payload,
            productLoading: false,
         };
      case PRODUCT_DETAILS_FAIL:
         return {
            ...state,
            product: {},
            productLoading: false,
         };
      case PRODUCT_CREATE_SUCCESS:
         return {
            ...state,
            ...action.payload,
            productLoading: false,
         };
      case PRODUCT_DELETE_SUCCESS:
         return {
            ...state,
            productLoading: false,
            products: state.products.filter(
               (product) => product._id !== action.payload
            ),
         };
      case PRODUCT_CREATE_FAIL:
      case PRODUCT_DELETE_FAIL:
         return {
            ...state,
            productLoading: false,
         };
      default:
         return state;
   }
}
