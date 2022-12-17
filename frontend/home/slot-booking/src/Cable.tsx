import actionCable from 'actioncable'
import moment from 'moment'
import { consumers } from 'stream'

export interface TimeSlotsListener {
    subscribe: (date: Date) => void
}

const consumer = actionCable.createConsumer(`ws://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_API_PORT}/cable`)

export const timeSlotsListener: TimeSlotsListener = {
    subscribe: (date: Date) : actionCable.Channel => {
        const channel = 'ApplicationCable::DailySlotsBookingChannel'
        const room = moment(date).format('YYYY-MM-DD');
        return consumer.subscriptions.create({channel, room}, {
            received(data){
                console.log('received')
                console.log(data)
            }
        })
    }
}