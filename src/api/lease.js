import http from './http';

export const getLeaseApi = () => {
	return http.jsonGet('/leases');
};

export const getLeaseById = leaseId => {
	return http.jsonGet(`/leases/:${leaseId}`);
};
