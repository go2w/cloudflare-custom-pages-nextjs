"use client";

import { Icon } from "@/components/ui/icon";
import type { ErrorPageConfig } from "@/config/routes";
import { Chip } from "@heroui/chip";
import { CFCard } from "./ui/CFCard";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";

export const ErrorBox = ({
  title,
  message,
  code,
  box,
  icon,
  networkStatus,
}: ErrorPageConfig) => {
  return (
    <div>
      <CFCard
        title={title}
        message={message}
        subtitle={
          <Chip variant="flat" color="danger" size="sm">
            Error {code}
          </Chip>
        }
        icon={<Icon name={icon} className="h-6 w-6 text-white" />}
        scheme="danger"
      >
        <NetworkStatusWrapper>
          <NetworkStatusBox {...networkStatus} />
        </NetworkStatusWrapper>
      </CFCard>
    </div>
  );
};

export default ErrorBox;
