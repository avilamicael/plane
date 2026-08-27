/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import React from "react";
// components
import { PageHead } from "@/components/core/page-title";
import { ProfileIssuesPage } from "@/components/profile/profile-issues";
import type { Route } from "./+types/page";
import { useTranslation } from "@plane/i18n";

const ProfilePageHeader = {
  assigned: "page_titles.profile_assigned",
  created: "page_titles.profile_created",
  subscribed: "page_titles.profile_subscribed",
};

function isValidProfileViewId(viewId: string): viewId is keyof typeof ProfilePageHeader {
  return viewId in ProfilePageHeader;
}

function ProfileIssuesTypePage({ params }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { profileViewId } = params;

  if (!isValidProfileViewId(profileViewId)) return null;

  const header = t(ProfilePageHeader[profileViewId]);

  return (
    <>
      <PageHead title={header} />
      <ProfileIssuesPage type={profileViewId} />
    </>
  );
}

export default ProfileIssuesTypePage;
