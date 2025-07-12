import { ErrorBox } from "@/components/cf/ErrorBox";
import { CFLayout } from "@/components/layout/CFLayout";
import { Providers } from "@/components/providers";
import { getErrorPageTranslation } from "@/config/i18n";
import type { ErrorPageConfig } from "@/config/routes";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@heroui/button";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const translations = getErrorPageTranslation("404", currentLanguage);

  const config: ErrorPageConfig = {
    type: "1000s",
    code: "404",
    box: "RAY_ID",
    icon: "file-question",
    networkStatus: {
      clientStatus: "success",
      edgeStatus: "success",
      originStatus: "error",
    },
  };

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <CFLayout>
        <div className="space-y-6">
          <ErrorBox {...config} translations={translations} />
          <div className="flex justify-center gap-4">
            <Button color="primary" onPress={() => router.push("/")}>
              {translations.backHome}
            </Button>
            <Button color="secondary" onPress={() => router.reload()}>
              {translations.tryAgain}
            </Button>
          </div>
        </div>
      </CFLayout>
    </Providers>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
