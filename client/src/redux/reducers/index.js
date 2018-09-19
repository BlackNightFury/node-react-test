import { combineReducers } from 'redux';
import { postersReducer } from './posters';

const reducers = combineReducers({
    posters: postersReducer,
});

export default reducers;