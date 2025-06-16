import { Card, CardBody } from "@heroui/card";
import { useEffect, useState, useMemo, useCallback, memo } from "react";

const toFlag = (code: string) =>
  code ?
    String.fromCodePoint(
      ...code
        .toUpperCase()
        .split("")
        .map((c) => 0x1f1a5 + c.charCodeAt(0))
    )
  : "🌍";

const COUNTRY_REGEX = /\b([A-Z]{2})\b/;
const extractCountry = (text: string) => text.match(COUNTRY_REGEX)?.[1] || "";

const useGeoLocation = () => {
  const [geoData, setGeoData] = useState(() => ({ text: "::GEO::", flag: "🌍" }));

  const updateGeoData = useCallback(() => {
    const el = document.querySelector("[data-geo]");
    const text = el?.textContent || "";

    if (!text.includes("::GEO::")) {
      const country = extractCountry(text);
      const flag = toFlag(country);

      setGeoData((prev) => (prev.text !== text || prev.flag !== flag ? { text, flag } : prev));
      return true;
    }
    return false;
  }, []);

  const observerConfig = useMemo(
    () => ({
      subtree: true,
      characterData: true,
      childList: true,
    }),
    []
  );

  useEffect(() => {
    if (updateGeoData()) return;

    const observer = new MutationObserver(updateGeoData);
    observer.observe(document.body, observerConfig);

    return () => observer.disconnect();
  }, [updateGeoData, observerConfig]);

  return geoData;
};

const InfoItem = memo(({ label, value, flag }: { label: string; value: string; flag?: string }) => (
  <div className='flex items-center gap-1.5'>
    <span className='font-medium'>{label}:</span>
    <span className='font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md flex items-center gap-1.5'>
      {flag && <span className='text-base'>{flag}</span>}
      <span {...(label === "Location" ? { "data-geo": true } : {})}>{value}</span>
    </span>
  </div>
));

const Separator = memo(() => <span className='hidden sm:inline text-gray-400 dark:text-gray-600'>•</span>);

export const Footer = memo(() => {
  const { text, flag } = useGeoLocation();

  const cardClassName = useMemo(
    () =>
      "overflow-hidden bg-gray-50 dark:bg-slate-900 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg",
    []
  );

  const containerClassName = useMemo(
    () =>
      "flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm",
    []
  );

  const leftSectionClassName = useMemo(() => "flex flex-col sm:flex-row items-center gap-2 sm:gap-3", []);

  return (
    <div className='mb-4 mx-4'>
      <Card className={cardClassName}>
        <CardBody className='py-4 px-4 sm:px-6'>
          <div className={containerClassName}>
            <div className={leftSectionClassName}>
              <InfoItem
                label='IP'
                value='::CLIENT_IP::'
              />
              <Separator />
              <InfoItem
                label='Ray ID'
                value='::RAY_ID::'
              />
            </div>
            <InfoItem
              label='Location'
              value={text}
              flag={flag}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;
