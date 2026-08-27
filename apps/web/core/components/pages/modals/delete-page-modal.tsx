/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useState } from "react";
import { observer } from "mobx-react";
// ui
import { useParams } from "next/navigation";
import { TOAST_TYPE, setToast } from "@plane/propel/toast";
import { AlertModalCore } from "@plane/ui";
import { getPageName } from "@plane/utils";
import { useTranslation } from "@plane/i18n";
// constants
// plane web hooks
import { useAppRouter } from "@/hooks/use-app-router";
import type { EPageStoreType } from "@/hooks/store";
import { usePageStore } from "@/hooks/store";
// store
import type { TPageInstance } from "@/store/pages/base-page";

type TConfirmPageDeletionProps = {
  isOpen: boolean;
  onClose: () => void;
  page: TPageInstance;
  storeType: EPageStoreType;
};

export const DeletePageModal = observer(function DeletePageModal(props: TConfirmPageDeletionProps) {
  const { t } = useTranslation();

  const { isOpen, onClose, page, storeType } = props;
  // states
  const [isDeleting, setIsDeleting] = useState(false);
  // store hooks
  const { removePage } = usePageStore(storeType);

  // derived values
  const { id: pageId, name } = page;

  const handleClose = () => {
    setIsDeleting(false);
    onClose();
  };

  const router = useAppRouter();
  const { pageId: routePageId } = useParams();

  const handleDelete = async () => {
    if (!pageId) return;
    setIsDeleting(true);
    await removePage({ pageId })
      .then(() => {
        handleClose();
        setToast({
          type: TOAST_TYPE.SUCCESS,
          title: t("common.toast.success"),
          message: t("page_actions.toasts.delete.success.message"),
        });

        if (routePageId) {
          router.back();
        }
      })
      .catch(() => {
        setToast({
          type: TOAST_TYPE.ERROR,
          title: t("common.toast.error"),
          message: t("page_actions.toasts.delete.error.message"),
        });
      });

    setIsDeleting(false);
  };

  if (!page || !page.id) return null;

  return (
    <AlertModalCore
      handleClose={handleClose}
      handleSubmit={handleDelete}
      isSubmitting={isDeleting}
      isOpen={isOpen}
      title={t("page_actions.delete_page")}
      content={
        <>
          Are you sure you want to delete page-{" "}
          <span className="font-medium break-words break-all text-primary">{getPageName(name)}</span> ? The Page will be
          deleted permanently. This action cannot be undone.
        </>
      }
    />
  );
});
