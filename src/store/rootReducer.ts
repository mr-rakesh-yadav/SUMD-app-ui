import { combineReducers } from 'redux';
import authReducer from './authSlice';

export interface RootState {
  auth: ReturnType<typeof authReducer>;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
