import { configureStore } from '@reduxjs/toolkit';
import { fetchData } from './api';


export const store = configureStore({
  reducer: {
    [fetchData.reducerPath]: fetchData.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchData.middleware),
});
