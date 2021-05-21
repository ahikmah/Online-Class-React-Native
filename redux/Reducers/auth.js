const initialState = {
  resultLogin: {},
  errorLogin: {},
  isLoginPending: false,
  isLoginFulfilled: false,
  isLoginRejected: false,

  errorLogout: {},
  isLogoutPending: false,
  isLogoutFulfilled: false,
  isLogoutRejected: false,

  resultRegister: {},
  errorRegister: {},
  isRegisterPending: false,
  isRegisterFulfilled: false,
  isRegisterRejected: false,

  resultUserData: {},
  errorUserData: {},
  currentUser: {},
  isUserDataPending: false,
  isUserDataFulfilled: false,
  isUserDataRejected: false,

  errorOtp: {},
  resultOtp: {},
  isOtpPending: false,
  isOtpFulfilled: false,
  isOtpRejected: false,

  codeOTP: {},

  isLogin: false,
};
const auth = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGOUT_USER_PENDING':
      return {
        ...state,
        isLogoutPending: true,
        isLogoutFulfilled: false,
        isLogoutRejected: false,
      };
    case 'LOGOUT_USER_FULFILLED':
      return {
        ...state,
        isLogoutFulfilled: true,
        isLogoutPending: false,
        ...initialState,
      };
    case 'LOGOUT_USER_REJECTED':
      return {
        ...state,
        isLogoutRejected: true,
        isLogoutPending: false,
        errorLogout: payload,
      };
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLoginPending: true,
        isLoginFulfilled: false,
        isLoginRejected: false,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoginFulfilled: true,
        isLoginPending: false,
        isLogin: true,
        resultLogin: payload.data.result,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoginRejected: true,
        isLoginPending: false,
        errorLogin: payload,
      };
    case 'REGISTER_PENDING':
      return {
        ...state,
        isRegisterPending: true,
        isRegisterFulfilled: false,
        isRegisterRejected: false,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isRegisterFulfilled: true,
        isRegisterPending: false,
        resultRegister: payload.data.result,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isRegisterRejected: true,
        isRegisterPending: false,
        errorRegister: payload,
      };

    case 'GET_DATA_USER_PENDING':
      return {
        ...state,
        isUserDataPending: true,
        isUserDataFulfilled: false,
        isUserDataRejected: false,
      };
    case 'GET_DATA_USER_FULFILLED':
      return {
        ...state,
        isUserDataFulfilled: true,
        isUserDataPending: false,
        isUserObtained: true,
        currentUser: payload.data.result[0],
        resultUserData: payload.data.result[0],
      };
    case 'GET_DATA_USER_REJECTED':
      return {
        ...state,
        isUserDataRejected: true,
        isUserDataPending: false,
        errorUserData: payload,
      };
    case 'SEND_OTP_PENDING':
      return {
        ...state,
        isOtpPending: true,
        isOtpFulfilled: false,
        isOtpRejected: false,
      };
    case 'SEND_OTP_FULFILLED':
      return {
        ...state,
        isOtpFulfilled: true,
        isOtpPending: false,
        resultOtp: payload.data.result,
      };
    case 'SEND_OTP_REJECTED':
      return {
        ...state,
        isOtpRejected: true,
        isOtpPending: false,
        errorOtp: payload,
      };
    case 'CODE_OTP':
      return {
        ...state,
        codeOTP: payload,
      };
    default:
      return state;
  }
};
export default auth;
