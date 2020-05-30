const BASE_URL = process.env.REACT_APP_API_BASE;

class Http {
	addHeader = (name, value) => {
		this.headers[name] = value;
	};


	jsonGet = action => (new Promise((resolve, reject) => {
		fetch(BASE_URL + action, {
			headers: {...this.headers}
		})
			.then(response => {				
				switch (response.status) {
					case 401:
						reject({ code: response.status, error: 'Not authenticated' });
						break;

					case 403:
						reject({ code: response.status, error: 'Forbidden' });
						break;

					case 500:
						reject({ code: response.status, error: 'Server error' });
						break;

					default:
						resolve(response.json());
				}
			})
			.then(responseJson => {
				if (true === responseJson.success) {
					resolve(responseJson);
				}

				reject({ code: responseJson.code, error: responseJson.error });
			})
			.catch(exception => {
				reject({ code: 0, error: exception.toString() });
			});
	}));

	jsonPost = (action, payload) => (new Promise((resolve, reject) => {
		fetch(BASE_URL + action, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				...this.headers,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				switch (response.status) {
					case 401:
						reject({ code: response.status, error: 'Not authenticated' });
						break;

					case 403:
						reject({ code: response.status, error: 'Forbidden' });
						break;

					case 500:
						reject({ code: response.status, error: 'Server error' });
						break;

					default:
						resolve(response.json());
				}
			})
			.then(responseJson => {
				if (true === responseJson.success) {
					resolve(responseJson);
				}

				reject({ code: responseJson.code, error: responseJson.error });
			})
			.catch(exception => {
				reject({ code: 0, error: exception.toString() });
			});
	}));
}

const http = new Http();
export default http;