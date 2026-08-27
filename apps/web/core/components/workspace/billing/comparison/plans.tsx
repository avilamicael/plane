/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import { useTranslation } from "@plane/i18n";
import { EProductSubscriptionEnum } from "@plane/types";
// plane imports
import { cn } from "@plane/utils";

export type TPlanFeatureData = React.ReactNode | boolean | null;

// TODO: we should change this type and use TProductSubscriptionType instead. Need changes in common constants.
export type TPlanePlans = "free" | "one" | "pro" | "business" | "enterprise";

export type TPlanDetail = {
  id: EProductSubscriptionEnum;
  name: React.ReactNode;
  monthlyPrice?: number;
  yearlyPrice?: number;
  monthlyPriceSecondaryDescription?: React.ReactNode;
  yearlyPriceSecondaryDescription?: React.ReactNode;
  buttonCTA?: React.ReactNode;
  isActive: boolean;
};

type TPlanFeatureDetails = {
  title: React.ReactNode;
  description?: React.ReactNode;
  selfHostedDescription?: React.ReactNode;
  comingSoon?: boolean;
  selfHostedOnly?: boolean;
  cloud: Record<TPlanePlans, TPlanFeatureData>;
  "self-hosted"?: Record<TPlanePlans, TPlanFeatureData>;
};

type TPlansComparisonDetails = {
  id: string;
  title: React.ReactNode;
  comingSoon?: boolean;
  cloudOnly?: boolean;
  selfHostedOnly?: boolean;
  features: TPlanFeatureDetails[];
};

type PlanePlans = {
  planDetails: Record<TPlanePlans, TPlanDetail>;
  planHighlights: Record<TPlanePlans, string[]>;
  planComparison: TPlansComparisonDetails[];
};

/** Rótulo traduzido — os campos abaixo são ReactNode, então a tradução só acontece no render. */
function T({ k }: { k: string }) {
  const { t } = useTranslation();
  return <>{t(k)}</>;
}

function ForumIcon({ className }: { className?: string }) {
  return <MessageSquare className={cn(className, "size-5 text-secondary")} />;
}

export function ComingSoonBadge({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "w-fit rounded-sm bg-accent-primary px-1.5 py-0.5 text-9 font-semibold whitespace-nowrap text-on-color",
        className
      )}
    >
      {t("billing.plans.coming_soon")}
    </span>
  );
}

export const PLANS_LIST: TPlanePlans[] = ["free", "one", "pro", "business", "enterprise"];

export const PLANS_COMPARISON_LIST: TPlansComparisonDetails[] = [
  {
    id: "project-work-tracking",
    title: <T k="billing.plans.f.project_work_tracking.title" />,
    features: [
      {
        title: <T k="billing.plans.f.projects.title" />,
        description: <T k="billing.plans.f.projects.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.work_items.title" />,
        description: <T k="billing.plans.f.work_items.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.comments.title" />,
        description: <T k="billing.plans.f.comments.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.cycles.title" />,
        description: <T k="billing.plans.f.cycles.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.modules.title" />,
        description: <T k="billing.plans.f.modules.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.intake.title" />,
        description: <T k="billing.plans.f.intake.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.estimates.title" />,
        description: <T k="billing.plans.f.estimates.description" />,
        cloud: {
          free: <T k="billing.plans.values.basic" />,
          one: <T k="billing.plans.values.basic" />,
          pro: <T k="billing.plans.values.advanced" />,
          business: <T k="billing.plans.values.advanced" />,
          enterprise: <T k="billing.plans.values.advanced" />,
        },
      },
    ],
  },
  {
    id: "project-work-management",
    title: <T k="billing.plans.f.project_work_management.title" />,
    features: [
      {
        title: <T k="billing.plans.f.bulk_ops.title" />,
        description: <T k="billing.plans.f.bulk_ops.description" />,
        cloud: {
          free: false,
          one: <T k="billing.plans.values.limited_props" />,
          pro: <T k="billing.plans.values.all_props" />,
          business: (
            <span className="flex flex-col items-end gap-1 lg:items-center">
              <ComingSoonBadge />
              <T k="billing.plans.work_item_transfers_conversions" />
            </span>
          ),
          enterprise: (
            <span className="flex flex-col items-end gap-1 lg:items-center">
              <ComingSoonBadge />
              <T k="billing.plans.work_item_transfers_conversions" />
            </span>
          ),
        },
      },
      {
        title: <T k="billing.plans.f.time_tracking_worklogs.title" />,
        description: <T k="billing.plans.f.time_tracking_worklogs.description" />,
        cloud: {
          free: false,
          one: <T k="billing.plans.values.basic" />,
          pro: <T k="billing.plans.values.historical_timesheets" />,
          business: "Historical timesheets\nand approvals",
          enterprise: "Historical timesheets\nand approvals",
        },
      },
      {
        title: <T k="billing.plans.f.active_cycles.title" />,
        description: <T k="billing.plans.f.active_cycles.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.work_item_types.title" />,
        description: <T k="billing.plans.f.work_item_types.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.custom_properties.title" />,
        description: <T k="billing.plans.f.custom_properties.description" />,
        cloud: {
          free: false,
          one: false,
          pro: "Project-level\ncustom properties",
          business: "Workspace-level\nproperties and roll-ups",
          enterprise: "Workspace-level\nproperties and roll-ups",
        },
      },
      {
        title: <T k="billing.plans.f.dependencies_in_gantt.title" />,
        description: <T k="billing.plans.f.dependencies_in_gantt.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.work_item_transfers.title" />,
        description: <T k="billing.plans.f.work_item_transfers.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.auto_transfer_cycle_work_items.title" />,
        description: <T k="billing.plans.f.auto_transfer_cycle_work_items.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.epics.title" />,
        description: <T k="billing.plans.f.epics.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.initiatives.title" />,
        description: <T k="billing.plans.f.initiatives.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.checkpoints.title" />,
        description: <T k="billing.plans.f.checkpoints.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.module_overview.title" />,
        description: <T k="billing.plans.f.module_overview.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.auto_assignment_in_modules.title" />,
        description: <T k="billing.plans.f.auto_assignment_in_modules.description" />,
        cloud: {
          free: false,
          one: false,
          pro: <T k="billing.plans.values.linear" />,
          business: <T k="billing.plans.values.round_robin_capacity" />,
          enterprise: <T k="billing.plans.values.round_robin_capacity" />,
        },
      },
      // {
      //   title: "Project Overview",
      //   description: "See just-in-time snapshots of your project with\nessential metrics.",
      //   comingSoon: true,
      //   cloud: {
      //     free: false,
      //     one: false,
      //     pro: true,
      //     business: true,
      //     enterprise: true,
      //   },
      // },
      {
        title: <T k="billing.plans.f.public_private_and_secret_projects.title" />,
        description: <T k="billing.plans.f.public_private_and_secret_projects.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.state_of_projects.title" />,
        description: <T k="billing.plans.f.state_of_projects.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      // {
      //   title: "Project Updates",
      //   description:
      //     "Keep stakeholders in the loop with a dedicated\nspace for updates that everyone in the project can\nsee.",
      //   comingSoon: true,
      //   cloud: {
      //     free: false,
      //     one: false,
      //     pro: true,
      //     business: true,
      //     enterprise: true,
      //   },
      // },
      {
        title: <T k="billing.plans.f.pre_defined_work_item_templates.title" />,
        description: <T k="billing.plans.f.pre_defined_work_item_templates.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.teamspace_cycles.title" />,
        description: <T k="billing.plans.f.teamspace_cycles.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.project_templates.title" />,
        description: <T k="billing.plans.f.project_templates.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.baselines_and_deviations.title" />,
        description: <T k="billing.plans.f.baselines_and_deviations.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.scheduled_comms.title" />,
        description: <T k="billing.plans.f.scheduled_comms.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.intake_assignees.title" />,
        description: <T k="billing.plans.f.intake_assignees.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.custom_slas.title" />,
        description: <T k="billing.plans.f.custom_slas.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.intake_forms.title" />,
        description: <T k="billing.plans.f.intake_forms.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.emails_for_intake.title" />,
        description: <T k="billing.plans.f.emails_for_intake.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "visualization",
    title: <T k="billing.plans.f.visualization.title" />,
    features: [
      {
        title: <T k="billing.plans.f.layouts.title" />,
        description: <T k="billing.plans.f.layouts.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.views.title" />,
        description: <T k="billing.plans.f.views.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.shared_views.title" />,
        description: <T k="billing.plans.f.shared_views.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.publish_views.title" />,
        description: <T k="billing.plans.f.publish_views.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.dashboards_and_widgets.title" />,
        description: <T k="billing.plans.f.dashboards_and_widgets.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "analytics-reports",
    title: <T k="billing.plans.f.analytics_reports.title" />,
    features: [
      {
        title: <T k="billing.plans.f.progress_charts.title" />,
        description: <T k="billing.plans.f.progress_charts.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.cycle_reports.title" />,
        description: <T k="billing.plans.f.cycle_reports.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.insights.title" />,
        description: <T k="billing.plans.f.insights.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      // {
      //   title: "Time Capsule",
      //   description: "Go back in your project's timeline and see point-in-\ntime snapshots.",
      //   comingSoon: true,
      //   cloud: {
      //     free: false,
      //     one: false,
      //     pro: false,
      //     business: true,
      //     enterprise: true,
      //   },
      // },
      {
        title: <T k="billing.plans.f.advanced_pages_analytics.title" />,
        description: <T k="billing.plans.f.advanced_pages_analytics.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.custom_reports.title" />,
        description: <T k="billing.plans.f.custom_reports.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "navigation",
    title: <T k="billing.plans.f.navigation.title" />,
    features: [
      {
        title: <T k="billing.plans.f.power_k.title" />,
        description: <T k="billing.plans.f.power_k.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      // {
      //   title: "Search",
      //   description: "Search via natural-language queries, operators, or\nPQL",
      //   cloud: {
      //     free: "Basic text search",
      //     one: "Basic text search",
      //     pro: (
      //       <span className="flex flex-col items-end lg:items-center gap-1">
      //         <span className="bg-[#3f76ff] text-on-color font-semibold text-9 p-0.5 w-fit whitespace-nowrap rounded-xs">
      //           {t("billing.plans.coming_soon")}
      //         </span>
      //         Operator capsules from text or PQL
      //       </span>
      //     ),
      //     business: (
      //       <span className="flex flex-col items-end lg:items-center gap-1">
      //         <span className="bg-[#3f76ff] text-on-color font-semibold text-9 p-0.5 w-fit whitespace-nowrap rounded-xs">
      //           {t("billing.plans.coming_soon")}
      //         </span>
      //         Operator capsules from text or PQL
      //       </span>
      //     ),
      //     enterprise: (
      //       <span className="flex flex-col items-end lg:items-center gap-1">
      //         <span className="bg-[#3f76ff] text-on-color font-semibold text-9 p-0.5 w-fit whitespace-nowrap rounded-xs">
      //           {t("billing.plans.coming_soon")}
      //         </span>
      //         Operator capsules from text or PQL
      //       </span>
      //     ),
      //   },
      // },
      {
        title: <T k="billing.plans.f.pql.title" />,
        description: <T k="billing.plans.f.pql.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "workspace-user-management",
    title: <T k="billing.plans.f.workspace_and_user_management.title" />,
    features: [
      {
        title: <T k="billing.plans.f.member_limit.title" />,
        description: <T k="billing.plans.f.member_limit.description" />,
        selfHostedDescription: <T k="billing.plans.f.member_limit.self_hosted_description" />,
        cloud: {
          free: "12",
          one: "",
          pro: <T k="billing.plans.values.unlimited" />,
          business: <T k="billing.plans.values.unlimited" />,
          enterprise: <T k="billing.plans.values.unlimited" />,
        },
        "self-hosted": {
          free: "~50",
          one: "~50",
          pro: "~200",
          business: "~200",
          enterprise: <T k="billing.plans.values.unlimited" />,
        },
      },
      {
        title: <T k="billing.plans.f.roles.title" />,
        description: <T k="billing.plans.f.roles.description" />,
        cloud: {
          free: <T k="billing.plans.values.basic" />,
          one: <T k="billing.plans.values.basic" />,
          pro: <T k="billing.plans.values.pre_defined_roles" />,
          business: "billing.plans.highlights.business_1",
          enterprise: "billing.plans.highlights.enterprise_2",
        },
      },
      {
        title: <T k="billing.plans.f.guests.title" />,
        description: <T k="billing.plans.f.guests.description" />,
        cloud: {
          free: false,
          one: "5 per paid member",
          pro: "5 per paid member",
          business: "5 per paid member",
          enterprise: "5 per paid member",
        },
      },
      {
        title: <T k="billing.plans.f.approvals.title" />,
        description: <T k="billing.plans.f.approvals.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.admin_interface.title" />,
        description: <T k="billing.plans.f.admin_interface.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.workspace_activity_logs.title" />,
        description: <T k="billing.plans.f.workspace_activity_logs.description" />,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.api_enabled_audit_logs.title" />,
        description: <T k="billing.plans.f.api_enabled_audit_logs.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "automations-workflows",
    title: <T k="billing.plans.f.automations_and_workflows.title" />,
    features: [
      {
        title: <T k="billing.plans.f.trigger_and_action.title" />,
        description: <T k="billing.plans.f.trigger_and_action.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.decisions_and_loops_automation.title" />,
        description: <T k="billing.plans.f.decisions_and_loops_automation.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.number_of_automations.title" />,
        description: <T k="billing.plans.f.number_of_automations.description" />,
        cloud: {
          free: false,
          one: false,
          pro: "5,000",
          business: "10,000",
          enterprise: <T k="billing.plans.values.unlimited" />,
        },
      },
    ],
  },
  {
    id: "knowledge-management",
    title: <T k="billing.plans.f.knowledge_management.title" />,
    features: [
      {
        title: <T k="billing.plans.f.pages.title" />,
        description: <T k="billing.plans.f.pages.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.real_time_collab.title" />,
        description: <T k="billing.plans.f.real_time_collab.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.work_item_embeds.title" />,
        description: <T k="billing.plans.f.work_item_embeds.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.link_to_work_items.title" />,
        description: <T k="billing.plans.f.link_to_work_items.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.publish.title" />,
        description: <T k="billing.plans.f.publish.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.wiki.title" />,
        description: <T k="billing.plans.f.wiki.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.exports.title" />,
        description: <T k="billing.plans.f.exports.description" />,
        cloud: {
          free: false,
          one: false,
          pro: "One download\nat a time",
          business: <T k="billing.plans.values.queued_downloads" />,
          enterprise: <T k="billing.plans.values.queued_downloads" />,
        },
      },
      {
        title: <T k="billing.plans.f.templates.title" />,
        description: <T k="billing.plans.f.templates.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.versions.title" />,
        description: <T k="billing.plans.f.versions.description" />,
        cloud: {
          free: false,
          one: false,
          pro: "2 days",
          business: "3 months",
          enterprise: <T k="billing.plans.values.unlimited" />,
        },
      },
      {
        title: <T k="billing.plans.f.databases_formulas.title" />,
        description: <T k="billing.plans.f.databases_formulas.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.nested_pages.title" />,
        description: <T k="billing.plans.f.nested_pages.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: "Word-compatible + other format downloads",
          enterprise: "Word-compatible + other format downloads",
        },
      },
    ],
  },
  {
    id: "importers",
    title: <T k="billing.plans.f.importers.title" />,
    features: [
      {
        title: <T k="billing.plans.f.jira.title" />,
        description: <T k="billing.plans.f.jira.description" />,
        cloud: {
          free: <T k="billing.plans.values.without_custom_props" />,
          one: <T k="billing.plans.values.without_custom_props" />,
          pro: <T k="billing.plans.values.with_custom_props" />,
          business: <T k="billing.plans.values.with_custom_props" />,
          enterprise: <T k="billing.plans.values.with_custom_props" />,
        },
      },
      {
        title: <T k="billing.plans.f.github.title" />,
        description: <T k="billing.plans.f.github.description" />,
        cloud: {
          free: <T k="billing.plans.values.without_custom_props" />,
          one: <T k="billing.plans.values.without_custom_props" />,
          pro: <T k="billing.plans.values.with_custom_props" />,
          business: <T k="billing.plans.values.with_custom_props" />,
          enterprise: <T k="billing.plans.values.with_custom_props" />,
        },
      },
    ],
  },
  {
    id: "integrations",
    title: <T k="billing.plans.f.integrations.title" />,
    comingSoon: true,
    features: [
      {
        title: <T k="billing.plans.f.github.title" />,
        description: <T k="billing.plans.f.github_2.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.slack.title" />,
        description: <T k="billing.plans.f.slack.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.zapier.title" />,
        description: <T k="billing.plans.f.zapier.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.zendesk.title" />,
        description: <T k="billing.plans.f.zendesk.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.freshdesk.title" />,
        description: <T k="billing.plans.f.freshdesk.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "storage",
    title: <T k="billing.plans.f.storage.title" />,
    cloudOnly: true,
    features: [
      {
        title: <T k="billing.plans.f.space.title" />,
        description: <T k="billing.plans.f.space.description" />,
        cloud: {
          free: "5GB",
          one: false,
          pro: "1 TB",
          business: "5 TB",
          enterprise: <T k="billing.plans.values.custom" />,
        },
      },
      {
        title: <T k="billing.plans.f.max_file_size.title" />,
        description: <T k="billing.plans.f.max_file_size.description" />,
        cloud: {
          free: "5 MB",
          one: false,
          pro: "100 MB",
          business: "200 MB",
          enterprise: <T k="billing.plans.values.custom" />,
        },
      },
    ],
  },
  {
    id: "security",
    title: <T k="billing.plans.f.security.title" />,
    features: [
      {
        title: <T k="billing.plans.f.saml.title" />,
        description: <T k="billing.plans.f.saml.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.oidc.title" />,
        description: <T k="billing.plans.f.oidc.description" />,
        selfHostedOnly: true,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.domain_security.title" />,
        description: <T k="billing.plans.f.domain_security.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.two_factor_authentication_and_passkeys.title" />,
        description: <T k="billing.plans.f.two_factor_authentication_and_passkeys.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.password_policy.title" />,
        description: <T k="billing.plans.f.password_policy.description" />,
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.ldap.title" />,
        description: <T k="billing.plans.f.ldap.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: false,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "self-hosted",
    title: <T k="billing.plans.f.self_hosted.title" />,
    selfHostedOnly: true,
    features: [
      {
        title: <T k="billing.plans.f.god_mode.title" />,
        description: <T k="billing.plans.f.god_mode.description" />,
        cloud: {
          free: true,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.one_click_deployment.title" />,
        description: <T k="billing.plans.f.one_click_deployment.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.digital_ocean_marketplace_app.title" />,
        description: <T k="billing.plans.f.digital_ocean_marketplace_app.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.heroku_platform_app.title" />,
        description: <T k="billing.plans.f.heroku_platform_app.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.aws_ami.title" />,
        description: <T k="billing.plans.f.aws_ami.description" />,
        cloud: {
          free: false,
          one: true,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
      {
        title: <T k="billing.plans.f.private_deployments.title" />,
        description: <T k="billing.plans.f.private_deployments.description" />,
        comingSoon: true,
        cloud: {
          free: false,
          one: false,
          pro: false,
          business: false,
          enterprise: true,
        },
      },
    ],
  },
  {
    id: "support",
    title: <T k="billing.plans.f.support.title" />,
    features: [
      {
        title: <T k="billing.plans.f.channels.title" />,
        description: <T k="billing.plans.f.channels.description" />,
        cloud: {
          free: (
            <>
              <ForumIcon className="size-4" />
            </>
          ),
          one: (
            <div className="flex items-center gap-1">
              <Mail className="size-4 flex-shrink-0" />
              <ForumIcon className="size-4 flex-shrink-0" />
            </div>
          ),
          pro: (
            <div className="flex items-center gap-1">
              <Mail className="size-4 flex-shrink-0" />
              <ForumIcon className="size-4 flex-shrink-0" />
              <MessageCircle className="size-4 flex-shrink-0" />
            </div>
          ),
          business: "Full-suite\nprofessional services",
          enterprise: "Full-suite\nprofessional services",
        },
      },
      {
        title: <T k="billing.plans.f.sla.title" />,
        description: (
          <>
            Get business-friendly SLAs with higher plans. SLAs are by priority of work item and tiers{" "}
            <a href="https://plane.so/talk-to-sales" target="_blank" rel="noopener noreferrer" className="underline">
              can be requested
            </a>
            .
          </>
        ),
        cloud: {
          free: false,
          one: false,
          pro: true,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
];

export const PLANE_PLANS: PlanePlans = {
  planDetails: {
    free: {
      id: EProductSubscriptionEnum.FREE,
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      isActive: true,
    },
    one: {
      id: EProductSubscriptionEnum.ONE,
      name: "One",
      monthlyPrice: 799,
      yearlyPrice: 799,
      monthlyPriceSecondaryDescription: <T k="billing.plans.per_workspace" />,
      yearlyPriceSecondaryDescription: <T k="billing.plans.per_workspace" />,
      buttonCTA: <T k="billing.plans.upgrade" />,
      isActive: false,
    },
    pro: {
      id: EProductSubscriptionEnum.PRO,
      name: "sidebar.pro",
      monthlyPrice: 8,
      yearlyPrice: 6,
      monthlyPriceSecondaryDescription: <T k="billing.plans.billed_monthly" />,
      yearlyPriceSecondaryDescription: <T k="billing.plans.billed_yearly" />,
      buttonCTA: <T k="billing.plans.upgrade" />,
      isActive: true,
    },
    business: {
      id: EProductSubscriptionEnum.BUSINESS,
      name: "common.business",
      monthlyPriceSecondaryDescription: <T k="billing.plans.billed_monthly" />,
      yearlyPriceSecondaryDescription: <T k="billing.plans.billed_yearly" />,
      buttonCTA: <T k="billing.plans.talk_to_sales" />,
      isActive: false,
    },
    enterprise: {
      id: EProductSubscriptionEnum.ENTERPRISE,
      name: "Enterprise",
      monthlyPriceSecondaryDescription: <T k="billing.plans.billed_monthly" />,
      yearlyPriceSecondaryDescription: <T k="billing.plans.billed_yearly" />,
      buttonCTA: <T k="billing.plans.talk_to_sales" />,
      isActive: false,
    },
  },
  planHighlights: {
    free: [
      "billing.plans.highlights.free_1",
      "billing.plans.highlights.free_2",
      "billing.plans.highlights.free_3",
      "billing.plans.highlights.free_4",
    ],
    one: [
      "billing.plans.highlights.one_1",
      "billing.plans.highlights.one_2",
      "billing.plans.highlights.one_3",
      "billing.plans.highlights.one_4",
    ],
    pro: [
      "billing.plans.highlights.pro_1",
      "billing.plans.highlights.pro_2",
      "billing.plans.highlights.pro_3",
      "billing.plans.highlights.pro_4",
    ],
    business: [
      "billing.plans.highlights.business_1",
      "billing.plans.highlights.business_2",
      "billing.plans.highlights.business_3",
      "billing.plans.highlights.business_4",
    ],
    enterprise: [
      "billing.plans.highlights.enterprise_1",
      "billing.plans.highlights.enterprise_2",
      "billing.plans.highlights.enterprise_3",
      "billing.plans.highlights.enterprise_4",
    ],
  },
  planComparison: PLANS_COMPARISON_LIST,
};
