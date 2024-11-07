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

export const update_user_privacy = async (hideRecipes) => {
    const response = await fetch(`${apiUrl}/user/privacy`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ hide_recipes: hideRecipes }),
    });
    return response;
};