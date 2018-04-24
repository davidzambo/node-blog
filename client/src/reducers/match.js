const initialState = {
    matches: [],
};

export const match = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MATCHES':
            return {...state, matches: action.payload};
        case 'SET_MATCHES':
            return {...state, matches: action.payload};
        default:
            return state;
    }
}