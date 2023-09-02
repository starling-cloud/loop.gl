// Copyright 2023 Geoid
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




import { dayOfYear, weekNumber } from 'weeknumber';


// ISO 8601 date format
// Every component shown in the example below must be present when expressing a date in ISO 8601 format; this includes all punctuation characters and the "T" character. Within a string, the "T" indicates the beginning of the time element (directly following the date element). Although several date expressions exist, OEM Cloud supports only the following format:

// Complete date plus hours, minutes and seconds:

// YYYY-MM-DDThh:mm:ss[.mmm]TZD (eg 2012-03-29T10:05:45-06:00)

// Where:

// YYYY = four-digit year
// MM = two-digit month (eg 03=March)
// DD = two-digit day of the month (01 through 31)
// T = a set character indicating the start of the time element
// hh = two digits of an hour (00 through 23, AM/PM not included)
// mm = two digits of a minute (00 through 59)
// ss = two digits of a second (00 through 59)
// mmm = three digits of a millisecond (000 through 999)
// TZD = time zone designator (Z or +hh:mm or -hh:mm), the + or - values indicate how far ahead or behind a time zone is from the UTC (Coordinated Universal Time) zone.




const MINUTE = 60000;
const WEEK = 604800000;

const weekday = date => (date.getDay() + 6) % 7 + 1;

const weekEpoch = new Date(1970, 0, -2); // monday before unix epoch in local timezone
const weekOfEpoch = date =>
  Math.floor((date - weekEpoch + (weekEpoch.getTimezoneOffset() - date.getTimezoneOffset()) * MINUTE) / WEEK);

function modify (date, unit, value) {
  switch (unit) {
    case 'Y':
      date.setFullYear(date.getFullYear() + value);
      break;
    case 'M':
      date.setMonth(date.getMonth() + value);
      break;
    case 'W':
      date.setDate(date.getDate() + value * 7);
      break;
    case 'D':
      date.setDate(date.getDate() + value);
      break;
    case 'h':
      date.setHours(date.getHours() + value);
      break;
    case 'm':
      date.setMinutes(date.getMinutes() + value);
      break;
    case 's':
      date.setSeconds(date.getSeconds() + value);
      break;
  }

  return date;
};

/**
 * Convert date-like objects to regular Date (adds support for moment)
 * @param Object|Date date
 * @return Date
 */
export const convert = date => typeof date.toDate === 'function' ? date.toDate() : date;

export const clone = date => new Date(+date);

export const get = {
  Y: {
    E: date => date.getFullYear()
  },
  M: {
    Y: date => date.getMonth() + 1
  },
  W: {
    E: weekOfEpoch,
    Y: weekNumber
  },
  D: {
    Y: dayOfYear,
    M: date => date.getDate(),
    W: date => weekday(date)
  },
  h: {
    D: date => date.getHours()
  },
  m: {
    h: date => date.getMinutes()
  },
  s: {
    m: date => date.getSeconds()
  }
};

export function getValue (unit, scope, date) {
  if (!get[unit]) {
    throw Error('Unit not implemented: ' + unit);
  }

  if (!get[unit][scope]) {
    throw Error('Scope not implemented: ' + unit + ' of ' + scope);
  }

  return get[unit][scope](date);
};

export const add = (date, unit, value) => modify(date, unit, value);
export const sub = (date, unit, value) => modify(date, unit, -value);