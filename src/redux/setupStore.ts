import { configureStore } from "@reduxjs/toolkit";
import selectedSetReducer from "@/features/selectedSetSlice";
import currentWorkoutReducer from "@/features/currentWorkoutSlice";

export const store = configureStore({
  reducer: {
    set: selectedSetReducer,
    workout: currentWorkoutReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
