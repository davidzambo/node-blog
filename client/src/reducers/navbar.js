const initialState = 'home';

const NavbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAVBAR':
      return action.payload;
    default:
      return state;
  }
};

export default NavbarReducer;