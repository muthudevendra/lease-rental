import {getLeaseApi, getLeaseById} from '../../api/lease';
import {calculateLeasePayments} from './leaseService';

export const fetchLeases = () => {
    return async(dispatch) => {
        dispatch({type: 'REQUEST_STATUS', data: true});
        try {
            const data = await getLeaseApi();
            dispatch({type: 'LEASE_FETCH', data: data})
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: 'REQUEST_STATUS', data: false});
        }
    }
}

export const getOneLease = leaseId => {
    return async(dispatch) => {
        dispatch({type: 'REQUEST_STATUS', data: true});
        try {
            const data = await getLeaseById(leaseId);
            const leaseCycles = calculateLeasePayments(data);
            dispatch({type: 'LEASE_BY_ID_FETCH', data: leaseCycles})
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: 'REQUEST_STATUS', data: false});
        }
    }
}