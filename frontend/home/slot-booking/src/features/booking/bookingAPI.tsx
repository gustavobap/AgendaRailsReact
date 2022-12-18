import axios, { AxiosResponse } from "axios";
import { formatDateUTC } from "../../components/helper";
import { TimeSlot } from "./bookingSlice";

export interface BookingAPI {
  list: (date: Date, duration: number) => Promise<AxiosResponse<Array<TimeSlot>, any>>
  create: (slot: TimeSlot) => Promise<AxiosResponse<TimeSlot, any>>
}

const client = axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_API_PORT}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const bookingAPI: BookingAPI = {
  list: (date: Date, duration: number) => client.get('time_slots', { params: { date: formatDateUTC(date), duration } }),
  create: (slot: TimeSlot) => client.post('time_slots', {
    time_slot: {
      start_date: slot.startDate,
      end_date: slot.endDate,
    }
  })
}