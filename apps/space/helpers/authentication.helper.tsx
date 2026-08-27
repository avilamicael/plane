/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Link } from "react-router";
// plane imports
import { SUPPORT_EMAIL } from "@plane/constants";
import { i18nInstance } from "@plane/i18n";

export enum EPageTypes {
  INIT = "INIT",
  PUBLIC = "PUBLIC",
  NON_AUTHENTICATED = "NON_AUTHENTICATED",
  ONBOARDING = "ONBOARDING",
  AUTHENTICATED = "AUTHENTICATED",
}

export enum EErrorAlertType {
  BANNER_ALERT = "BANNER_ALERT",
  TOAST_ALERT = "TOAST_ALERT",
  INLINE_FIRST_NAME = "INLINE_FIRST_NAME",
  INLINE_EMAIL = "INLINE_EMAIL",
  INLINE_PASSWORD = "INLINE_PASSWORD",
  INLINE_EMAIL_CODE = "INLINE_EMAIL_CODE",
}

export enum EAuthenticationErrorCodes {
  // Global
  INSTANCE_NOT_CONFIGURED = "5000",
  INVALID_EMAIL = "5005",
  EMAIL_REQUIRED = "5010",
  SIGNUP_DISABLED = "5015",
  // Password strength
  INVALID_PASSWORD = "5020",
  SMTP_NOT_CONFIGURED = "5025",
  // Sign Up
  USER_ALREADY_EXIST = "5030",
  AUTHENTICATION_FAILED_SIGN_UP = "5035",
  REQUIRED_EMAIL_PASSWORD_SIGN_UP = "5040",
  INVALID_EMAIL_SIGN_UP = "5045",
  INVALID_EMAIL_MAGIC_SIGN_UP = "5050",
  MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED = "5055",
  // Sign In
  BOT_USER_LOGIN_FORBIDDEN = "5017",
  USER_ACCOUNT_DEACTIVATED = "5019",
  USER_DOES_NOT_EXIST = "5060",
  AUTHENTICATION_FAILED_SIGN_IN = "5065",
  REQUIRED_EMAIL_PASSWORD_SIGN_IN = "5070",
  INVALID_EMAIL_SIGN_IN = "5075",
  INVALID_EMAIL_MAGIC_SIGN_IN = "5080",
  MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED = "5085",
  // Both Sign in and Sign up for magic
  INVALID_MAGIC_CODE_SIGN_IN = "5090",
  INVALID_MAGIC_CODE_SIGN_UP = "5092",
  EXPIRED_MAGIC_CODE_SIGN_IN = "5095",
  EXPIRED_MAGIC_CODE_SIGN_UP = "5097",
  EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN = "5100",
  EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP = "5102",
  // Oauth
  OAUTH_NOT_CONFIGURED = "5104",
  GOOGLE_NOT_CONFIGURED = "5105",
  GITHUB_NOT_CONFIGURED = "5110",
  GITLAB_NOT_CONFIGURED = "5111",
  GOOGLE_OAUTH_PROVIDER_ERROR = "5115",
  GITHUB_OAUTH_PROVIDER_ERROR = "5120",
  GITLAB_OAUTH_PROVIDER_ERROR = "5121",
  // Reset Password
  INVALID_PASSWORD_TOKEN = "5125",
  EXPIRED_PASSWORD_TOKEN = "5130",
  // Change password
  INCORRECT_OLD_PASSWORD = "5135",
  MISSING_PASSWORD = "5138",
  INVALID_NEW_PASSWORD = "5140",
  // set password
  PASSWORD_ALREADY_SET = "5145",
  // Admin
  ADMIN_ALREADY_EXIST = "5150",
  REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME = "5155",
  INVALID_ADMIN_EMAIL = "5160",
  INVALID_ADMIN_PASSWORD = "5165",
  REQUIRED_ADMIN_EMAIL_PASSWORD = "5170",
  ADMIN_AUTHENTICATION_FAILED = "5175",
  ADMIN_USER_ALREADY_EXIST = "5180",
  ADMIN_USER_DOES_NOT_EXIST = "5185",
}

export type TAuthErrorInfo = {
  type: EErrorAlertType;
  code: EAuthenticationErrorCodes;
  title: string;
  message: React.ReactNode;
};

const AUTH_ERRORS_KEY = "space.auth.errors";

/**
 * Translates outside of the React tree. `authErrorHandler` is a plain function called
 * from effects and promise callbacks, so the `useTranslation` hook is not available here.
 * Mirrors the hook's guard: anything that is not a string falls back to the key.
 */
const t = (key: string, params?: Record<string, unknown>): string => {
  const value = params === undefined ? i18nInstance.t(key) : i18nInstance.t(key, params);
  return typeof value === "string" ? value : key;
};

/** `<reason>. Please try again.` */
const tryAgain = (reasonKey: string): string =>
  t(`${AUTH_ERRORS_KEY}.template.try_again`, { reason: t(`${AUTH_ERRORS_KEY}.reason.${reasonKey}`) });

/** `<reason>. Please contact your administrator.` */
const contactAdmin = (reasonKey: string): string =>
  t(`${AUTH_ERRORS_KEY}.template.contact_admin`, { reason: t(`${AUTH_ERRORS_KEY}.reason.${reasonKey}`) });

const reason = (reasonKey: string): string => t(`${AUTH_ERRORS_KEY}.reason.${reasonKey}`);

const title = (titleKey: string): string => t(`${AUTH_ERRORS_KEY}.title.${titleKey}`);

type TErrorLinkProps = {
  /** Key under `space.auth.errors.message` holding the sentence that precedes the link. */
  messageKey: string;
  /** Key under `space.auth.errors.message.link` holding the link label. */
  linkKey: string;
  to: string;
};

const ErrorMessageWithLink = ({ messageKey, linkKey, to }: TErrorLinkProps) => (
  <div>
    {t(`${AUTH_ERRORS_KEY}.message.${messageKey}`)}&nbsp;
    <Link className="font-medium underline underline-offset-4 transition-all hover:font-bold" to={to}>
      {t(`${AUTH_ERRORS_KEY}.message.link.${linkKey}`)}
    </Link>
  </div>
);

/**
 * Built on every call instead of once at module load: the active language can change
 * after this module is imported, and a frozen map would keep serving the boot language.
 */
const getErrorCodeMessages = (): {
  [key in EAuthenticationErrorCodes]: { title: string; message: (email?: string) => React.ReactNode };
} => ({
  // global
  [EAuthenticationErrorCodes.INSTANCE_NOT_CONFIGURED]: {
    title: reason("instance_not_configured"),
    message: () => contactAdmin("instance_not_configured"),
  },
  [EAuthenticationErrorCodes.SIGNUP_DISABLED]: {
    title: reason("signup_disabled"),
    message: () => contactAdmin("signup_disabled"),
  },
  [EAuthenticationErrorCodes.INVALID_PASSWORD]: {
    title: reason("invalid_password"),
    message: () => tryAgain("invalid_password"),
  },
  [EAuthenticationErrorCodes.SMTP_NOT_CONFIGURED]: {
    title: reason("smtp_not_configured"),
    message: () => contactAdmin("smtp_not_configured"),
  },

  // email check in both sign up and sign in
  [EAuthenticationErrorCodes.INVALID_EMAIL]: {
    title: reason("invalid_email"),
    message: () => tryAgain("invalid_email"),
  },
  [EAuthenticationErrorCodes.EMAIL_REQUIRED]: {
    title: reason("email_required"),
    message: () => tryAgain("email_required"),
  },

  // sign up
  [EAuthenticationErrorCodes.USER_ALREADY_EXIST]: {
    title: title("user_already_exist"),
    message: (email = undefined) => (
      <ErrorMessageWithLink
        messageKey="user_already_exist"
        linkKey="sign_in_now"
        to={`/sign-in${email ? `?email=${encodeURIComponent(email)}` : ``}`}
      />
    ),
  },
  [EAuthenticationErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_UP]: {
    title: reason("email_and_password_required"),
    message: () => tryAgain("email_and_password_required"),
  },
  [EAuthenticationErrorCodes.AUTHENTICATION_FAILED_SIGN_UP]: {
    title: reason("authentication_failed"),
    message: () => tryAgain("authentication_failed"),
  },
  [EAuthenticationErrorCodes.INVALID_EMAIL_SIGN_UP]: {
    title: reason("invalid_email"),
    message: () => tryAgain("invalid_email"),
  },
  [EAuthenticationErrorCodes.MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED]: {
    title: reason("email_and_code_required"),
    message: () => tryAgain("email_and_code_required"),
  },
  [EAuthenticationErrorCodes.INVALID_EMAIL_MAGIC_SIGN_UP]: {
    title: reason("invalid_email"),
    message: () => tryAgain("invalid_email"),
  },

  // sign in
  [EAuthenticationErrorCodes.BOT_USER_LOGIN_FORBIDDEN]: {
    title: title("bot_user_login_forbidden"),
    message: () => t(`${AUTH_ERRORS_KEY}.message.bot_user_login_forbidden`),
  },
  [EAuthenticationErrorCodes.USER_ACCOUNT_DEACTIVATED]: {
    title: title("user_account_deactivated"),
    message: () =>
      t(`${AUTH_ERRORS_KEY}.message.user_account_deactivated`, {
        contact: SUPPORT_EMAIL ? SUPPORT_EMAIL : t(`${AUTH_ERRORS_KEY}.message.default_contact`),
      }),
  },

  [EAuthenticationErrorCodes.USER_DOES_NOT_EXIST]: {
    title: title("user_does_not_exist"),
    message: (email = undefined) => (
      <ErrorMessageWithLink
        messageKey="user_does_not_exist"
        linkKey="create_one"
        to={`/${email ? `?email=${encodeURIComponent(email)}` : ``}`}
      />
    ),
  },
  [EAuthenticationErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_IN]: {
    title: reason("email_and_password_required"),
    message: () => tryAgain("email_and_password_required"),
  },
  [EAuthenticationErrorCodes.AUTHENTICATION_FAILED_SIGN_IN]: {
    title: reason("authentication_failed"),
    message: () => tryAgain("authentication_failed"),
  },
  [EAuthenticationErrorCodes.INVALID_EMAIL_SIGN_IN]: {
    title: reason("invalid_email"),
    message: () => tryAgain("invalid_email"),
  },
  [EAuthenticationErrorCodes.MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED]: {
    title: reason("email_and_code_required"),
    message: () => tryAgain("email_and_code_required"),
  },
  [EAuthenticationErrorCodes.INVALID_EMAIL_MAGIC_SIGN_IN]: {
    title: reason("invalid_email"),
    message: () => tryAgain("invalid_email"),
  },

  // Both Sign in and Sign up
  [EAuthenticationErrorCodes.INVALID_MAGIC_CODE_SIGN_IN]: {
    title: reason("authentication_failed"),
    message: () => tryAgain("invalid_magic_code"),
  },
  [EAuthenticationErrorCodes.INVALID_MAGIC_CODE_SIGN_UP]: {
    title: reason("authentication_failed"),
    message: () => tryAgain("invalid_magic_code"),
  },
  [EAuthenticationErrorCodes.EXPIRED_MAGIC_CODE_SIGN_IN]: {
    title: reason("expired_magic_code"),
    message: () => tryAgain("expired_magic_code"),
  },
  [EAuthenticationErrorCodes.EXPIRED_MAGIC_CODE_SIGN_UP]: {
    title: reason("expired_magic_code"),
    message: () => tryAgain("expired_magic_code"),
  },
  [EAuthenticationErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN]: {
    title: reason("expired_magic_code"),
    message: () => tryAgain("expired_magic_code"),
  },
  [EAuthenticationErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP]: {
    title: reason("expired_magic_code"),
    message: () => tryAgain("expired_magic_code"),
  },

  // Oauth
  [EAuthenticationErrorCodes.OAUTH_NOT_CONFIGURED]: {
    title: reason("oauth_not_configured"),
    message: () => contactAdmin("oauth_not_configured"),
  },
  [EAuthenticationErrorCodes.GOOGLE_NOT_CONFIGURED]: {
    title: reason("google_not_configured"),
    message: () => contactAdmin("google_not_configured"),
  },
  [EAuthenticationErrorCodes.GITHUB_NOT_CONFIGURED]: {
    title: reason("github_not_configured"),
    message: () => contactAdmin("github_not_configured"),
  },
  [EAuthenticationErrorCodes.GITLAB_NOT_CONFIGURED]: {
    title: reason("gitlab_not_configured"),
    message: () => contactAdmin("gitlab_not_configured"),
  },
  [EAuthenticationErrorCodes.GOOGLE_OAUTH_PROVIDER_ERROR]: {
    title: reason("google_oauth_provider_error"),
    message: () => tryAgain("google_oauth_provider_error"),
  },
  [EAuthenticationErrorCodes.GITHUB_OAUTH_PROVIDER_ERROR]: {
    title: reason("github_oauth_provider_error"),
    message: () => tryAgain("github_oauth_provider_error"),
  },
  [EAuthenticationErrorCodes.GITLAB_OAUTH_PROVIDER_ERROR]: {
    title: reason("gitlab_oauth_provider_error"),
    message: () => tryAgain("gitlab_oauth_provider_error"),
  },

  // Reset Password
  [EAuthenticationErrorCodes.INVALID_PASSWORD_TOKEN]: {
    title: reason("invalid_password_token"),
    message: () => tryAgain("invalid_password_token"),
  },
  [EAuthenticationErrorCodes.EXPIRED_PASSWORD_TOKEN]: {
    title: reason("expired_password_token"),
    message: () => tryAgain("expired_password_token"),
  },

  // Change password
  [EAuthenticationErrorCodes.MISSING_PASSWORD]: {
    title: reason("password_required"),
    message: () => tryAgain("password_required"),
  },
  [EAuthenticationErrorCodes.INCORRECT_OLD_PASSWORD]: {
    title: reason("incorrect_old_password"),
    message: () => tryAgain("incorrect_old_password"),
  },
  [EAuthenticationErrorCodes.INVALID_NEW_PASSWORD]: {
    title: reason("invalid_new_password"),
    message: () => tryAgain("invalid_new_password"),
  },

  // set password
  [EAuthenticationErrorCodes.PASSWORD_ALREADY_SET]: {
    title: reason("password_already_set"),
    message: () => tryAgain("password_already_set"),
  },

  // admin
  [EAuthenticationErrorCodes.ADMIN_ALREADY_EXIST]: {
    title: reason("admin_already_exist"),
    message: () => tryAgain("admin_already_exist"),
  },
  [EAuthenticationErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME]: {
    title: reason("admin_email_password_first_name_required"),
    message: () => tryAgain("admin_email_password_first_name_required"),
  },
  [EAuthenticationErrorCodes.INVALID_ADMIN_EMAIL]: {
    title: reason("invalid_admin_email"),
    message: () => tryAgain("invalid_admin_email"),
  },
  [EAuthenticationErrorCodes.INVALID_ADMIN_PASSWORD]: {
    title: reason("invalid_admin_password"),
    message: () => tryAgain("invalid_admin_password"),
  },
  [EAuthenticationErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD]: {
    title: reason("email_and_password_required"),
    message: () => tryAgain("email_and_password_required"),
  },
  [EAuthenticationErrorCodes.ADMIN_AUTHENTICATION_FAILED]: {
    title: reason("authentication_failed"),
    message: () => tryAgain("authentication_failed"),
  },
  [EAuthenticationErrorCodes.ADMIN_USER_ALREADY_EXIST]: {
    title: title("admin_user_already_exist"),
    message: () => <ErrorMessageWithLink messageKey="admin_user_already_exist" linkKey="sign_in_now" to={`/admin`} />,
  },
  [EAuthenticationErrorCodes.ADMIN_USER_DOES_NOT_EXIST]: {
    title: title("admin_user_does_not_exist"),
    message: () => <ErrorMessageWithLink messageKey="admin_user_does_not_exist" linkKey="sign_in_now" to={`/admin`} />,
  },
});

export const authErrorHandler = (errorCode: EAuthenticationErrorCodes, email?: string): TAuthErrorInfo | undefined => {
  const bannerAlertErrorCodes = [
    EAuthenticationErrorCodes.INSTANCE_NOT_CONFIGURED,
    EAuthenticationErrorCodes.INVALID_EMAIL,
    EAuthenticationErrorCodes.EMAIL_REQUIRED,
    EAuthenticationErrorCodes.SIGNUP_DISABLED,
    EAuthenticationErrorCodes.INVALID_PASSWORD,
    EAuthenticationErrorCodes.SMTP_NOT_CONFIGURED,
    EAuthenticationErrorCodes.USER_ALREADY_EXIST,
    EAuthenticationErrorCodes.AUTHENTICATION_FAILED_SIGN_UP,
    EAuthenticationErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_UP,
    EAuthenticationErrorCodes.INVALID_EMAIL_SIGN_UP,
    EAuthenticationErrorCodes.INVALID_EMAIL_MAGIC_SIGN_UP,
    EAuthenticationErrorCodes.MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED,
    EAuthenticationErrorCodes.USER_DOES_NOT_EXIST,
    EAuthenticationErrorCodes.AUTHENTICATION_FAILED_SIGN_IN,
    EAuthenticationErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_IN,
    EAuthenticationErrorCodes.INVALID_EMAIL_SIGN_IN,
    EAuthenticationErrorCodes.INVALID_EMAIL_MAGIC_SIGN_IN,
    EAuthenticationErrorCodes.MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED,
    EAuthenticationErrorCodes.INVALID_MAGIC_CODE_SIGN_IN,
    EAuthenticationErrorCodes.INVALID_MAGIC_CODE_SIGN_UP,
    EAuthenticationErrorCodes.EXPIRED_MAGIC_CODE_SIGN_IN,
    EAuthenticationErrorCodes.EXPIRED_MAGIC_CODE_SIGN_UP,
    EAuthenticationErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN,
    EAuthenticationErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP,
    EAuthenticationErrorCodes.OAUTH_NOT_CONFIGURED,
    EAuthenticationErrorCodes.GOOGLE_NOT_CONFIGURED,
    EAuthenticationErrorCodes.GITHUB_NOT_CONFIGURED,
    EAuthenticationErrorCodes.GITLAB_NOT_CONFIGURED,
    EAuthenticationErrorCodes.GOOGLE_OAUTH_PROVIDER_ERROR,
    EAuthenticationErrorCodes.GITHUB_OAUTH_PROVIDER_ERROR,
    EAuthenticationErrorCodes.GITLAB_OAUTH_PROVIDER_ERROR,
    EAuthenticationErrorCodes.INVALID_PASSWORD_TOKEN,
    EAuthenticationErrorCodes.EXPIRED_PASSWORD_TOKEN,
    EAuthenticationErrorCodes.INCORRECT_OLD_PASSWORD,
    EAuthenticationErrorCodes.INVALID_NEW_PASSWORD,
    EAuthenticationErrorCodes.PASSWORD_ALREADY_SET,
    EAuthenticationErrorCodes.ADMIN_ALREADY_EXIST,
    EAuthenticationErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME,
    EAuthenticationErrorCodes.INVALID_ADMIN_EMAIL,
    EAuthenticationErrorCodes.INVALID_ADMIN_PASSWORD,
    EAuthenticationErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD,
    EAuthenticationErrorCodes.ADMIN_AUTHENTICATION_FAILED,
    EAuthenticationErrorCodes.ADMIN_USER_ALREADY_EXIST,
    EAuthenticationErrorCodes.ADMIN_USER_DOES_NOT_EXIST,
    EAuthenticationErrorCodes.BOT_USER_LOGIN_FORBIDDEN,
    EAuthenticationErrorCodes.USER_ACCOUNT_DEACTIVATED,
  ];

  if (bannerAlertErrorCodes.includes(errorCode)) {
    const errorCodeMessages = getErrorCodeMessages();
    return {
      type: EErrorAlertType.BANNER_ALERT,
      code: errorCode,
      title: errorCodeMessages[errorCode]?.title || t(`${AUTH_ERRORS_KEY}.default.title`),
      message: errorCodeMessages[errorCode]?.message(email) || t(`${AUTH_ERRORS_KEY}.default.message`),
    };
  }

  return undefined;
};
