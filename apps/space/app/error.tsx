/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// plane imports
import { useTranslation } from "@plane/i18n";
// ui
import { Button } from "@plane/propel/button";

function ErrorPage() {
  const { t } = useTranslation();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="grid h-screen place-items-center bg-surface-1 p-4">
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h3 className="text-16 font-semibold">{t("space.error_page.title")}</h3>
          <p className="mx-auto text-13 text-secondary md:w-1/2">
            {t("space.error_page.description")}{" "}
            <a href="mailto:support@plane.so" className="text-accent-primary">
              support@plane.so
            </a>{" "}
            {t("space.error_page.or_on_our")}{" "}
            <a href="https://forum.plane.so" target="_blank" className="text-accent-primary" rel="noopener noreferrer">
              {t("forum")}
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="primary" size="lg" onClick={handleRetry}>
            {t("refresh")}
          </Button>
          {/* <Button variant="secondary" size="lg" onClick={() => {}}>
            {t("sign_out")}
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
