/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// plane imports
import { useTranslation } from "@plane/i18n";

type Props = {
  isSignUp?: boolean;
};

export function TermsAndConditions(props: Props) {
  const { isSignUp = false } = props;
  // i18n
  const { t } = useTranslation();

  const action = t(isSignUp ? "auth.common.terms.action.sign_up" : "auth.common.terms.action.sign_in");

  return (
    <span className="flex items-center justify-center py-6">
      <p className="text-center text-13 whitespace-pre-line text-secondary">
        {t("auth.common.terms.agreement", { action })}
        {" \n"}
        <a href="https://plane.so/legals/terms-and-conditions" target="_blank" rel="noopener noreferrer">
          <span className="text-13 font-medium underline hover:cursor-pointer">
            {t("auth.common.terms.terms_of_service")}
          </span>
        </a>{" "}
        {t("common.and")}{" "}
        <a href="https://plane.so/legals/privacy-policy" target="_blank" rel="noopener noreferrer">
          <span className="text-13 font-medium underline hover:cursor-pointer">
            {t("auth.common.terms.privacy_policy")}
          </span>
        </a>
        {"."}
      </p>
    </span>
  );
}
