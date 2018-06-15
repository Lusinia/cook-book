import * as types from './actionsTypes';
import Axios from 'axios';
import { failureError } from '../generic';
import { BASE_URL } from '../../../constants';


export const booksListSuccess = payload => ({
  type: types.BOOKS_LIST,
  payload
});

export const booksList = () => dispatch => Axios.get(BASE_URL)
  .then(res => {
    console.log('res.data', res.data);
    dispatch(booksListSuccess(res.data));
  })
  .catch(err => {
    dispatch(failureError(err.message));
  });


export const fetchBooksList = () => dispatch => {
  dispatch(booksList());
};
