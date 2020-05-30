const initialState = {
    leaseData: []
};

const reducer = (state = initialState, action) => {
    const {type, data} = action;
    
    switch (type) {
        case 'LEASE_FETCH':
            return {
                ...state,
                leaseData: data
            }

        default:
            return state;
    }
};

export default reducer;