import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  fetchTimeSlots,
  selectBookedSlots,
  selectAvailableSlots
} from './timeSlotsSlice';


export function Booking() {
  const bookedSlots = useAppSelector(selectBookedSlots);
  const dispatch = useAppDispatch();
  const [day, setDay] = useState(new Date("2022-02-01"))

  useEffect(() => {
    dispatch(fetchTimeSlots(day))
  }, [day])

  return (
    <div>
      {bookedSlots.map((slot, inx) => {
        return <div key={inx}>{`${slot.start_date} - ${slot.end_date}`}</div>
      })}
    </div>
  );
}
