"use client";

import { Icon } from "@/components/ui/icon";
import { errorPageTranslations, interfaceTranslations } from "@/config/i18n";
import type { ErrorPageConfig } from "@/config/routes";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";
import { CFCard } from "./ui/CFCard";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";

export const ErrorBox = ({
  type,
  code,
  box,
  icon,
  networkStatus,
}: ErrorPageConfig) => {
  const translation = errorPageTranslations[type];
  return (
    <div>
      <CFCard
        title={translation.title}
        message={translation.message}
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
                title={interfaceTranslations["error-details"].message}
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
