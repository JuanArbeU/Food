import axios from 'axios'

export const GET_ALL = "GET_ALL";
export const GET_DETAILS = "GET_DETAILS";
export const SET_DETAILS = "SET_DETAILS";
export const GET_NAME = "GET_NAME";
export const GET_DIETS = "GET_DIETS";
export const FILTER = "FILTER"
export const GET_PAGES = "GET_PAGES"
export const SET_PAGE = "SET_PAGE"
export const FILTER_OPTIONS = "FILTER_OPTIONS"

export const getRecipes = () => {
  return async function (dispatch) {
    //console.log('me ejecuto');
    const recipesData = await axios.get(`https://food-production-3cb5.up.railway.app/recipes`)
    const recipes = recipesData.data
    dispatch({ type: GET_ALL, payload: recipes });
  };
};

export const getDetails = ({id, creada}) => {
  return async function (dispatch) {
    const recipeData = await axios.get(`https://food-production-3cb5.up.railway.app/recipes/${id}${creada?'?creada=true':''}`);
    const detail = recipeData.data;
    dispatch({ type: GET_DETAILS, payload: detail });
  };
};

export const getName = (name) => {
  return async function (dispatch) {
    const recipeData = await axios.get(`https://food-production-3cb5.up.railway.app/recipes/${name}`);
    const recipes = recipeData.data;
    dispatch({ type: GET_NAME, payload: recipes });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const response = await axios.get(`https://food-production-3cb5.up.railway.app/diets`);
    const diets = response.data;
    dispatch({ type: GET_DIETS, payload: diets });
  };
};

export const filterOptions = (filter) => {
  return {type: FILTER_OPTIONS, payload: filter}
}

export const getPages = (page) => {
  return {type: GET_PAGES, payload: page}
}

export const setPage = (page) => {
  return { type: SET_PAGE, payload: page}
}

export const setDetails = () => {
  return {type: SET_DETAILS}
}