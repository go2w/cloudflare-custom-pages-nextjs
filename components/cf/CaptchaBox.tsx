"use client";

import type { ChallengePageConfig } from "@/config/routes";
import { Info } from "lucide-react";
import { CFCard } from "./common";

export const CaptchaBox = ({
  title,
  message,
  box,
  icon: Icon,
}: ChallengePageConfig) => {
  return (
    <CFCard
      title={title}
      message=""
      subtitle="Security Check"
      icon={<Icon className="h-6 w-6 text-white" />}
      headerClassName="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10"
      iconClassName="from-blue-500 to-blue-600"
    >
      {message && (
        <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <p className="text-sm text-blue-700 dark:text-blue-300">{message}</p>
        </div>
      )}

      <div className="w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors hover:border-blue-200 dark:hover:border-blue-700">
        {box ? (
          <div
            className="text-gray-600 dark:text-gray-300 p-4 w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: `<div>::${box}::</div>` }}
          />
        ) : (
          <p className="text-gray-400 dark:text-gray-500 font-medium">
            Loading verification...
          </p>
        )}
      </div>
    </CFCard>
  );
};

export default CaptchaBox;
