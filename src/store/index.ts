import { configureStore } from '@reduxjs/toolkit';
import topicsSlice from './topicsSlice';

const store = configureStore({
  reducer: {
    topics: topicsSlice.reducer,
  },
});

export default store;
