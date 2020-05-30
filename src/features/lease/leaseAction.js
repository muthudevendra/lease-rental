import {getLeaseApi, getLeaseById} from '../../api/lease';


export const fetchLeases = () => {
    return async(dispatch) => {
        try {
            const data = await getLeaseApi();
            dispatch({type: 'LEASE_FETCH', data: data})
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOneLease = leaseId => {
    return async(dispatch) => {
        try {
            const data = await getLeaseById();
            dispatch({type: 'LEASE_BY_ID_FETCH', data: data})
        } catch (error) {
            console.log(error);
        }
    }
}