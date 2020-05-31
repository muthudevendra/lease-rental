import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import constants from '../constants';
import * as leaseActions from '../leaseAction';

const {
  LEASE_FETCH,
  LEASE_BY_ID_FETCH,
  LEASE_PAYMENTS_UPDATE,
  REQUEST_STATUS
} = constants;

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('lease action', () => {
    it('creates LEASE_FETCH when fetching leases has been done', () => {        
        fetch.once(JSON.stringify([{id: "lease-a", tenant: "Alex"},  {id: "lease-b", tenant: "Jen"}]))

        const expectedActions = [
            { type: REQUEST_STATUS, data: true },
            { type: LEASE_FETCH, data: [  {id: "lease-a", tenant: "Alex"},  {id: "lease-b", tenant: "Jen"} ] },
            { type: REQUEST_STATUS, data: false }
        ]
        const store = mockStore({ leaseData: [], loading: false })
    
        return store.dispatch(leaseActions.fetchLeases()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates LEASE_PAYMENTS_UPDATE when lease frequency is monthly. payment start same date lease start date', () => {        
        fetch.once(JSON.stringify({id:"lease-a",start_date:"2020-05-12",end_date:"2020-11-13",rent:700,frequency:"monthly",payment_day:"tuesday"}))

        const expectedActions = [
            { type: REQUEST_STATUS, data: true },
            { type: LEASE_BY_ID_FETCH, data: {id:"lease-a",start_date:"2020-05-12",end_date:"2020-11-13",rent:700,frequency:"monthly",payment_day:"tuesday"}},
            { type: LEASE_PAYMENTS_UPDATE, data: [
                { amount: "2800.00", days: 28, from: "2020-05-12", to: "2020-06-08"},
                { amount: "2800.00", days: 28, from: "2020-06-09", to: "2020-07-06"},
                { amount: "2800.00", days: 28, from: "2020-07-07", to: "2020-08-03"},
                { amount: "2800.00", days: 28, from: "2020-08-04", to: "2020-08-31"},
                { amount: "2800.00", days: 28, from: "2020-09-01", to: "2020-09-28"},
                { amount: "2800.00", days: 28, from: "2020-09-29", to: "2020-10-26"},
                { amount: "1800.00", days: 18, from: "2020-10-27", to: "2020-11-13"},
            ]},
            { type: REQUEST_STATUS, data: false }
        ]
        const store = mockStore({ leaseData: [], loading: false })
    
        return store.dispatch(leaseActions.getOneLease()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates LEASE_PAYMENTS_UPDATE when lease frequency is fortnightly. payment start before lease start date', () => {        
        fetch.once(JSON.stringify({id:"lease-a",start_date:"2020-05-25",end_date:"2020-07-28",rent:700,frequency:"fortnightly",payment_day:"friday"}))

        const expectedActions = [
            { type: REQUEST_STATUS, data: true },
            { type: LEASE_BY_ID_FETCH, data: {id:"lease-a",start_date:"2020-05-25",end_date:"2020-07-28",rent:700,frequency:"fortnightly",payment_day:"friday"}},
            { type: LEASE_PAYMENTS_UPDATE, data: [
                { amount: "400.00", days: 4, from: "2020-05-25", to: "2020-05-28"},
                { amount: "1400.00", days: 14, from: "2020-05-29", to: "2020-06-11"},
                { amount: "1400.00", days: 14, from: "2020-06-12", to: "2020-06-25"},
                { amount: "1400.00", days: 14, from: "2020-06-26", to: "2020-07-09"}, 
                { amount: "1400.00", days: 14, from: "2020-07-10", to: "2020-07-23"},
                { amount: "500.00", days: 5, from: "2020-07-24", to: "2020-07-28"},
            ]},
            { type: REQUEST_STATUS, data: false }
        ]
        const store = mockStore({ leaseData: [], loading: false })
    
        return store.dispatch(leaseActions.getOneLease()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates LEASE_PAYMENTS_UPDATE when lease frequency is weekly. payment start after lease start date', () => {        
        fetch.once(JSON.stringify({id:"lease-a",start_date:"2020-05-01",end_date:"2020-06-03",rent:700,frequency:"weekly",payment_day:"wednesday"}))

        const expectedActions = [
            { type: REQUEST_STATUS, data: true },
            { type: LEASE_BY_ID_FETCH, data: {id:"lease-a",start_date:"2020-05-01",end_date:"2020-06-03",rent:700,frequency:"weekly",payment_day:"wednesday"}},
            { type: LEASE_PAYMENTS_UPDATE, data: [
                { amount: "500.00", days: 5, from: "2020-05-01", to: "2020-05-05"},
                { amount: "700.00", days: 7, from: "2020-05-06", to: "2020-05-12"},
                { amount: "700.00", days: 7, from: "2020-05-13", to: "2020-05-19"},
                { amount: "700.00", days: 7, from: "2020-05-20", to: "2020-05-26"},
                { amount: "700.00", days: 7, from: "2020-05-27", to: "2020-06-02"},
                { amount: "100.00", days: 1, from: "2020-06-03", to: "2020-06-03"},
            ]},
            { type: REQUEST_STATUS, data: false }
        ]
        const store = mockStore({ leaseData: [], loading: false })
    
        return store.dispatch(leaseActions.getOneLease()).then(() => {            
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
