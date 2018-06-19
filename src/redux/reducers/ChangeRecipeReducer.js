import Immutable from 'seamless-immutable';
import * as type from '../actions/changeRecipe/actionsTypes';


const initialState = Immutable({
  info: null,
  ratings: []
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.POST_REQUEST:
      return { info: action.payload };
    case type.RATING_REQUEST:
      return { ratings: [...state.ratings, action.payload] };
    default:
      return state;
  }
};
