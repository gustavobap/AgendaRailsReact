import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timeSlotsReducer from '../features/booking/bookingSlice';

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
