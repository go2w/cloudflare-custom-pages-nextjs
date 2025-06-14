import type { JSX, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <main className="flex-grow pt-3 sm:pt-4 md:pt-6">{children}</main>
    </div>
  );
};

export default BaseLayout;
