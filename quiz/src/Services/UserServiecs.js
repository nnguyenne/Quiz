import { del, get, patch, post } from "../utils/request";

export const getUser = async () => {
    // const response = await fetch("http://localhost:3002/products");
    // const result = await response.json();
    const result = await get("users");
    return result;
}

export const createUser = async (option) => {
    const result = await post("users", option);
    return result;
}

export const editUser = async (id, option) => {
    const result = await patch("users", id, option);
    return result;
}

export const deleteUser = async (id) => {
    const result = await del("users", id);
    return result;
}
