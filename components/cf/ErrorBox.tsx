"use client";

import type { ErrorPageConfig } from "@/config/routes";
import { Chip } from "@heroui/chip";
import { CFCard } from "./common";

export const ErrorBox = ({
  title,
  message,
  code,
  box,
  icon: Icon,
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
      icon={<Icon className="h-6 w-6 text-white" />}
      iconClassName="from-red-500 to-red-600"
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
