/**
 * Makes an API call to the specified endpoint from environment variables.
 * Logs the response or errors that occur during the call.
 * @param env - The environment object containing API URL and other secrets.
 */
export async function makeApiCall(env: { API_URL: string }): Promise<void> {
	const apiUrl = env.API_URL;

	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log('API Response:', data);
		} else {
			console.error('API Error:', response.status, await response.text());
		}
	} catch (error) {
		console.error('Error during API call:', error);
	}
}
