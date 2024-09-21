const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const google_auth = async (code) => {
	const response = await fetch(`${apiUrl}/google-auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ code: code }),
	});
	return response;
};