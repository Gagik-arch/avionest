import * as Redux from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer,projectsReducer} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export default store;
