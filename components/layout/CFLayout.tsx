import { ReactNode } from "react";
import { BaseLayout } from "./BaseLayout";
import Footer from "../cf/Footer";
import clsx from "clsx";

interface CFLayoutProps {
  children: ReactNode;
}

export const CFLayout = ({
  children
}: CFLayoutProps) => {
  return (
    <BaseLayout>
      <div className={clsx(
        "flex flex-col",
        "min-h-[calc(100vh-4rem)]",
        "w-full",
        "px-4 sm:px-6 md:px-8"
      )}>
        <div className={clsx(
          "flex-grow",
          "flex items-center justify-center",
          "w-full max-w-7xl",
          "mx-auto"
        )}>
          {children}
        </div>
        <Footer />
      </div>
    </BaseLayout>
  );
};

export default CFLayout;