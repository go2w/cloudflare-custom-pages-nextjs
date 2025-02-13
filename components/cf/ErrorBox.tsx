"use client";

import { AlertOctagon } from "lucide-react";
import type { ErrorPageConfig } from "@/config/routes";
import { CFCard } from "./common";

export const ErrorBox = ({ title, message, code, box }: ErrorPageConfig) => {

  return (
    <CFCard
      title={title}
      message={message}
      subtitle={<div className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-sm font-medium text-red-700 dark:text-red-400">Error {code}</div>}
      icon={<AlertOctagon className="h-6 w-6 text-white" />}
      iconClassName="from-red-500 to-red-600"
      footer={box && (
        <>
          <div
            className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: box }}
          />
        </>
      )}
    />
  );
};

export default ErrorBox;