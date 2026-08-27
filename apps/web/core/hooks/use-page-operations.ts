/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useMemo } from "react";
// plane imports
import { IS_FAVORITE_MENU_OPEN } from "@plane/constants";
import { TOAST_TYPE, setToast } from "@plane/propel/toast";
import { EPageAccess } from "@plane/types";
import { copyUrlToClipboard } from "@plane/utils";
import { useTranslation } from "@plane/i18n";
// hooks
import { useCollaborativePageActions } from "@/hooks/use-collaborative-page-actions";
// store types
import type { TPageInstance } from "@/store/pages/base-page";
// local storage
import useLocalStorage from "./use-local-storage";

export type TPageOperations = {
  toggleLock: () => void;
  toggleAccess: () => void;
  toggleFavorite: () => void;
  openInNewTab: () => void;
  copyLink: () => void;
  duplicate: () => void;
  toggleArchive: () => void;
};

type Props = {
  page: TPageInstance;
};

export const usePageOperations = (
  props: Props
): {
  pageOperations: TPageOperations;
} => {
  const { t } = useTranslation();

  const { page } = props;
  // derived values
  const {
    access,
    addToFavorites,
    archived_at,
    duplicate,
    is_favorite,
    is_locked,
    getRedirectionLink,
    removePageFromFavorites,
  } = page;
  // collaborative actions
  const { executeCollaborativeAction } = useCollaborativePageActions(props);
  // local storage
  const { setValue: toggleFavoriteMenu, storedValue: isFavoriteMenuOpen } = useLocalStorage<boolean>(
    IS_FAVORITE_MENU_OPEN,
    false
  );
  // page operations
  const pageOperations: TPageOperations = useMemo(() => {
    const pageLink = getRedirectionLink();

    return {
      copyLink: async () => {
        await copyUrlToClipboard(pageLink);
        setToast({
          type: TOAST_TYPE.SUCCESS,
          title: t("common.link_copied"),
          message: t("page_actions.toasts.link_copied.message"),
        });
      },
      duplicate: async () => {
        try {
          await duplicate();
          setToast({
            type: TOAST_TYPE.SUCCESS,
            title: t("common.toast.success"),
            message: t("page_actions.toasts.duplicate.success.message"),
          });
        } catch (_error) {
          setToast({
            type: TOAST_TYPE.ERROR,
            title: t("common.toast.error"),
            message: t("page_actions.toasts.duplicate.error.message"),
          });
        }
      },
      move: async () => {},
      openInNewTab: () => window.open(pageLink, "_blank"),
      toggleAccess: async () => {
        const isMakingPrivate = access === EPageAccess.PUBLIC;
        try {
          if (isMakingPrivate)
            await executeCollaborativeAction({ type: "sendMessageToServer", message: "make-private" });
          else await executeCollaborativeAction({ type: "sendMessageToServer", message: "make-public" });
          setToast({
            type: TOAST_TYPE.SUCCESS,
            title: t("common.toast.success"),
            message: isMakingPrivate
              ? t("page_actions.toasts.make_private.success.message")
              : t("page_actions.toasts.make_public.success.message"),
          });
        } catch (_error) {
          setToast({
            type: TOAST_TYPE.ERROR,
            title: t("common.toast.error"),
            message: isMakingPrivate
              ? t("page_actions.toasts.make_private.error.message")
              : t("page_actions.toasts.make_public.error.message"),
          });
        }
      },
      toggleArchive: async () => {
        if (archived_at) {
          try {
            await executeCollaborativeAction({ type: "sendMessageToServer", message: "unarchive" });
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.restore.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.restore.error.message"),
            });
          }
        } else {
          try {
            await executeCollaborativeAction({ type: "sendMessageToServer", message: "archive" });
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.archive.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.archive.error.message"),
            });
          }
        }
      },
      toggleFavorite: async () => {
        if (is_favorite) {
          try {
            await removePageFromFavorites();
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.remove_from_favorites.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.remove_from_favorites.error.message"),
            });
          }
        } else {
          try {
            await addToFavorites();
            if (!isFavoriteMenuOpen) toggleFavoriteMenu(true);
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.add_to_favorites.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.add_to_favorites.error.message"),
            });
          }
        }
      },
      toggleLock: async () => {
        if (is_locked) {
          try {
            await executeCollaborativeAction({ type: "sendMessageToServer", message: "unlock" });
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.unlock.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.unlock.error.message"),
            });
          }
        } else {
          try {
            await executeCollaborativeAction({ type: "sendMessageToServer", message: "lock" });
            setToast({
              type: TOAST_TYPE.SUCCESS,
              title: t("common.toast.success"),
              message: t("page_actions.toasts.lock.success.message"),
            });
          } catch (_error) {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: t("common.toast.error"),
              message: t("page_actions.toasts.lock.error.message"),
            });
          }
        }
      },
    };
  }, [
    access,
    addToFavorites,
    archived_at,
    duplicate,
    executeCollaborativeAction,
    getRedirectionLink,
    is_favorite,
    is_locked,
    isFavoriteMenuOpen,
    removePageFromFavorites,
    toggleFavoriteMenu,
    t,
  ]);
  return {
    pageOperations,
  };
};
