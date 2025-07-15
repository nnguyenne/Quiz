import { del, get, patch, post } from "../utils/request";

export const getTopic = async () => {
    // const response = await fetch("http://localhost:3002/products");
    // const result = await response.json();
    const result = await get("topics");
    return result;
}

export const createTopic = async (option) => {
    const result = await post("Topics", option);
    return result;
}

export const editTopic = async (id, option) => {
    const result = await patch("Topics", id, option);
    return result;
}

export const deleteTopic = async (id) => {
    const result = await del("Topics", id);
    return result;
}
