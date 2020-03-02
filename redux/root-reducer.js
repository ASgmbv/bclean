import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import itemsReducer from './items/items.reducer';

export default combineReducers({
  user: userReducer,
  items: itemsReducer,
});
