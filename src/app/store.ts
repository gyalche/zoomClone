import { authSlice } from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import meetingSlice from './slices/meetingSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    meetings: meetingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
