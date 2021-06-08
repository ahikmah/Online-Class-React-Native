const initialState = {
  count: 0,
};
const chat = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'NEW_MESSAGE':
      return {
        ...state,
        count: state.count + payload,
      };
    case 'RESET_COUNT':
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};
export default chat;
