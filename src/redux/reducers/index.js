import { combineReducers } from 'redux';
import AddRecipeReducer from "./AddRecipeReducer";
import RecipesReducer from './RecipesReducer';

export default combineReducers({
  recipesList: RecipesReducer,
  addRecipeResponse: AddRecipeReducer,
});
