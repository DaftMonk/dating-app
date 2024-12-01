import { differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, subHours, format } from 'date-fns';

export const formatMatchDate = (date: Date, useRelative: boolean = true): string => {
  if (!useRelative) {
    return format(date, 'MM/dd/yy');
  }

  const now = new Date();
  const hoursAgo = differenceInHours(now, date);
  const days = differenceInDays(now, date);
  const weeks = differenceInWeeks(now, date);
  const months = differenceInMonths(now, date);

  if (days < 1) {
    return `${hoursAgo} hours ago`;
  } else if (days === 1) {
    return '1 day ago';
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks === 1) {
    return '1 week ago';
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months === 1) {
    return '1 month ago';
  } else {
    return `${months} months ago`;
  }
};

export const getCurrentDate = (): Date => {
  const now = new Date();
  const randomHours = Math.floor(Math.random() * 3) + 1; // Random number between 1-3
  return subHours(now, randomHours);
};