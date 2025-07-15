import { del, get, patch, post } from "../utils/request";

export const getQuestion = async () => {
    // const response = await fetch("http://localhost:3002/products");
    // const result = await response.json();
    const result = await get("questions");
    return result;
}

export const createQuestion = async (option) => {
    const result = await post("questions", option);
    return result;
}

export const editQuestion = async (id, option) => {
    const result = await patch("questions", id, option);
    return result;
}

export const deleteQuestion = async (id) => {
    const result = await del("questions", id);
    return result;
}
