import Immutable from 'seamless-immutable';
import * as type from '../actions/authentication/actionsTypes';


const initialState = Immutable({
  response: null,
  userInfo: {
    username: ''
  }
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.AUTH_REQUEST:
      return state.merge({
        response: action.payload
      });
    case type.USER_INFO:
      return state.merge({
        userInfo: action.payload
      });
    default:
      return state;
  }
};
