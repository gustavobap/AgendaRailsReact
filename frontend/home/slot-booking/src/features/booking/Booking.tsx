import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import { formatDate, formatTime, startOfDayUTC, timeRangeInWords } from '../../components/helper';
import Panel from '../../components/Panel';
import Tag from '../../components/Tag';
import TextInput from '../../components/TextInput';
import { Head } from '../../components/Typograhpy';
import { bookingListener } from './bookingListener';
import {
  bookingPublished,
  setBookingData,
  selectSchedule,
  bookSlot
} from './bookingSlice';

import './Booking.scss'
import { Subscription } from '@rails/actioncable';


export function Booking() {

  const schedule = useAppSelector(selectSchedule);

  const dispatch = useAppDispatch();

  const [inputDay, setInputDay] = useState(moment().startOf('day').toDate())
  const [inputDuration, setInputDuration] = useState(15)

  const [day, setDay] = useState(inputDay)
  const [duration, setDuration] = useState(inputDuration)

  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);

  useEffect(() => {
    showSchedule(inputDay, inputDuration)
  }, [])

  const showSchedule = (day: Date, duration: number) => {
    setDay(day)
    setDuration(duration)
    dispatch(setBookingData({ day, duration }))
    bookingListener.unsubscribe(subscriptions)
    setSubscriptions(bookingListener.subscribe(day, duration, (slot) => dispatch(bookingPublished(slot))))
  }

  const renderTags = (from: number, to: number = schedule.length) => {
    return schedule.filter((_, inx) => inx >= from && inx <= to).map((slot, inx) => {
      const onClick = () => { if(!slot.isBooked) dispatch(bookSlot(slot)) };
      return <Tag key={inx} flavor={slot.isBooked ? 'booked' : 'available'} onClick={onClick}>
        {formatTime(slot.startDate)}
      </Tag>
    })
  }

  return (
    <Panel flavor='main' className='booking'>
      <Panel flavor='dark'>
        <TextInput value={day} label="Booking Day" onChange={(day) => setInputDay(day)} />
        <TextInput value={duration} label="Duration in minutes (max 10078)" onChange={(duration) => setInputDuration(duration)} />
        <Button className='show-button' onClick={() => showSchedule(inputDay, inputDuration)}>Show Schedule</Button>
      </Panel>
      <Panel flavor='dark'>
          <div className='booking-info'>
            <div className="navigator">
              <Button flavor='link' iconBefore='arrowLeft' onClick={() => showSchedule(moment(day).subtract(1, 'day').toDate(), inputDuration)}/>
              <Head>{formatDate(day)}</Head>
              <Button flavor='link' iconAfter='arrowRight' onClick={() => showSchedule(moment(day).add(1, 'day').toDate(), inputDuration)}/>
            </div>
            <div>
              <Head color='purple'>Booking length:</Head><Head> {timeRangeInWords(duration)}</Head>
            </div>
          </div>
        <Panel className='tag-container' flavor='neutral'>
          {renderTags(0, 47)}
        </Panel>
        <Panel className='tag-container' flavor='neutral'>
          {renderTags(48)}
        </Panel>
      </Panel>
    </Panel>
  );
}
