const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const get_equipment = async () => {
    const response = await fetch(`${apiUrl}/equipment`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const set_equipment = async (equipment) => {
    const response = await fetch(`${apiUrl}/equipment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(equipment),
    });
};

export const update_equipment = async (equipment) => {
    const response = await fetch(`${apiUrl}/equipment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(equipment),
    });
};