const API_DOMAIN = "https://quasar-complex-wind.glitch.me/";

export const get = async(path) => {    
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}

export const post = async(path, option) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = await response.json();
    return result;
}

export const patch = async (path,id, option) => {
    const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = await response.json();
    return result;
}

export const del = async (path, id) => {
    const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}