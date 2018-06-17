import Immutable from 'seamless-immutable';
import * as type from '../actions/fetchRecipes/actionsTypes';

const initialState = Immutable({
  recipesList: [],
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.BOOKS_LIST:
      return state.merge({
        recipesList: action.payload
      });
    default:
      return state;
  }
};
