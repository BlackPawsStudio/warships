import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonStateSlice from './commonStateSlice';
import dragStateSlice from './dragStateSlice';
import fieldsSlice from './fieldsSlice';

const rootReducer = combineReducers({
  dragStateSlice: dragStateSlice,
  fieldsSlice: fieldsSlice,
  gameStateSlice: commonStateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch