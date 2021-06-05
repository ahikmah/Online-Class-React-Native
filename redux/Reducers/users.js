const initialState = {
  resultUserList: {},
  errorUserList: {},
  isUserListPending: false,
  isUserListFulfilled: false,
  isUserListRejected: false,
};

const users = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isUserListPending: true,
        isUserListFulfilled: false,
        isUserListRejected: false,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isUserListFulfilled: true,
        isUserListPending: false,
        resultUserList: payload.data.result,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isUserListRejected: true,
        isUserListPending: false,
        errorUserList: payload,
      };
    default:
      return state;
  }
};
export default users;
