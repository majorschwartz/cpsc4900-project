const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_preferences = async () => {
    const response = await fetch(`${apiUrl}/preferences`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const set_preferences = async (preferences) => {
    const response = await fetch(`${apiUrl}/preferences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({preferences}),
    });
    return response;
};

export const update_preferences = async (preferences) => {
    const response = await fetch(`${apiUrl}/preferences`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({preferences}),
    });
    return response;
};