import type { JSX, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <main className="flex-grow pt-12">{children}</main>
    </div>
  );
};

export default BaseLayout;
