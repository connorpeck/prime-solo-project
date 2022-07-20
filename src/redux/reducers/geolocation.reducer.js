const geolocationReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LOCATION':
        return action.payload;
      case 'UNSET_PROFILE':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default geolocationReducer;
  