const initialState = {
  result: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: {},
  currentUser: {},
};
const auth = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGOUT_USER_PENDING':
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'LOGOUT_USER_FULFILLED':
      return {
        ...state,
        isLogin: false,
        result: {},
      };
    case 'LOGOUT_USER_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: payload,
      };
    case 'LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        isLogin: true,
        result: payload.data.result,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: payload,
      };
    case 'REGISTER_PENDING':
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        result: payload.data.result,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        result: payload,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: {},
      };

    case 'GET_DATA_USER_PENDING':
      return {
        ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_DATA_USER_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        currentUser: payload.data.result[0],
      };
    case 'GET_DATA_USER_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        result: payload,
      };
    default:
      return state;
  }
};
export default auth;
