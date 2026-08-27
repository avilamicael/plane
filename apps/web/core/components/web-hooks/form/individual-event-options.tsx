/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { IWebhook } from "@plane/types";
import { Checkbox } from "@plane/ui";
import { useTranslation } from "@plane/i18n";

export const INDIVIDUAL_WEBHOOK_OPTIONS: {
  key: keyof IWebhook;
  label: string;
  description: string;
}[] = [
  {
    key: "project",
    label: "common.projects",
    description: "workspace_settings.settings.webhooks.events.project",
  },
  {
    key: "cycle",
    label: "cycles",
    description: "workspace_settings.settings.webhooks.events.cycle",
  },
  {
    key: "issue",
    label: "issues",
    description: "workspace_settings.settings.webhooks.events.work_item",
  },
  {
    key: "module",
    label: "modules",
    description: "workspace_settings.settings.webhooks.events.module",
  },
  {
    key: "issue_comment",
    label: "workspace_settings.settings.webhooks.events.work_item_comments",
    description: "workspace_settings.settings.webhooks.events.comment",
  },
];

type Props = {
  control: Control<IWebhook, any>;
};

export function WebhookIndividualEventOptions({ control }: Props) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-6 lg:grid-cols-2">
      {INDIVIDUAL_WEBHOOK_OPTIONS.map((option) => (
        <Controller
          key={option.key}
          control={control}
          name={option.key}
          render={({ field: { onChange, value } }) => (
            <div>
              <div className="flex items-center gap-2">
                <Checkbox id={option.key} onChange={() => onChange(!value)} checked={value === true} />
                <label className="text-13" htmlFor={option.key}>
                  {t(option.label)}
                </label>
              </div>
              <p className="mt-0.5 ml-6 text-11 text-tertiary">{t(option.description)}</p>
            </div>
          )}
        />
      ))}
    </div>
  );
}
