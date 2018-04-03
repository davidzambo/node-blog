import axios from 'axios';
import {resetConfirm} from "./confirm";

export const fetchMatches = () => {
    return dispatch => {
        axios.get('/api/matches')
            .then( response => {
                dispatch(setMatches(response.data.matches));
                dispatch(resetConfirm());
            }).catch( err => {
                console.log(err);
        });
    }
}

export const setMatches = matches => {
    return {
        type: 'SET_MATCHES',
        payload: matches
    }
};