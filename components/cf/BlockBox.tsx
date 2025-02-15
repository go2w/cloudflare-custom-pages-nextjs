"use client";

import type { BlockPageConfig } from "@/config/routes";
import { ShieldOff } from "lucide-react";
import { CFCard } from "./common";

export const BlockBox = ({ title, message, type }: BlockPageConfig) => {
  return (
    <CFCard
      title={title}
      message={message}
      subtitle="Access Denied"
      icon={<ShieldOff className="h-6 w-6 text-white" />}
      headerClassName="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-gray-900"
      iconClassName="from-red-500 to-red-600"
    >
      <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 p-4 backdrop-blur-sm border border-red-100 dark:border-red-900/50">
        <div className="font-mono text-sm">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <span className="font-semibold">Your IP:</span>
            <code>::CLIENT_IP::</code>
          </div>

          {type === "waf" && (
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mt-2">
              <span className="font-semibold">Ray ID:</span>
              <code>::RAY_ID::</code>
            </div>
          )}
        </div>
      </div>
    </CFCard>
  );
};

export default BlockBox;
