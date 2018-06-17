import { combineReducers } from 'redux';
import ChangeRecipeReducer from "./ChangeRecipeReducer";
import RecipesReducer from './RecipesReducer';

export default combineReducers({
  recipesList: RecipesReducer,
  changeRecipeResponse: ChangeRecipeReducer,
});
