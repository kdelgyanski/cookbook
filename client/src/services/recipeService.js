const BASE_URL = 'http://localhost:8000/api';
const RECIPES_PATH = '/recipes';

export const getAll = async () => await get(`${BASE_URL}${RECIPES_PATH}`);

export const getById = async (id) => await get(`${BASE_URL}${RECIPES_PATH}/${id}`);

export const getByAuthorId = async (authorId) => await get(`${BASE_URL}${RECIPES_PATH}/user/${authorId}`);

// ---------------------- helpers ---------------------

const get = async (url) => {
    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }
    return responseData;
};