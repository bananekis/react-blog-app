import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { articlesSlice } from "./slices/articlesSlice";

export const reduxStore = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
