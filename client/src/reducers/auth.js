const initialState = {
    isLoginModalOpen: false,
    isAuthenticated: false,
    token: ''
}

export const auth = (state = initialState, action) => {
    switch (action.type){
        case 'IS_LOGIN_MODAL_OPEN':
            return { ...state, isLoginModalOpen: action.payload};
        case 'IS_AUTHENTICATED':
            return { ...state, isAuthenticated: action.payload };
        case 'SET_AUTH_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
}