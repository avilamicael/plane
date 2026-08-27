/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Image, BrainCog, Cog, Mail } from "lucide-react";
// plane imports
import { LockIcon, WorkspaceIcon } from "@plane/propel/icons";
// types
import type { TSidebarMenuItem } from "./types";

export type TCoreSidebarMenuKey = "general" | "email" | "workspace" | "authentication" | "ai" | "image";

// `name` and `description` hold i18n keys; they are resolved by `useSidebarMenu`.
export const coreSidebarMenuLinks: Record<TCoreSidebarMenuKey, TSidebarMenuItem> = {
  general: {
    Icon: Cog,
    name: "admin.sidebar.general.title",
    description: "admin.sidebar.general.description",
    href: `/general/`,
  },
  email: {
    Icon: Mail,
    name: "admin.sidebar.email.title",
    description: "admin.sidebar.email.description",
    href: `/email/`,
  },
  workspace: {
    Icon: WorkspaceIcon,
    name: "admin.sidebar.workspace.title",
    description: "admin.sidebar.workspace.description",
    href: `/workspace/`,
  },
  authentication: {
    Icon: LockIcon,
    name: "admin.sidebar.authentication.title",
    description: "admin.sidebar.authentication.description",
    href: `/authentication/`,
  },
  ai: {
    Icon: BrainCog,
    name: "admin.sidebar.ai.title",
    description: "admin.sidebar.ai.description",
    href: `/ai/`,
  },
  image: {
    Icon: Image,
    name: "admin.sidebar.image.title",
    description: "admin.sidebar.image.description",
    href: `/image/`,
  },
};
