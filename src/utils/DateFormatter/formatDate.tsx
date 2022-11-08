import {format, formatDistance, parse, parseISO} from 'date-fns';
import {DATE_FORMATS, DATE_TIME_FORMAT, DEFAULT_DATE_FORMAT} from './dateTime';
export const formatDOB = (dob: string | undefined) => {
  return dob ? format(parseISO(dob), DATE_TIME_FORMAT) : 'N/A';
};
export const getDateFromString = (dob: string | undefined) => {
  return dob ? parse(dob, DATE_TIME_FORMAT, new Date()) : new Date();
};
export const getDateFromStringDateFormat = (dob: string | undefined) => {
  return dob
    ? parse(dob, DATE_FORMATS.US_DATE_TIME_FORMAT, new Date())
    : new Date();
};
type Values = typeof DATE_FORMATS[keyof typeof DATE_FORMATS];
export const formatDate = (
  date: Date | string | number | undefined,
  dateFormat?: Values,
) => {
  if (date !== undefined) {
    return format(new Date(date), dateFormat || DEFAULT_DATE_FORMAT);
  }
};

export function getDateDifference(date: string) {
  return formatDistance(new Date(date), new Date());
}
