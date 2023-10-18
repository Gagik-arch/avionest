import {configureStore} from '@reduxjs/toolkit';
import {
  authReducer,
  globalReducer,
    cardsReducer
} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    cards:cardsReducer
  },
});

export default store;
