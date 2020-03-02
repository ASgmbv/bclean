import {ItemsActionTypes} from './items.types';

export const setItems = items => ({
  type: ItemsActionTypes.SET_ITEMS,
  payload: items,
});
