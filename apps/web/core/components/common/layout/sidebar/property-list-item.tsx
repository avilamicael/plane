/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { ReactNode } from "react";
import { cn } from "@plane/utils";

type TSidebarPropertyListItemProps = {
  icon: React.FC<{ className?: string }>;
  label: string;
  children: ReactNode;
  appendElement?: ReactNode;
  childrenClassName?: string;
};

export function SidebarPropertyListItem(props: TSidebarPropertyListItemProps) {
  const { icon: Icon, label, children, appendElement, childrenClassName } = props;

  return (
    <div className="flex items-start gap-2">
      {/* w-36: a largura anterior (w-30, 120px) foi calibrada no inglês e "Data de
          vencimento" ocupa exatamente 120px, invadindo o campo ao lado. O truncate
          com title garante que nenhum idioma quebre o layout. */}
      <div className="flex h-7.5 w-36 shrink-0 items-center gap-1.5 pr-2 text-body-xs-regular text-tertiary">
        <Icon className="size-4 shrink-0" />
        <span className="truncate" title={typeof label === "string" ? label : undefined}>
          {label}
        </span>
        {appendElement}
      </div>
      <div className={cn("flex grow flex-wrap items-center gap-1", childrenClassName)}>{children}</div>
    </div>
  );
}
