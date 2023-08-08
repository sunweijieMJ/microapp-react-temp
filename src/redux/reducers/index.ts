import { combineReducers } from 'redux';
import user from './user';

export const combinedReducers = combineReducers({
  user,
});

export type RootState = ReturnType<typeof combinedReducers>;

const rootReducer = combinedReducers;

export default rootReducer;
