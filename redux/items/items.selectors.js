import {createSelector} from 'reselect';

const select = state => state.items;

export const selectAllItems = createSelector([select], items => items.allItems);
