import _ from "lodash";
import moment from "moment";

export const formatDate = (date: Date) => {
    return moment(date).format("DD MMM YYYY")
}

export const formatDateInput = (date: Date) => {
    return moment(date).format('DD.MM.YYYY');
}

export const parseDate = (date: string) => {
    return moment(date, 'DD.MM.YYYY', true)
}

const formatter = new Intl.NumberFormat('de', {
    style: 'currency',
    currency: 'EUR',
});

export const formatCurrency = (value: number) => formatter.format(value)

export const today = () => {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

export const daysAfter = (date: Date, days: number) => {
    var newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}
