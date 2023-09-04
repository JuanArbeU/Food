import {
  GET_ALL,
  GET_DIETS,
  GET_DETAILS,
  SET_DETAILS,
  GET_PAGES,
  SET_PAGE,
  FILTER_OPTIONS
} from "./actions";

const initialState = {
  recipes: [],
  filteredOrigin: [],
  filteredRecipes: [],
  filteredDiets: [],
  filteredScore: [],
  toShow: [],
  diets: [],
  detail: {},
  page: 1,
  pages: 1,
  id: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        recipes: payload,
        toShow: state.toShow.length === 0 ? [...payload]: state.toShow,
        pages: Math.ceil((payload.length - 9) > 0 ? Math.ceil((payload.length - 9) / 9)+1 : 1)
      };

    case FILTER_OPTIONS:
      return {
        ...state,
        toShow: payload
      }

    case GET_DIETS:
      return {
        ...state,
        diets: payload,
      };

    case GET_DETAILS:
      return{
        ...state,
        detail: payload
      }

    case SET_DETAILS:
      return{
        ...state,
        detail:undefined
      }

      case GET_PAGES: {
        return {
            ...state,
            pages: (state.toShow.length - 9) > 0 ? Math.ceil((state.toShow.length - 9) / 9)+1 : 1
        }
    }

      case SET_PAGE:{
        return {
          ...state,
          page: payload
        }
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
