/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { TCalendarLayouts } from "@plane/types";
import { EStartOfTheWeek } from "@plane/types";

export const MONTHS_LIST: {
  [monthNumber: number]: {
    shortTitle: string;
    title: string;
  };
} = {
  1: {
    shortTitle: "Jan",
    title: "January",
  },
  2: {
    shortTitle: "Feb",
    title: "February",
  },
  3: {
    shortTitle: "Mar",
    title: "March",
  },
  4: {
    shortTitle: "Apr",
    title: "April",
  },
  5: {
    shortTitle: "May",
    title: "May",
  },
  6: {
    shortTitle: "Jun",
    title: "June",
  },
  7: {
    shortTitle: "Jul",
    title: "July",
  },
  8: {
    shortTitle: "Aug",
    title: "August",
  },
  9: {
    shortTitle: "Sep",
    title: "September",
  },
  10: {
    shortTitle: "Oct",
    title: "October",
  },
  11: {
    shortTitle: "Nov",
    title: "November",
  },
  12: {
    shortTitle: "Dec",
    title: "December",
  },
};

export const DAYS_LIST: {
  [dayIndex: number]: {
    shortTitle: string;
    title: string;
    value: EStartOfTheWeek;
  };
} = {
  1: {
    shortTitle: "Sun",
    title: "Sunday",
    value: EStartOfTheWeek.SUNDAY,
  },
  2: {
    shortTitle: "Mon",
    title: "Monday",
    value: EStartOfTheWeek.MONDAY,
  },
  3: {
    shortTitle: "Tue",
    title: "Tuesday",
    value: EStartOfTheWeek.TUESDAY,
  },
  4: {
    shortTitle: "Wed",
    title: "Wednesday",
    value: EStartOfTheWeek.WEDNESDAY,
  },
  5: {
    shortTitle: "Thu",
    title: "Thursday",
    value: EStartOfTheWeek.THURSDAY,
  },
  6: {
    shortTitle: "Fri",
    title: "Friday",
    value: EStartOfTheWeek.FRIDAY,
  },
  7: {
    shortTitle: "Sat",
    title: "Saturday",
    value: EStartOfTheWeek.SATURDAY,
  },
};

/**
 * Idioma da interface, gravado em <html lang> por setLanguage() do @plane/i18n.
 */
const getUiLocale = (): string | undefined => {
  if (typeof document === "undefined") return undefined;
  return document.documentElement.lang || undefined;
};

/**
 * MONTHS_LIST e DAYS_LIST acima são fixas em inglês, então todo calendário e
 * date picker exibia "January"/"Sunday" independentemente do idioma. Estas
 * funções montam a mesma estrutura a partir do Intl, seguindo o idioma atual.
 *
 * As constantes originais seguem exportadas como fallback e para quem precisa
 * das chaves em inglês.
 */
export const getLocalizedMonthsList = (): typeof MONTHS_LIST => {
  const locale = getUiLocale();
  try {
    const long = new Intl.DateTimeFormat(locale, { month: "long" });
    const short = new Intl.DateTimeFormat(locale, { month: "short" });
    const result: typeof MONTHS_LIST = {};
    for (let month = 1; month <= 12; month++) {
      // dia 15 evita qualquer efeito de fuso empurrar para o mês vizinho
      const sample = new Date(2024, month - 1, 15);
      result[month] = { shortTitle: short.format(sample), title: long.format(sample) };
    }
    return result;
  } catch (_e) {
    return MONTHS_LIST;
  }
};

export const getLocalizedDaysList = (): typeof DAYS_LIST => {
  const locale = getUiLocale();
  try {
    const long = new Intl.DateTimeFormat(locale, { weekday: "long" });
    const short = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const result: typeof DAYS_LIST = {};
    for (let index = 1; index <= 7; index++) {
      // 2024-09-01 é um domingo, que é o índice 1 de DAYS_LIST
      const sample = new Date(2024, 8, index);
      result[index] = {
        shortTitle: short.format(sample),
        title: long.format(sample),
        value: DAYS_LIST[index].value,
      };
    }
    return result;
  } catch (_e) {
    return DAYS_LIST;
  }
};

export const CALENDAR_LAYOUTS: {
  [layout in TCalendarLayouts]: {
    key: TCalendarLayouts;
    title: string;
  };
} = {
  month: {
    key: "month",
    title: "Month layout",
  },
  week: {
    key: "week",
    title: "Week layout",
  },
};
