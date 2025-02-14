import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import gptReducer from './gptSlice';
import configReducer from './configSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
});

// setInterval(() => {
//   console.log("Forcing Redux DevTools update:", appStore.getState());
// }, 1000);

// console.log("Store State:", appStore.getState())
export default appStore;
