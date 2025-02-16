"use client";

import { Icon } from "@/components/ui/icon";
import type { ErrorPageConfig } from "@/config/routes";
import { Chip } from "@heroui/chip";
import { CFCard } from "./ui/CFCard";

export const ErrorBox = ({
  title,
  message,
  code,
  box,
  icon,
}: ErrorPageConfig) => {
  return (
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
      footer={
        box && (
          <div
            className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: `::${box}::` }}
          />
        )
      }
    />
  );
};

export default ErrorBox;
