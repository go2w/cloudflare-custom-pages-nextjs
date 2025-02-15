import { clsx as cx } from "clsx";
import type { JSX, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  return (
    <div className="relative flex flex-col h-screen">
      <main
        className={cx("container mx-auto max-w-7xl flex-grow", "px-6 pt-16")}
      >
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
