import { Card, CardBody } from "@heroui/card";
import { memo, useCallback, useEffect, useState } from "react";

const toFlag = (code: string) => {
  if (!code || code.length !== 2) return "🌍";
  try {
    return String.fromCodePoint(
      ...code
        .toUpperCase()
        .split("")
        .map((c) => 0x1f1a5 + c.charCodeAt(0)),
    );
  } catch {
    console.warn("Failed to generate flag for code:", code);
    return "🌍";
  }
};

const useGeoLocation = () => {
  const [geoData, setGeoData] = useState({ text: "::GEO::", flag: "🌍" });

  const updateGeoData = useCallback(() => {
    const locationMeta = document.querySelector('meta[name="location-code"]');
    const text = locationMeta?.getAttribute("content") || "::GEO::";

    if (!text.includes("::GEO::")) {
      const flag = /^[A-Z]{2}$/.test(text) ? toFlag(text) : "🌍";

      setGeoData((prev) =>
        prev.text !== text || prev.flag !== flag ? { text, flag } : prev,
      );
    }
  }, []);

  useEffect(() => {
    updateGeoData();

    const observer = new MutationObserver(() => {
      setTimeout(updateGeoData, 200);
    });

    observer.observe(document.head, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    const interval = setInterval(updateGeoData, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [updateGeoData]);

  return geoData;
};

const useMetaContent = (metaName: string, defaultValue: string) => {
  const [content, setContent] = useState(defaultValue);

  const updateContent = useCallback(() => {
    const meta = document.querySelector(`meta[name="${metaName}"]`);
    const value = meta?.getAttribute("content") || defaultValue;
    setContent(value);
  }, [metaName, defaultValue]);

  useEffect(() => {
    updateContent();

    const observer = new MutationObserver(() => {
      setTimeout(updateContent, 200);
    });

    observer.observe(document.head, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    const interval = setInterval(updateContent, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [updateContent]);

  return content;
};

const InfoItem = memo(
  ({
    label,
    value,
    flag,
    isGeo = false,
  }: { label: string; value: string; flag?: string; isGeo?: boolean }) => (
    <div className="flex items-center gap-1.5">
      <span className="font-medium">{label}:</span>
      <span className="font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md flex items-center gap-1.5">
        {flag && <span className="text-base">{flag}</span>}
        <span {...(isGeo ? { "data-geo": true } : {})}>{value}</span>
      </span>
    </div>
  ),
);

const Separator = memo(() => (
  <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
));

export const Footer = memo(() => {
  const { text, flag } = useGeoLocation();
  const clientIp = useMetaContent("client-ip", "::CLIENT_IP::");
  const rayId = useMetaContent("ray-id", "::RAY_ID::");

  return (
    <div className="mb-4 mx-auto max-w-xl">
      <Card className="overflow-hidden bg-gray-50 dark:bg-slate-900 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg m-2 sm:m-4">
        <CardBody className="py-4 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <InfoItem label="IP" value={clientIp} />
              <Separator />
              <InfoItem label="Ray ID" value={rayId} />
            </div>
            <InfoItem label="Location" value={text} flag={flag} isGeo />
          </div>
        </CardBody>
      </Card>
    </div>
  );
});

Footer.displayName = "Footer";
export default Footer;
