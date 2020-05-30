const initialState = {
    leaseData: [],
    selectedLease: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'LEASE_FETCH':
            return {
                ...state,
                leaseData: action.data
            };

        case 'LEASE_BY_ID_FETCH':
            return {
                ...state,
                selectedLease: action.data
            };

        case 'REQUEST_STATUS':
            return {
                ...state,
                loading: action.data
            };

        default:
            return state;
    }
};

export default reducer;