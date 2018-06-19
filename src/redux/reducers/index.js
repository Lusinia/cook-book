import { combineReducers } from 'redux';
import ChangeRecipeReducer from "./ChangeRecipeReducer";
import RecipesReducer from './RecipesReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  recipesList: RecipesReducer,
  changeRecipeResponse: ChangeRecipeReducer,
  user: UserReducer,
});
