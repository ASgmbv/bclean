import {ItemsActionTypes} from './items.types';

const INITIAL_STATE = {
  items: null,
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemsActionTypes.SET_ITEMS:
      return {
        ...state,
        allItems: Object.values(action.payload),
      };
    default:
      return state;
  }
};

export default itemsReducer;
