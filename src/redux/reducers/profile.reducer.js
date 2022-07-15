const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE':
      return action.payload;
    case 'UNSET_PROFILE':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default profileReducer;
