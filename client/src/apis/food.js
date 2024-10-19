const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_food_inventory = async () => {
    const response = await fetch(`${apiUrl}/food-inventory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const set_food_inventory = async (foodInventory) => {
    const response = await fetch(`${apiUrl}/food-inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ foodInventory }),
    });
    return response;
};

export const update_food_inventory = async (foodInventory) => {
    const response = await fetch(`${apiUrl}/food-inventory`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ foodInventory }),
    });
    return response;
};

