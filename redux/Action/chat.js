export const newMessage = data => {
  return {
    type: 'NEW_MESSAGE',
    payload: data,
  };
};
export const resetCount = () => {
  return {
    type: 'RESET_COUNT',
    // payload: data,
  };
};
