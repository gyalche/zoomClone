import { ToastType } from './../../utils/Types';
import { createSlice } from '@reduxjs/toolkit';

interface meetingInitialState {
  toasts: Array<ToastType>;
}

const initialState: meetingInitialState = {
  toasts: [],
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingsSlice.actions;

export default meetingsSlice.reducer;
