"use client";

import { Icon } from "@/components/ui/icon";
import type { ErrorPageConfig } from "@/config/routes";
import { Accordion, AccordionItem } from "@heroui/accordion";
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

        {box && (
          <div className="mt-4">
            <Accordion variant="light">
              <AccordionItem
                key="error-details"
                title="Details"
                classNames={{
                  base: "border-none",
                  heading: "p-0",
                  trigger: "px-0 py-2 hover:bg-transparent",
                  content: "px-0 pt-2 pb-0",
                }}
              >
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<div>::${box}::</div>`,
                    }}
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CFCard>
    </div>
  );
};

export default ErrorBox;
