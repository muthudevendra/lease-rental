
import {getLeaseApi, getLeaseById} from '../../api/lease';
import { toast } from 'react-toastify';
import {generateLeasePaymentCycles} from './payments';
import constants from './constants';

const {
    REQUEST_STATUS,
    LEASE_FETCH,
    LEASE_FETCH_FAILED,
    LEASE_BY_ID_FETCH,
    LEASE_BY_ID_FETCH_FAILED,
    LEASE_PAYMENTS_UPDATE,
} = constants;

export const fetchLeases = () => {
    return async(dispatch) => {
        dispatch({type: REQUEST_STATUS, data: true});
        try {
            const data = await getLeaseApi();
            dispatch({type: LEASE_FETCH, data: data});
        } catch (error) {
            toast.error(error);
            dispatch({type: LEASE_FETCH_FAILED});

        } finally {
            dispatch({type: REQUEST_STATUS, data: false});
        }
    }
}

export const getOneLease = leaseId => {
    
    return async(dispatch) => {
        dispatch({type: REQUEST_STATUS, data: true});
        try {
            const data = await getLeaseById(leaseId);
            dispatch({type: LEASE_BY_ID_FETCH, data: data});
            
            const leaseCycles = generateLeasePaymentCycles(data);
            dispatch({type: LEASE_PAYMENTS_UPDATE, data: leaseCycles});

        } catch (error) {
            toast.error(error);
            dispatch({type: LEASE_BY_ID_FETCH_FAILED});

        } finally {
            dispatch({type: REQUEST_STATUS, data: false});
        }
    }
}
