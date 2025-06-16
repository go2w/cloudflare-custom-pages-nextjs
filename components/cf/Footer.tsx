import { Card, CardBody } from "@heroui/card";
import { memo, useEffect, useState, useMemo } from "react";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { countryCodeToFlag } from "./utils";

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

const useGeoLocation = () => {
  const [geoData, setGeoData] = useState({ text: "", flag: "🌍" });

  useEffect(() => {
    const locationMeta = document.querySelector('meta[name="location-code"]');
    const text = locationMeta?.getAttribute("content") || "";

    if (text && text.length === 2 && /^[A-Za-z]{2}$/.test(text)) {
      const flag = countryCodeToFlag(text);
      setGeoData({ text, flag });
    } else {
      setGeoData({ text, flag: "🌍" });
    }
  }, []);

  return geoData;
};

const useMetaContent = (metaName: string, defaultValue: string) => {
  const [content, setContent] = useState(defaultValue);

  useEffect(() => {
    const meta = document.querySelector(`meta[name="${metaName}"]`);
    const value = meta?.getAttribute("content") || defaultValue;
    setContent(value);
  }, [metaName, defaultValue]);

  return content;
};

interface InfoItemProps {
  label: string;
  value: string;
  flag?: string;
  isGeo?: boolean;
}

const InfoItem = memo(
  ({ label, value, flag, isGeo = false }: InfoItemProps) => (
    <span className="text-xs text-gray-500 flex items-center gap-1">
      {label}:{flag && <span>{flag}</span>}
      <span>{value}</span>
    </span>
  ),
);

InfoItem.displayName = "InfoItem";

const Separator = memo(() => <span className="text-xs text-gray-400">•</span>);
Separator.displayName = "Separator";

export const FooterContent = memo(() => {
  const { text, flag } = useGeoLocation();
  const clientIp = useMetaContent("client-ip", "");
  const rayId = useMetaContent("ray-id", "");

  const geoDisplayValue = useMemo(() => {
    return text || "Unknown";
  }, [text]);

  const ipDisplayValue = useMemo(() => {
    return clientIp || "Unknown";
  }, [clientIp]);

  const rayDisplayValue = useMemo(() => {
    return rayId || "Unknown";
  }, [rayId]);

  return (
    <CFCardWrap>
      <Card className="w-full border-0 shadow-none bg-transparent">
        <CardBody className="p-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <InfoItem
              label="Location"
              value={geoDisplayValue}
              flag={flag}
              isGeo={true}
            />
            <Separator />
            <InfoItem label="IP" value={ipDisplayValue} />
            <Separator />
            <InfoItem label="Ray ID" value={rayDisplayValue} />
          </div>
        </CardBody>
      </Card>
    </CFCardWrap>
  );
});
FooterContent.displayName = "FooterContent";

export const Footer = memo(() => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <FooterContent />;
});

Footer.displayName = "Footer";
export default Footer;
