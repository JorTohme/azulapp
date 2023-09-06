const initialState = {
  orders: [],
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export {initialState};
export default storeReducer;
