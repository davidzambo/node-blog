const initialState = {
    isNavbarOpen: false,
};

export const navbar = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAVBAR_OPEN':
            return { ...state, isNavbarOpen: action.payload};
        default:
            return state;
    }
};