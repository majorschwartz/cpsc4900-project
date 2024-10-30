const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_all_recipes = async () => {
	const response = await fetch(`${apiUrl}/explore`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch recipes");
	}

	return response.json();
};
