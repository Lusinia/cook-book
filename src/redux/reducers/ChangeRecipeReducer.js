import Immutable from 'seamless-immutable';
import * as type from '../actions/changeRecipe/actionsTypes';

const initialState = Immutable({
  info: null
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.POST_REQUEST:
      return state.merge({
        info: action.payload
      });
    default:
      return state;
  }
};
