/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import Link from "next/link";
// plane packages
import type { TAdminAuthErrorInfo } from "@plane/constants";
import { SUPPORT_EMAIL, EAdminAuthErrorCodes } from "@plane/constants";

export enum EErrorAlertType {
  BANNER_ALERT = "BANNER_ALERT",
  INLINE_FIRST_NAME = "INLINE_FIRST_NAME",
  INLINE_EMAIL = "INLINE_EMAIL",
  INLINE_PASSWORD = "INLINE_PASSWORD",
  INLINE_EMAIL_CODE = "INLINE_EMAIL_CODE",
}

// Same shape as the `t` returned by `useTranslation` from `@plane/i18n`.
type TTranslate = (key: string, params?: Record<string, unknown>) => string;

// Falls back to echoing the key so existing callers that do not pass `t` keep compiling.
const identityTranslate: TTranslate = (key) => key;

const getErrorCodeMessages = (
  t: TTranslate
): {
  [key in EAdminAuthErrorCodes]: { title: string; message: (email?: string) => React.ReactNode };
} => ({
  // admin
  [EAdminAuthErrorCodes.ADMIN_ALREADY_EXIST]: {
    title: t("admin.errors.admin_already_exist.title"),
    message: () => t("admin.errors.admin_already_exist.message"),
  },
  [EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME]: {
    title: t("admin.errors.required_admin_email_password_first_name.title"),
    message: () => t("admin.errors.required_admin_email_password_first_name.message"),
  },
  [EAdminAuthErrorCodes.INVALID_ADMIN_EMAIL]: {
    title: t("admin.errors.invalid_admin_email.title"),
    message: () => t("admin.errors.invalid_admin_email.message"),
  },
  [EAdminAuthErrorCodes.INVALID_ADMIN_PASSWORD]: {
    title: t("admin.errors.invalid_admin_password.title"),
    message: () => t("admin.errors.invalid_admin_password.message"),
  },
  [EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD]: {
    title: t("admin.errors.required_admin_email_password.title"),
    message: () => t("admin.errors.required_admin_email_password.message"),
  },
  [EAdminAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED]: {
    title: t("admin.errors.admin_authentication_failed.title"),
    message: () => t("admin.errors.admin_authentication_failed.message"),
  },
  [EAdminAuthErrorCodes.ADMIN_USER_ALREADY_EXIST]: {
    title: t("admin.errors.admin_user_already_exist.title"),
    message: () => (
      <div>
        {t("admin.errors.admin_user_already_exist.message")}&nbsp;
        <Link className="font-medium underline underline-offset-4 transition-all hover:font-bold" href={`/admin`}>
          {t("admin.errors.admin_user_already_exist.sign_in_now")}
        </Link>
        &nbsp;{t("admin.errors.admin_user_already_exist.now")}
      </div>
    ),
  },
  [EAdminAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST]: {
    title: t("admin.errors.admin_user_does_not_exist.title"),
    message: () => (
      <div>
        {t("admin.errors.admin_user_does_not_exist.message")}&nbsp;
        <Link className="font-medium underline underline-offset-4 transition-all hover:font-bold" href={`/admin`}>
          {t("admin.errors.admin_user_does_not_exist.sign_in_now")}
        </Link>
        &nbsp;{t("admin.errors.admin_user_does_not_exist.now")}
      </div>
    ),
  },
  [EAdminAuthErrorCodes.ADMIN_USER_DEACTIVATED]: {
    title: t("admin.errors.admin_user_deactivated.title"),
    message: () =>
      t("admin.errors.admin_user_deactivated.message", {
        contact: SUPPORT_EMAIL ? SUPPORT_EMAIL : t("admin.errors.administrator"),
      }),
  },
});

export const authErrorHandler = (
  errorCode: EAdminAuthErrorCodes,
  email?: string,
  t: TTranslate = identityTranslate
): TAdminAuthErrorInfo | undefined => {
  const bannerAlertErrorCodes = [
    EAdminAuthErrorCodes.ADMIN_ALREADY_EXIST,
    EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME,
    EAdminAuthErrorCodes.INVALID_ADMIN_EMAIL,
    EAdminAuthErrorCodes.INVALID_ADMIN_PASSWORD,
    EAdminAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD,
    EAdminAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED,
    EAdminAuthErrorCodes.ADMIN_USER_ALREADY_EXIST,
    EAdminAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST,
    EAdminAuthErrorCodes.ADMIN_USER_DEACTIVATED,
  ];

  const errorCodeMessages = getErrorCodeMessages(t);

  if (bannerAlertErrorCodes.includes(errorCode))
    return {
      type: EErrorAlertType.BANNER_ALERT,
      code: errorCode,
      title: errorCodeMessages[errorCode]?.title || t("admin.errors.generic_title"),
      message: errorCodeMessages[errorCode]?.message(email) || t("admin.errors.generic_message"),
    };

  return undefined;
};
