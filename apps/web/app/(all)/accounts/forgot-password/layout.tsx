/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { i18nInstance } from "@plane/i18n";

export default function ForgotPasswordLayout() {
  return <Outlet />;
}

export const meta: Route.MetaFunction = () => [{ title: i18nInstance.t("page_titles.forgot_password") }];
