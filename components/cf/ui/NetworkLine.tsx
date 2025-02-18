import type { NetworkStatus } from "@/config/styles";
import { networkStatusStyles } from "@/config/styles";
import { clsx } from "clsx";

interface NetworkLineProps {
  status: NetworkStatus;
}

export const NetworkLine = ({ status }: NetworkLineProps) => {
  const styles = networkStatusStyles[status].line;

  return (
    <div className="flex-1 flex items-center px-3">
      <div
        className={clsx(
          "h-0.5 w-full relative transition-all duration-500 overflow-hidden",
          styles.base,
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 w-full h-full",
            styles.animation,
            styles.gradient,
          )}
        />
      </div>
    </div>
  );
};
