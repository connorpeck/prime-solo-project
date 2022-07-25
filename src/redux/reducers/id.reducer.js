const idReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PINS':
        return action.payload;
      case 'UNSET_PROFILE':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default idReducer;
  