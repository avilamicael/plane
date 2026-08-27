/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// plane imports
import { useTranslation } from "@plane/i18n";
// helpers
import { EAuthModes } from "@/types/auth";

type TAuthHeader = {
  authMode: EAuthModes;
};

type TAuthHeaderContent = {
  header: string;
  subHeader: string;
};

type TAuthHeaderDetails = {
  [mode in EAuthModes]: TAuthHeaderContent;
};

const TITLE_TRANSLATION_KEYS: TAuthHeaderDetails = {
  [EAuthModes.SIGN_IN]: {
    header: "auth.space.sign_in.header",
    subHeader: "auth.space.sign_in.sub_header",
  },
  [EAuthModes.SIGN_UP]: {
    header: "auth.space.sign_up.header",
    subHeader: "auth.space.sign_up.sub_header",
  },
};

const DEFAULT_TITLE_TRANSLATION_KEYS: TAuthHeaderContent = {
  header: "auth.space.default.header",
  subHeader: "auth.space.default.sub_header",
};

export function AuthHeader(props: TAuthHeader) {
  const { authMode } = props;
  // i18n
  const { t } = useTranslation();

  const getHeaderSubHeader = (mode: EAuthModes | null): TAuthHeaderContent =>
    mode ? TITLE_TRANSLATION_KEYS[mode] : DEFAULT_TITLE_TRANSLATION_KEYS;

  const { header: headerKey, subHeader: subHeaderKey } = getHeaderSubHeader(authMode);
  const header = t(headerKey);
  const subHeader = t(subHeaderKey);

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="text-20 leading-7 font-semibold text-primary">{header}</span>
        <span className="text-20 leading-7 font-semibold text-placeholder">{subHeader}</span>
      </div>
    </>
  );
}
