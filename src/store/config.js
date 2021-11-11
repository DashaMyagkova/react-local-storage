import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { eventReducer } from './evenstList/duck';

const rootReducer = combineReducers({
  eventsList: eventReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export { store };
