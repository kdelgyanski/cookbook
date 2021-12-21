const BASE_URL = 'http://localhost:8000/api';
const RECIPES_PATH = '/recipes';

export const getAll = async (queryParams) => await get(queryParams ? `${BASE_URL}${RECIPES_PATH}${queryParams}` : `${BASE_URL}${RECIPES_PATH}`);

export const getAllSeasonal = async (seasons) => await get(`${BASE_URL}${RECIPES_PATH}?` + new URLSearchParams({ seasonal: seasons }));

export const getById = async (id) => await get(`${BASE_URL}${RECIPES_PATH}/${id}`);

export const getByAuthorId = async (authorId) => await get(`${BASE_URL}${RECIPES_PATH}/user/${authorId}`);

export const create = async (recipe, token) => {

    const formData = new FormData();

    formData.append('authorId', recipe.authorId);
    formData.append('title', recipe.title);
    formData.append('timeToCook', recipe.timeToCook);
    formData.append('preparationTime', recipe.preparationTime);
    formData.append('servingPortions', recipe.servingPortions);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('steps', JSON.stringify(recipe.steps));
    formData.append('course', recipe.course);
    formData.append('difficulty', recipe.difficulty);
    if (recipe.seasonal) {
        formData.append('seasonal', JSON.stringify(recipe.seasonal));
    }
    if (recipe.category) {
        formData.append('category', JSON.stringify(recipe.category));
    }
    if (recipe.image) {
        formData.append('image', recipe.image);
    }

    const response = await fetch(`${BASE_URL}${RECIPES_PATH}`, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
        const err = new Error(responseData.message);
        err.statusCode = response.status;
        throw err;
    }
    return responseData;
};

export const deleteRecipe = async (id, token) => {
    const response = await fetch(`${BASE_URL}${RECIPES_PATH}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const responseData = await response.json();

    if (!response.ok) {
        const err = new Error(responseData.message);
        err.statusCode = response.status;
        throw err;
    }
    return responseData;
};

export const updateRecipe = async (recipe, token) => {

    const formData = new FormData();

    formData.append('title', recipe.title);
    formData.append('timeToCook', recipe.timeToCook);
    formData.append('preparationTime', recipe.preparationTime);
    formData.append('servingPortions', recipe.servingPortions);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('steps', JSON.stringify(recipe.steps));
    formData.append('course', recipe.course);
    formData.append('difficulty', recipe.difficulty);
    if (recipe.seasonal) {
        formData.append('seasonal', JSON.stringify(recipe.seasonal));
    }
    if (recipe.category) {
        formData.append('category', JSON.stringify(recipe.category));
    }
    if (recipe.image) {
        formData.append('image', recipe.image);
    }

    const response = await fetch(`${BASE_URL}${RECIPES_PATH}/${recipe.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
        const err = new Error(responseData.message);
        err.statusCode = response.status;
        throw err;
    }
    return responseData;
};


// ---------------------- helpers ---------------------

const get = async (url) => {

    console.log(url);

    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
        const err = new Error(responseData.message);
        err.statusCode = response.status;
        throw err;
    }
    return responseData;
};