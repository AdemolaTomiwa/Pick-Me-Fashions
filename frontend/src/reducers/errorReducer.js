import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errorConstant';

const initialState = {
   msg: null,
   status: null,
   id: null,
};

export default function errorReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ERRORS:
         return {
            msg: action.payload.msg,
            id: action.payload.id,
            status: action.payload.status,
         };
      case CLEAR_ERRORS:
         return {
            msg: null,
            status: null,
            id: null,
         };
      default:
         return state;
   }
}
