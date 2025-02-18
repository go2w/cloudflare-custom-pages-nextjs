import type { ReactNode } from "react";
import Footer from "../cf/Footer";
import { BaseLayout } from "./BaseLayout";

interface CFLayoutProps {
  children: ReactNode;
}

export const CFLayout = ({ children }: CFLayoutProps) => {
  return (
    <BaseLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full px-2 sm:px-4 lg:px-6">
        <div className="flex-grow flex items-center justify-center w-full max-w-[420px] md:max-w-2xl lg:max-w-3xl mx-auto">
          {children}
        </div>
        <Footer />
      </div>
    </BaseLayout>
  );
};

export default CFLayout;
