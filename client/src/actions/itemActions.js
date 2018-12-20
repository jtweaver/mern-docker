import axios from 'axios';
import to from 'await-to-js';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  const [error, res] = await to(axios.get('/api/items'));
  if (error) {
    console.error(error);
    return;
  }
  dispatch({ type: GET_ITEMS, payload: res.data });
};

export const addItem = (item) => async (dispatch) => {
  const [error, res] = await to(axios.post('/api/items', item));
  if (error) {
    console.error(error);
    return;
  }
  dispatch({ type: ADD_ITEM, payload: res.data });
};

export const deleteItem = (id) => async (dispatch) => {
  const [error, res] = await to(axios.delete(`/api/items/${id}`));
  if (error) {
    console.log(error);
    return;
  }
  dispatch({ type: DELETE_ITEM, payload: id });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
