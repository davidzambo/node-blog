const initialState = {
    isLoginModalOpen: false,
    isAuthenticated: true,
    authUser: {
        email: '',
    }
}

export const auth = (state = initialState, action) => {
    switch (action.type){
        case 'IS_LOGIN_MODAL_OPEN':
            return { ...state, isLoginModalOpen: action.payload};
        case 'IS_AUTHENTICATED':
            return { ...state, isAuthenticated: action.payload };
        case 'SET_AUTH_USER':
            return { ...state, authUser: action.payload };
        default:
            return state;
    }
}