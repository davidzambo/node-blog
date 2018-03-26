export const isAuthenticated = (bool) => {
    return {
        type: 'IS_AUTHENTICATED',
        payload: bool,
    }
}

export const isLoginModalOpen = (bool) => {
    return {
        type: 'IS_LOGIN_MODAL_OPEN',
        payload: bool
    }
}

export const setAuthToken = (token) => {
    return {
        type: 'SET_AUTH_TOKEN',
        payload: token
    }
}