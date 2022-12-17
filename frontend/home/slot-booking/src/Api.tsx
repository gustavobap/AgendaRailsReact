import axios, { AxiosResponse } from "axios";

export interface TimeSlotsService {
  list: () => Promise<AxiosResponse<any, any>>
}

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ORIGIN}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const timeSlotsService: TimeSlotsService = {
  list: () => client.get('time_slots')
}