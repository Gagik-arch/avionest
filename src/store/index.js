import {configureStore} from '@reduxjs/toolkit';
import {authReducer, globalReducer} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});

export default store;
