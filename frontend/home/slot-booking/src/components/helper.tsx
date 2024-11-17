import moment from "moment";

export const formatDate = (date: Date | moment.Moment | string) => {
  return moment(date).format("DD MMM YYYY (Z), dddd");
}

export const formatTime = (date: Date | moment.Moment | string) => {
  return moment(date).format("HH:mm")
}

export const formatDateInput = (date: Date | moment.Moment) => {
  return moment(date).format('DD.MM.YYYY');
}

export const formatDateUTC = (date: Date | moment.Moment) => {
  return moment(date).format();
}

export const parseDate = (date: string) => {
  return moment(date, 'DD.MM.YYYY', true)
}

export const parseDateUTC = (date: string) => {
  return moment.utc(date)
}

export const timeRangeInWords = (duration: number) => {
  const range = moment.duration(duration, 'minutes');
  const message = [];
  if(range.days() > 0){
    message.push(`${range.days()} ${range.days() > 1 ? 'days' : 'day'}`)
  }
  if(range.hours() > 0){
    message.push(`${range.hours()} ${range.hours() > 1 ? 'hours' : 'hour'}`)
  }
  if(range.minutes() > 0){
    message.push(`${range.minutes()} ${range.minutes() > 1 ? 'minutes' : 'minute'}`);
  }  
  return message.join(' ');
}

export const startOfDayUTC = (date: moment.Moment = moment()) => moment.utc(date).startOf('day');
export const endOfDayUTC = (date: moment.Moment = moment()) => moment.utc(date).endOf('day');

export const forEachDay = (startDate: moment.Moment, endDate: moment.Moment, callback: (day: moment.Moment) => void) => {
  let firstDay = startOfDayUTC(startDate);
  const lastDay = endOfDayUTC(endDate);
  const numberOfDays = lastDay.diff(firstDay, 'days') + 1;
  for(let i = 0; i < numberOfDays; i++){
    callback(firstDay)
    firstDay.add(1, 'day')
  }
}

export const rangeOverlaps = (start1: moment.Moment, end1: moment.Moment, start2: moment.Moment, end2: moment.Moment) => {

  if(start1.isBetween(start2, end2, "second", "[)"))
    return true
  
  if(end1.isBetween(start2, end2, "second", "(]"))
    return true

  if(start2.isBetween(start1, end1, "second", "[)"))
    return true

  if(end2.isBetween(start1, end1, "second", "(]"))
    return true

  return false
}