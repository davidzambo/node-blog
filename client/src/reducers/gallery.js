const initialState = {
    galleries: []
}

export const gallery = (state = initialState, action) => {
    switch (action.type){
        case 'SET_GALLERIES':
            return { ...state, galleries: action.payload};
        default:
            return state;
    }
}