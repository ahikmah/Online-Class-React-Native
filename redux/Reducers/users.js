const initialState = {
  allUser: {},
};
const users = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'ALL_USER':
      return {
        ...state,
        allUser: payload,
      };
    default:
      return state;
  }
};
export default users;
