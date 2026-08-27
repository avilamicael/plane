/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { setDefaultOptions } from "date-fns";
import { FALLBACK_LANGUAGE } from "../constants/language";

import type { Locale } from "date-fns";
import type { TLanguage } from "../types";

/**
 * date-fns cai no locale en-US quando format()/formatDistanceToNow() não recebem
 * a opção `locale`. Como nenhum dos ~80 call-sites passa essa opção, as datas
 * saíam em inglês independentemente do idioma escolhido pelo usuário.
 *
 * A correção é registrar o locale no default global do date-fns sempre que o
 * idioma muda: os call-sites continuam intocados e passam a herdar o locale.
 *
 * Os arquivos de locale entram por import dinâmico para não carregar os 19
 * idiomas no bundle inicial — mesmo motivo pelo qual as traduções usam
 * resourcesToBackend.
 */
// Cada módulo de locale do date-fns v4 exporta um único named export com nome
// próprio (ptBR, enUS, zhCN…), não um default — por isso o tipo aqui é o registro
// de exports, e o Locale é extraído pela forma do objeto, não pelo nome.
const DATE_FNS_LOCALE_LOADERS: Record<TLanguage, () => Promise<Record<string, unknown>>> = {
  en: () => import("date-fns/locale/en-US"),
  fr: () => import("date-fns/locale/fr"),
  es: () => import("date-fns/locale/es"),
  ja: () => import("date-fns/locale/ja"),
  "zh-CN": () => import("date-fns/locale/zh-CN"),
  "zh-TW": () => import("date-fns/locale/zh-TW"),
  ru: () => import("date-fns/locale/ru"),
  it: () => import("date-fns/locale/it"),
  cs: () => import("date-fns/locale/cs"),
  sk: () => import("date-fns/locale/sk"),
  de: () => import("date-fns/locale/de"),
  // o código do idioma no Plane é "ua"; no date-fns (e no ISO 639-1) é "uk"
  ua: () => import("date-fns/locale/uk"),
  pl: () => import("date-fns/locale/pl"),
  ko: () => import("date-fns/locale/ko"),
  "pt-BR": () => import("date-fns/locale/pt-BR"),
  id: () => import("date-fns/locale/id"),
  ro: () => import("date-fns/locale/ro"),
  "vi-VN": () => import("date-fns/locale/vi"),
  "tr-TR": () => import("date-fns/locale/tr"),
};

/** Reconhece o objeto Locale pela forma, sem depender do nome do export. */
const isDateFnsLocale = (value: unknown): value is Locale =>
  typeof value === "object" && value !== null && "formatDistance" in value && "formatLong" in value;

/**
 * Alinha o locale global do date-fns com o idioma da interface.
 *
 * Nunca rejeita: se o locale não carregar, o date-fns segue no padrão en-US —
 * data em inglês é degradação aceitável, quebrar a inicialização do i18n não é.
 */
export async function syncDateFnsLocale(language: string): Promise<void> {
  const loader = DATE_FNS_LOCALE_LOADERS[language as TLanguage] ?? DATE_FNS_LOCALE_LOADERS[FALLBACK_LANGUAGE];
  try {
    const mod = await loader();
    const locale = Object.values(mod).find(isDateFnsLocale);
    if (locale) setDefaultOptions({ locale });
  } catch {
    // silencioso por design — ver comentário acima
  }
}
