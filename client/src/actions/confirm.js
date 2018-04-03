export const setOpen = bool => {
    return {
        type: 'SET_CONFIRM_OPEN',
        payload: bool
    }
};

export const setOnConfirm = func => {
    return {
        type: 'SET_CONFIRM_ACTION',
        payload: func
    }
};

export const setOnCancel = func => {
    return {
        type: 'SET_CANCEL_ACTION',
        payload: func
    }
};

export const setHeader = str => {
    return {
        type: 'SET_MODAL_HEADER',
        payload: str
    }
};

export const setQuestion = str => {
    return {
        type: 'SET_MODAL_QUESTION',
        payload: str
    }
};

export const setEntity = obj => {
    return {
        type: 'ENTITY_TO_HANDLE',
        payload: obj
    }
};

export const resetConfirm = () => {
    return dispatch => {
        dispatch(setOpen(false));
        dispatch(setOnConfirm(() => {return true}));
        dispatch(setOnCancel( () => {return false}));
        dispatch(setHeader(''));
        dispatch(setQuestion(''));
        dispatch(setEntity({}));
    }
};

export const confirm = (action, entity) => {
    return dispatch => {
        action(entity);
        dispatch(resetConfirm());
    }
};

export const cancel = (action, entity) => {
    return dispatch => {
        action(entity);
        dispatch(resetConfirm());
    }
};

