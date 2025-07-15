import { del, get, patch, post } from "../utils/request";

export const getAnswers = async () => {
    // const response = await fetch("http://localhost:3002/products");
    // const result = await response.json();
    const result = await get("answers");
    return result;
}

export const createAnswers = async (option) => {
    const result = await post("answers", option);
    return result;
}

export const editAnswers = async (id, option) => {
    const result = await patch("answers", id, option);
    return result;
}

export const deleteAnswers = async (id) => {
    const result = await del("answers", id);
    return result;
}
