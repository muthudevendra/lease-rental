import { combineReducers } from 'redux';
import leaseReducer from '../features/lease/leaseReducer';

export default combineReducers({
    lease: leaseReducer
});