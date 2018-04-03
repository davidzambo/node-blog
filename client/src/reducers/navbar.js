const initialState = {
    isNavbarOpen: false,
};

const NavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAVBAR_OPEN':
            return { ...state, isNavbarOpen: action.payload};
        default:
            return state;
    }
};

export default NavbarReducer;