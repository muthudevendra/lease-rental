import constants from './constants';

const {
    REQUEST_STATUS,
    LEASE_FETCH,
    LEASE_FETCH_FAILED,
    LEASE_BY_ID_FETCH,
    LEASE_BY_ID_FETCH_FAILED,
    LEASE_PAYMENTS_UPDATE
} = constants;

const initialState = {
    leaseData: [],
    selectedLease: null,
    selectedLeasePayments: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LEASE_FETCH:
            return {
                ...state,
                leaseData: action.data
            };

        case LEASE_FETCH_FAILED:
            return {
                ...state,
                leaseData: initialState.leaseData
            };

        case LEASE_BY_ID_FETCH:
            return {
                ...state,
                selectedLease: action.data
            };
        
        case LEASE_BY_ID_FETCH_FAILED:
            return {
                ...state,
                selectedLease: initialState.selectedLease,
                selectedLeasePayments: initialState.selectedLeasePayments
            };
            
        case LEASE_PAYMENTS_UPDATE:
            return {
                ...state,
                selectedLeasePayments: action.data
            }

        case REQUEST_STATUS:
            return {
                ...state,
                loading: action.data
            };

        default:
            return state;
    }
};

export default reducer;