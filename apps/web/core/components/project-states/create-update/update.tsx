/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useState } from "react";
import { observer } from "mobx-react";
import { TOAST_TYPE, setToast } from "@plane/propel/toast";
import type { IState, TStateOperationsCallbacks } from "@plane/types";
import { useTranslation } from "@plane/i18n";
// components
import { StateForm } from "@/components/project-states";

type TStateUpdate = {
  state: IState;
  updateStateCallback: TStateOperationsCallbacks["updateState"];
  handleClose: () => void;
};

export const StateUpdate = observer(function StateUpdate(props: TStateUpdate) {
  const { t } = useTranslation();

  const { state, updateStateCallback, handleClose } = props;
  // states
  const [loader, setLoader] = useState(false);

  const onCancel = () => {
    setLoader(false);
    handleClose();
  };

  const onSubmit = async (formData: Partial<IState>) => {
    if (!state.id) return { status: "error" };

    try {
      await updateStateCallback(state.id, formData);
      setToast({
        type: TOAST_TYPE.SUCCESS,
        title: t("common.toast.success"),
        message: t("project_settings.states.toasts.update.success.message"),
      });
      handleClose();
      return { status: "success" };
    } catch (error) {
      const errorStatus = error as { status: number };
      if (errorStatus?.status === 400) {
        setToast({
          type: TOAST_TYPE.ERROR,
          title: t("common.toast.error"),
          message: t("project_settings.states.toasts.update.error.name_exists"),
        });
        return { status: "already_exists" };
      } else {
        setToast({
          type: TOAST_TYPE.ERROR,
          title: t("common.toast.error"),
          message: t("project_settings.states.toasts.update.error.message"),
        });
        return { status: "error" };
      }
    }
  };

  return (
    <StateForm
      data={state}
      onSubmit={onSubmit}
      onCancel={onCancel}
      buttonDisabled={loader}
      buttonTitle={loader ? `Updating` : `Update`}
    />
  );
});
