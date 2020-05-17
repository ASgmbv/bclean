import {createSelector} from 'reselect';

const select = state => state.items;

export const selectAllItems = createSelector(
  [select],
  items => items.allItems,
);

export const selectAdvertisedItems = createSelector(
  [select],
  items =>
    items.allItems ? items.allItems.filter(item => item.isAdvertised) : null,
);
