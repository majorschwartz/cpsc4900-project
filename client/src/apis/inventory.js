const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_inventory = async () => {
    const response = await fetch(`${apiUrl}/inventory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const set_inventory = async (inventory) => {
    const response = await fetch(`${apiUrl}/inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ inventory: inventory }),
    });
    return response;
};

export const update_inventory = async (inventory) => {
    const response = await fetch(`${apiUrl}/inventory`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ inventory: inventory }),
    });
    return response;
};

