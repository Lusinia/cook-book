import * as types from './actionsTypes';
import Axios from 'axios';
import { failureError } from '../generic';
import { BASE_URL } from '../../../constants';


export const postRecipeSuccess = payload => ({
  type: types.POST_REQUEST,
  payload
});


export const addRecipe = (data) => async(dispatch) => {
  try {
    const res = await Axios.post(BASE_URL, data);
    dispatch(postRecipeSuccess(res.data));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const editRecipe = (values) => async(dispatch) => {
  const {id, data} = values;
  try {
    const res = await Axios.put(`${BASE_URL}/${id}`, data);
    dispatch(postRecipeSuccess(res.data));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const removeRecipe = (id) => async(dispatch) => {
  try {
    const res = await Axios.delete(`${BASE_URL}/${id}`);
    dispatch(postRecipeSuccess(res.data));
  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const sendAddRecipeRequest = (data) => async(dispatch) => {
  await dispatch(addRecipe(data));
};

export const sendRemoveRecipeRequest = (id) => async(dispatch) => {
  await dispatch(removeRecipe(id));
};

export const sendEditRecipeRequest = (values) => async(dispatch) => {
  await dispatch(editRecipe(values));
};
