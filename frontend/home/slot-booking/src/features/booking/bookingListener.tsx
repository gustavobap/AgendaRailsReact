import actionCable from 'actioncable'
import moment from 'moment'
import { forEachDay } from '../../components/helper'
import { TimeSlot } from './bookingSlice'

export interface BookingListener {
    subscribe: (date: Date, duration: number, callback: (timeSlot: TimeSlot) => void) => Array<actionCable.Channel>,
    unsubscribe: (subscriptions: Array<actionCable.Channel>) => void;
}

const consumer = actionCable.createConsumer(`ws://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_API_PORT}/cable`)

export const bookingListener: BookingListener = {
    subscribe: (date: Date, duration: number, callback: (timeSlot: TimeSlot) => void) => {
        const channelName = 'ApplicationCable::DailySlotsBookingChannel'
        const firstDay = moment.utc(date).startOf('day');
        const subscriptions: Array<actionCable.Channel> = []
        forEachDay(firstDay, firstDay.add(duration, 'minutes'), (day) => {
            const room = day.format("YYYY-MM-DD");
            const channel = consumer.subscriptions.create({channel: channelName, room}, {
                received(data){ 
                    callback(data);
                }
            })
            subscriptions.push(channel)
        })

        return subscriptions;
    },

    unsubscribe(subscriptions: Array<actionCable.Channel>){
        subscriptions.forEach((channel) => channel.unsubscribe());
    }
}