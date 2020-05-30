import http from './http';

// Get all lease items
export const getLeaseApi = () => {
	return http.jsonGet('/leases');
};

// Retrieve lease details by leaseId
export const getLeaseById = leaseId => {
	return http.jsonGet(`/leases/:${leaseId}`);
};
