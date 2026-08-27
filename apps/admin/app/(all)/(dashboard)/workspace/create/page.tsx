/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
import { i18nInstance, useTranslation } from "@plane/i18n";
// components
import { PageWrapper } from "@/components/common/page-wrapper";
// types
import type { Route } from "./+types/page";
// local
import { WorkspaceCreateForm } from "./form";

const WorkspaceCreatePage = observer(function WorkspaceCreatePage(_props: Route.ComponentProps) {
  const { t } = useTranslation();

  return (
    <PageWrapper
      header={{
        title: t("admin.settings.workspace.create_heading"),
        description: t("admin.settings.workspace.create_sub_heading"),
      }}
    >
      <WorkspaceCreateForm />
    </PageWrapper>
  );
});

export const meta: Route.MetaFunction = () => [{ title: i18nInstance.t("admin.page_titles.workspace_create") }];

export default WorkspaceCreatePage;
