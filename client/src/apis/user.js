const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_user = async () => {
    const response = await fetch(`${apiUrl}/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};