const initialState = {
  spaces: [],
  orders: [],
  specialButtonAction: () => {
    console.log('specialButtonAction not set');
  },
  specialButtonActive: false,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'SET_SPACES':
      return {
        ...state,
        spaces: action.payload,
      };
    case 'SET_SPECIAL_BUTTON_ACTION':
      return {
        ...state,
        specialButtonAction: action.payload,
      };
    case 'SET_SPECIAL_BUTTON_ACTIVE':
      return {
        ...state,
        specialButtonActive: action.payload,
      };
    default:
      return state;
  }
};

export {initialState};
export default storeReducer;
