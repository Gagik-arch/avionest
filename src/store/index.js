import {configureStore} from '@reduxjs/toolkit';
import {
  authReducer,
  globalReducer,
    cardsReducer,
    myBookingsReducer
} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    cards:cardsReducer,
    myBookings:myBookingsReducer
  },
});

export default store;
