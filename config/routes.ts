import type { IconKey } from "@/config/icons";

interface BasePageConfig {
  title: string;
  message: string;
  icon: IconKey;
}

export type BlockPageConfig = BasePageConfig & {
  type: "ip" | "waf" | "rate-limit";
  code: string;
  networkStatus: NetworkStatusConfig;
};

export type ErrorPageConfig = BasePageConfig & {
  type: "500s" | "1000s";
  code: string;
  box: string;
  networkStatus: NetworkStatusConfig;
};

export type ChallengePageConfig = BasePageConfig & {
  type: "interactive" | "managed" | "country" | "javascript";
  box: string | null;
  networkStatus: NetworkStatusConfig;
};

export type PageType = "error" | "block" | "challenge";

type BlockType = BlockPageConfig["type"];
type ErrorType = ErrorPageConfig["type"];
type ChallengeType = ChallengePageConfig["type"];

export const directories: PageType[] = ["block", "error", "challenge"];

export const types = {
  block: ["ip", "waf", "rate-limit"] as BlockType[],
  error: ["500s", "1000s"] as ErrorType[],
  challenge: [
    "interactive",
    "managed",
    "country",
    "javascript",
  ] as ChallengeType[],
};

/**
 * Block 页面分类配置
 * @type {Record<BlockType, BlockPageConfig>}
 */
export const blockPages: Record<BlockType, BlockPageConfig> = {
  ip: {
    type: "ip",
    title: "Access Denied (1006)",
    message: "The owner of this website has banned your IP address.",
    code: "1006",
    icon: "shield-ban",
    networkStatus: {
      clientStatus: "error",
      edgeStatus: "success",
    },
  },
  waf: {
    type: "waf",
    title: "Firewall Block (1010)",
    message:
      "The Cloudflare WAF (Web Application Firewall) has blocked your request.",
    code: "1010",
    icon: "shield",
    networkStatus: {
      clientStatus: "error",
      edgeStatus: "success",
    },
  },
  "rate-limit": {
    type: "rate-limit",
    title: "Rate Limit Block (429)",
    message:
      "You have made too many requests. Please wait a moment before trying again.",
    code: "429",
    icon: "loader",
    networkStatus: {
      clientStatus: "challenging",
      edgeStatus: "success",
    },
  },
};

/**
 * Error 页面分类配置
 * @type {Record<ErrorType, ErrorPageConfig>}
 */
export const errorPages: Record<ErrorType, ErrorPageConfig> = {
  "500s": {
    type: "500s",
    code: "500",
    title: "Server Error",
    message:
      "Please try again later, there was an unexpected error on the site.",
    box: "CLOUDFLARE_ERROR_500S_BOX",
    icon: "badge-alert",
    networkStatus: {
      clientStatus: "success",
      edgeStatus: "success",
      originStatus: "error",
    },
  },
  "1000s": {
    type: "1000s",
    code: "1000",
    title: "DNS Resolution Error",
    message:
      "The requested hostname could not be resolved. Don't worry, it's not your problem.",
    box: "CLOUDFLARE_ERROR_1000S_BOX",
    icon: "construction",
    networkStatus: {
      clientStatus: "success",
      edgeStatus: "success",
      originStatus: "error",
    },
  },
};

/**
 * Challenge 页面分类配置
 * @type {Record<ChallengeType, ChallengePageConfig>}
 */
export const challengePages: Record<ChallengeType, ChallengePageConfig> = {
  interactive: {
    type: "interactive",
    title: "Interactive Challenge",
    message: "Please complete this CAPTCHA to access the site.",
    box: "CAPTCHA_BOX",
    icon: "shield",
    networkStatus: {
      clientStatus: "challenging",
      edgeStatus: "success",
    },
  },
  managed: {
    type: "managed",
    title: "I'm Under Attack Mode™",
    message: "Complete CAPTCHA to proceed. This is a general security check.",
    box: "CAPTCHA_BOX",
    icon: "shield-check",
    networkStatus: {
      clientStatus: "challenging",
      edgeStatus: "success",
    },
  },
  country: {
    type: "country",
    title: "Country Challenge",
    message:
      "Additional verification is required for visitors from your Country/Region.",
    box: "CAPTCHA_BOX",
    icon: "shield-alert",
    networkStatus: {
      clientStatus: "challenging",
      edgeStatus: "success",
    },
  },
  javascript: {
    type: "javascript",
    title: "JavaScript Challenge",
    message:
      "Please wait a moment while our security system verifies your request.",
    box: "IM_UNDER_ATTACK_BOX",
    icon: "shield-ellipsis",
    networkStatus: {
      clientStatus: "challenging",
      edgeStatus: "success",
    },
  },
};

export interface NetworkStatusConfig {
  clientStatus: "success" | "error" | "challenging";
  edgeStatus: "success" | "error";
  originStatus?: "success" | "error";
  className?: string;
}
