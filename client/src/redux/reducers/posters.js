import { handleActions } from "redux-actions";
import { SUCCESS_RETRIEVE_POSTERS, FAIL_RETRIEVE_POSTERS, REQUEST_POSTERS } from "../actions/posters";

const initialState = {
    isFetching: false,
    posters: [],
};

const ACTION_HANDLERS = {
    [SUCCESS_RETRIEVE_POSTERS]: (state, action) => ({
        ...state,
        isFetching: false,
        posters: action.payload.posters,
    }),
    [FAIL_RETRIEVE_POSTERS]: state => ({
        ...state,
        isFetching: false,
    }),
    [REQUEST_POSTERS]: state => ({
        ...state,
        isFetching: true,
    })
};

export const postersReducer = handleActions(ACTION_HANDLERS, initialState);