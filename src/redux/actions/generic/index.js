import * as types from './actionsTypes';


export const failureError = payload => ({
  type: types.ERROR,
  payload
});

export const setError = (data) => dispatch => {
  dispatch(failureError(data));
};
