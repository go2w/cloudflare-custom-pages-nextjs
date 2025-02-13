import { ReactNode } from "react";
import clsx from "clsx";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({
  children,
}: BaseLayoutProps) => {

  return (
    <div className="relative flex flex-col h-screen">
      <main className={clsx(
        "container mx-auto max-w-7xl flex-grow",
        "px-6 pt-16"
      )}>
        {children}
      </main>
    </div>
  );
};

export default BaseLayout; 