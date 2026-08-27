/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// types
import type { WeekMonthDataType, ChartDataType, TGanttViews } from "@plane/types";
import { EStartOfTheWeek } from "@plane/types";
import { i18nInstance } from "@plane/i18n";

// constants
export const generateWeeks = (startOfWeek: EStartOfTheWeek = EStartOfTheWeek.SUNDAY): WeekMonthDataType[] => [
  ...weeks.slice(startOfWeek),
  ...weeks.slice(0, startOfWeek),
];

export const weeks: WeekMonthDataType[] = [
  { key: 0, shortTitle: "sun", title: "sunday", abbreviation: "Su" },
  { key: 1, shortTitle: "mon", title: "monday", abbreviation: "M" },
  { key: 2, shortTitle: "tue", title: "tuesday", abbreviation: "T" },
  { key: 3, shortTitle: "wed", title: "wednesday", abbreviation: "W" },
  { key: 4, shortTitle: "thurs", title: "thursday", abbreviation: "Th" },
  { key: 5, shortTitle: "fri", title: "friday", abbreviation: "F" },
  { key: 6, shortTitle: "sat", title: "saturday", abbreviation: "Sa" },
];

export const months: WeekMonthDataType[] = [
  { key: 0, shortTitle: "jan", title: "common.months_long.january", abbreviation: "common.months_short.jan" },
  { key: 1, shortTitle: "feb", title: "common.months_long.february", abbreviation: "common.months_short.feb" },
  { key: 2, shortTitle: "mar", title: "common.months_long.march", abbreviation: "common.months_short.mar" },
  { key: 3, shortTitle: "apr", title: "common.months_long.april", abbreviation: "common.months_short.apr" },
  { key: 4, shortTitle: "may", title: "common.months_long.may", abbreviation: "common.months_short.may" },
  { key: 5, shortTitle: "jun", title: "common.months_long.june", abbreviation: "common.months_short.jun" },
  { key: 6, shortTitle: "jul", title: "common.months_long.july", abbreviation: "common.months_short.jul" },
  { key: 7, shortTitle: "aug", title: "common.months_long.august", abbreviation: "common.months_short.aug" },
  { key: 8, shortTitle: "sept", title: "common.months_long.september", abbreviation: "common.months_short.sep" },
  { key: 9, shortTitle: "oct", title: "common.months_long.october", abbreviation: "common.months_short.oct" },
  { key: 10, shortTitle: "nov", title: "common.months_long.november", abbreviation: "common.months_short.nov" },
  { key: 11, shortTitle: "dec", title: "common.months_long.december", abbreviation: "common.months_short.dec" },
];

export const quarters: WeekMonthDataType[] = [
  { key: 0, shortTitle: "Q1", title: "common.quarters.q1", abbreviation: "Q1" },
  { key: 1, shortTitle: "Q2", title: "common.quarters.q2", abbreviation: "Q2" },
  { key: 2, shortTitle: "Q3", title: "common.quarters.q3", abbreviation: "Q3" },
  { key: 3, shortTitle: "Q4", title: "common.quarters.q4", abbreviation: "Q4" },
];

export const charCapitalize = (word: string) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`;

export const bindZero = (value: number) => (value > 9 ? `${value}` : `0${value}`);

export const timePreview = (date: Date) => {
  let hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  let minutes: number | string = date.getMinutes();
  minutes = bindZero(minutes);

  return `${bindZero(hours)}:${minutes} ${amPm}`;
};

export const datePreview = (date: Date, includeTime: boolean = false) => {
  const day = date.getDate();
  let month: number | WeekMonthDataType = date.getMonth();
  month = months[month];
  const year = date.getFullYear();

  return `${charCapitalize(i18nInstance.t(month?.abbreviation))} ${day}, ${year}${includeTime ? `, ${timePreview(date)}` : ``}`;
};

// context data
export const VIEWS_LIST: ChartDataType[] = [
  {
    key: "week",
    i18n_title: "common.week",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 4, // it will preview week dates with weekends highlighted with 1 week limitations ex: title (Wed 1, Thu 2, Fri 3)
      dayWidth: 60,
    },
  },
  {
    key: "month",
    i18n_title: "common.month",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 6, // it will preview monthly all dates with weekends highlighted with no limitations ex: title (1, 2, 3)
      dayWidth: 20,
    },
  },
  {
    key: "quarter",
    i18n_title: "common.quarter",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 24, // it will preview week starting dates all months data and there is 3 months limitation for preview ex: title (2, 9, 16, 23, 30)
      dayWidth: 5,
    },
  },
];

export const currentViewDataWithView = (view: TGanttViews = "month") =>
  VIEWS_LIST.find((_viewData) => _viewData.key === view);
