import { createAction } from 'redux-actions';
import { sendRequest } from '../../helpers/api';

export const REQUEST_POSTERS = 'REQUEST_POSTERS';
export const SUCCESS_RETRIEVE_POSTERS = 'SUCCESS_RETRIEVE_POSTERS';
export const FAIL_RETRIEVE_POSTERS = 'FAIL_RETRIEVE_POSTERS';

export const successRetrievePosters = createAction(SUCCESS_RETRIEVE_POSTERS);
export const failRetrievePosters = createAction(FAIL_RETRIEVE_POSTERS);
export const requestPosters = createAction(REQUEST_POSTERS);

export const getPosters = keyword => dispatch => {
    dispatch(requestPosters());
    return sendRequest(`/api/search?keyword=${keyword}`)
        .then(response => {
            dispatch(successRetrievePosters(response.data));
        })
        .catch(err => {
            console.log(err);
            // Do some error handling
            dispatch(failRetrievePosters());
        });
};