const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_recipes = async () => {
    const response = await fetch(`${apiUrl}/recipes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const create_recipe = async (recipe) => {
    const response = await fetch(`${apiUrl}/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipe),
    });
    return response;
};

export const update_recipe = async (recipeId, recipe) => {
    const response = await fetch(`${apiUrl}/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipe),
    });
    return response;
};

export const delete_recipe = async (recipeId) => {
    const response = await fetch(`${apiUrl}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

