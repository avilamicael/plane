/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import {
  CustomerHorizontalStackIllustration,
  EpicHorizontalStackIllustration,
  EstimateHorizontalStackIllustration,
  ExportHorizontalStackIllustration,
  IntakeHorizontalStackIllustration,
  LabelHorizontalStackIllustration,
  LinkHorizontalStackIllustration,
  MembersHorizontalStackIllustration,
  NoteHorizontalStackIllustration,
  PriorityHorizontalStackIllustration,
  ProjectHorizontalStackIllustration,
  SettingsHorizontalStackIllustration,
  StateHorizontalStackIllustration,
  TemplateHorizontalStackIllustration,
  TokenHorizontalStackIllustration,
  UnknownHorizontalStackIllustration,
  UpdateHorizontalStackIllustration,
  WebhookHorizontalStackIllustration,
  WorkItemHorizontalStackIllustration,
  WorklogHorizontalStackIllustration,
} from "./";

export const HorizontalStackAssetsMap = [
  {
    asset: <CustomerHorizontalStackIllustration className="h-20 w-20" />,
    title: "Customer",
  },
  {
    asset: <EpicHorizontalStackIllustration className="h-20 w-20" />,
    title: t("common.epic"),
  },
  {
    asset: <EstimateHorizontalStackIllustration className="h-20 w-20" />,
    title: t("estimate"),
  },
  {
    asset: <ExportHorizontalStackIllustration className="h-20 w-20" />,
    title: t("export"),
  },
  {
    asset: <IntakeHorizontalStackIllustration className="h-20 w-20" />,
    title: t("intake"),
  },
  {
    asset: <LabelHorizontalStackIllustration className="h-20 w-20" />,
    title: t("common.label"),
  },
  {
    asset: <LinkHorizontalStackIllustration className="h-20 w-20" />,
    title: t("common.link"),
  },
  {
    asset: <MembersHorizontalStackIllustration className="h-20 w-20" />,
    title: t("members"),
  },
  {
    asset: <NoteHorizontalStackIllustration className="h-20 w-20" />,
    title: "Note",
  },
  {
    asset: <PriorityHorizontalStackIllustration className="h-20 w-20" />,
    title: t("priority"),
  },
  {
    asset: <ProjectHorizontalStackIllustration className="h-20 w-20" />,
    title: t("common.project"),
  },
  {
    asset: <SettingsHorizontalStackIllustration className="h-20 w-20" />,
    title: t("power_k.group_titles.settings"),
  },
  {
    asset: <StateHorizontalStackIllustration className="h-20 w-20" />,
    title: t("state"),
  },
  {
    asset: <TemplateHorizontalStackIllustration className="h-20 w-20" />,
    title: "Template",
  },
  {
    asset: <TokenHorizontalStackIllustration className="h-20 w-20" />,
    title: "Token",
  },
  {
    asset: <UnknownHorizontalStackIllustration className="h-20 w-20" />,
    title: "Unknown",
  },
  {
    asset: <UpdateHorizontalStackIllustration className="h-20 w-20" />,
    title: t("update"),
  },
  {
    asset: <WebhookHorizontalStackIllustration className="h-20 w-20" />,
    title: "Webhook",
  },
  {
    asset: <WorkItemHorizontalStackIllustration className="h-20 w-20" />,
    title: "WorkItem",
  },
  {
    asset: <WorklogHorizontalStackIllustration className="h-20 w-20" />,
    title: "Worklog",
  },
];
