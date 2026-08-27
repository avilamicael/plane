/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useState } from "react";
import { observer } from "mobx-react";
import { useTheme } from "next-themes";
import useSWR from "swr";
// plane internal packages
import { i18nInstance, useTranslation } from "@plane/i18n";
import { setPromiseToast } from "@plane/propel/toast";
import { Loader, ToggleSwitch } from "@plane/ui";
import { resolveGeneralTheme } from "@plane/utils";
// assets
import githubLightModeImage from "@/app/assets/logos/github-black.png?url";
import githubDarkModeImage from "@/app/assets/logos/github-white.png?url";
// components
import { AuthenticationMethodCard } from "@/components/authentication/authentication-method-card";
import { PageWrapper } from "@/components/common/page-wrapper";
// hooks
import { useInstance } from "@/hooks/store";
// types
import type { Route } from "./+types/page";
// local
import { InstanceGithubConfigForm } from "./form";

const InstanceGithubAuthenticationPage = observer(function InstanceGithubAuthenticationPage(
  _props: Route.ComponentProps
) {
  // i18n
  const { t } = useTranslation();
  // store
  const { fetchInstanceConfigurations, formattedConfig, updateInstanceConfigurations } = useInstance();
  // state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // theme
  const { resolvedTheme } = useTheme();
  // config
  const enableGithubConfig = formattedConfig?.IS_GITHUB_ENABLED ?? "";

  useSWR("INSTANCE_CONFIGURATIONS", () => fetchInstanceConfigurations());

  const updateConfig = async (key: "IS_GITHUB_ENABLED", value: string) => {
    setIsSubmitting(true);

    const payload = {
      [key]: value,
    };

    const updateConfigPromise = updateInstanceConfigurations(payload);

    setPromiseToast(updateConfigPromise, {
      loading: t("admin.common.saving_configuration"),
      success: {
        title: t("admin.oauth.configuration_saved"),
        message: () =>
          value === "1"
            ? t("admin.oauth.auth_now_active", { provider: "GitHub" })
            : t("admin.oauth.auth_now_disabled", { provider: "GitHub" }),
      },
      error: {
        title: t("admin.common.error"),
        message: () => t("admin.common.failed_to_save_configuration"),
      },
    });

    await updateConfigPromise
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
      });
  };

  const isGithubEnabled = enableGithubConfig === "1";

  return (
    <PageWrapper
      customHeader={
        <AuthenticationMethodCard
          name="GitHub"
          description={t("admin.settings.authentication.modes.github.description")}
          icon={
            <img
              src={resolveGeneralTheme(resolvedTheme) === "dark" ? githubDarkModeImage : githubLightModeImage}
              height={24}
              width={24}
              alt="GitHub Logo"
            />
          }
          config={
            <ToggleSwitch
              value={isGithubEnabled}
              onChange={() => {
                updateConfig("IS_GITHUB_ENABLED", isGithubEnabled ? "0" : "1");
              }}
              size="sm"
              disabled={isSubmitting || !formattedConfig}
            />
          }
          disabled={isSubmitting || !formattedConfig}
          withBorder={false}
        />
      }
    >
      {formattedConfig ? (
        <InstanceGithubConfigForm config={formattedConfig} />
      ) : (
        <Loader className="space-y-8">
          <Loader.Item height="50px" width="25%" />
          <Loader.Item height="50px" />
          <Loader.Item height="50px" />
          <Loader.Item height="50px" />
          <Loader.Item height="50px" width="50%" />
        </Loader>
      )}
    </PageWrapper>
  );
});

export const meta: Route.MetaFunction = () => [{ title: i18nInstance.t("admin.page_titles.auth_github") }];

export default InstanceGithubAuthenticationPage;
