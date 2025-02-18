import { Icon } from "@/components/ui/icon";
import type { NetworkStatus } from "@/config/styles";
import { networkStatusStyles } from "@/config/styles";
import { clsx } from "clsx";

interface NetworkNodeProps {
  label: string;
  status: NetworkStatus;
  className?: string;
}

export const NetworkNode = ({ label, status, className }: NetworkNodeProps) => {
  const styles = networkStatusStyles[status];
  const iconName =
    status === "success"
      ? "check-circle"
      : status === "error"
        ? "x-circle"
        : "shield-check";

  return (
    <div
      className={clsx(
        "px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2",
        "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-100",
        "w-[120px] shrink-0",
        styles.base.bg,
        styles.base.text,
        styles.base.ring,
        className,
      )}
    >
      <Icon
        name={iconName}
        className={clsx(
          "w-4 h-4 transition-transform flex-shrink-0",
          styles.base.icon,
          status === "challenging" && "animate-pulse",
        )}
      />
      <span
        className={clsx(
          "truncate",
          status === "challenging" && "animate-pulse",
        )}
      >
        {label}
      </span>
    </div>
  );
};
