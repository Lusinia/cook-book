import * as types from './actionsTypes';
import Axios from 'axios';
import { failureError } from '../generic';
import { BASE_URL } from '../../../constants';


export const booksListSuccess = payload => ({
  type: types.BOOKS_LIST,
  payload
});

export const booksList = () => async(dispatch) => {
  try {
    const res = await Axios.get(BASE_URL);
    dispatch(booksListSuccess(res.data));

  } catch (err) {
    dispatch(failureError(err.message));
  }
};

export const fetchBooksList = () => async(dispatch) => {
  await dispatch(booksList());
};
