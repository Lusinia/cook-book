import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer';

export default combineReducers({
  recipesList: RecipesReducer,
});
