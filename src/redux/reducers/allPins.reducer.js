const allPinsReducer = (state = [], action) => {
  console.log('THIS IS REDUCER for SET_ALL_PINS', action.payload);
    switch (action.type) {
      case 'SET_ALL_PINS':
        return action.payload;
      case 'UNSET_PROFILE':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default allPinsReducer;
  