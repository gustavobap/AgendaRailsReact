import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timeSlotsReducer from '../booking/timeSlotsSlice';

export const store = configureStore({
  reducer: {
    timeSlots: timeSlotsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
