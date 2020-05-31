import reducer from '../leaseReducer'
import constants from '../constants';

const {
  LEASE_FETCH,
  LEASE_BY_ID_FETCH,
  LEASE_PAYMENTS_UPDATE,
  REQUEST_STATUS
} = constants;

describe('lease reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        leaseData: [],
        selectedLease: null,
        selectedLeasePayments: [],
        loading: false
      }
    )
  })

  it('when handling LEASE_FETCH should update the state on lease item list', () => {
    expect(
      reducer([], {
        type: LEASE_FETCH,
        data: [{id: 'lease1', name: 'Lease One'}]
      })
    ).toEqual(
      {
        leaseData: [{id: 'lease1', name: 'Lease One'}]
      }
    )
  })

  it('when handling LEASE_BY_ID_FETCH should update the selected lease details', () => {
    expect(
      reducer([], {
        type: LEASE_BY_ID_FETCH,
        data: { rent: 234, frequency: 'weekly', payment_day: 'friday', start_date: "2020-05-12", end_date: "2020-06-08"}
      })
    ).toEqual(
      {
        selectedLease: { rent: 234, frequency: 'weekly', payment_day: 'friday', start_date: "2020-05-12", end_date: "2020-06-08"}
      }
    )
  })

  it('when handling LEASE_PAYMENTS_UPDATE should update payment details of selected lease', () => {
    expect(
      reducer([], {
        type: LEASE_PAYMENTS_UPDATE,
        data:[{ amount: "2800.00", days: 28, from: "2020-05-12", to: "2020-06-08"}]
      })
    ).toEqual(
      {
        selectedLeasePayments: [{ amount: "2800.00", days: 28, from: "2020-05-12", to: "2020-06-08"}]
      }
    )
  })

  it('when handling REQUEST_STATUS should update the state loading', () => {
    expect(
      reducer([], {
        type: REQUEST_STATUS,
        data: true
      })
    ).toEqual(
      {
        loading: true
      }
    )
  })
})