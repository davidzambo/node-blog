const initialState = {
    isOpen: false,
    onConfirm(){ console.log('confirm'); return true},
    onCancel(){ console.log('cancel'); return true},
    header: '',
    question: '',
    entity: {},
};
export const confirm = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONFIRM_OPEN':
            return { ...state, isOpen: action.payload};
        case 'SET_CONFIRM_ACTION':
            return {...state, onConfirm: action.payload};
        case 'SET_CANCEL_ACTION':
            return {...state, onCancel: action.payload};
        case 'SET_MODAL_HEADER':
            return {...state, header: action.payload};
        case 'SET_MODAL_QUESTION':
            return {...state, question: action.payload};
        case 'ENTITY_TO_HANDLE':
            return {...state, entity: action.payload};
        default:
            return state;
    }
};
