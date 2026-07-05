import { combineReducers } from 'redux';
import authSlice from './authSlice';
import likeSlice from './likeSlice';
import basketSlice from './basketSlice';

// Об'єднання ред'юсерів
const rootReducer = combineReducers({
  auth: authSlice,
  like: likeSlice,
  basket: basketSlice,
});

export default rootReducer;
