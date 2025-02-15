interface BasePageConfig {
    title: string;
    message: string;
}


export type BlockPageConfig = BasePageConfig & {
    type: "ip" | "waf" | "rate-limit";
    code: string;
};

export type ErrorPageConfig = BasePageConfig & {
    type: "500s" | "1000s";
    code: string;
    box: string;
};

export type ChallengePageConfig = BasePageConfig & {
    type: "interactive" | "managed" | "country" | "javascript";
    box: string | null;
};

export type PageType = "error" | "block" | "challenge";

type BlockType = BlockPageConfig["type"];
type ErrorType = ErrorPageConfig["type"];
type ChallengeType = ChallengePageConfig["type"];

export const directories: PageType[] = ["block", "error", "challenge"];

export const types = {
    block: ["ip", "waf", "rate-limit"] as BlockType[],
    error: ["500s", "1000s"] as ErrorType[],
    challenge: ["interactive", "managed", "country", "javascript"] as ChallengeType[],
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
    },
    waf: {
        type: "waf",
        title: "Firewall Block (1010)",
        message: "The Cloudflare WAF (Web Application Firewall) has blocked your request.",
        code: "1010",
    },
    "rate-limit": {
        type: "rate-limit",
        title: "Rate Limit Block (429)",
        message: "You have made too many requests. Please wait a moment before trying again.",
        code: "429",
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
        message: "An unexpected error occurred. Please try again later.",
        box: "CLOUDFLARE_ERROR_500S_BOX",
    },
    "1000s": {
        type: "1000s",
        code: "1000",
        title: "DNS Resolution Error",
        message: "The requested hostname could not be resolved.",
        box: "CLOUDFLARE_ERROR_1000S_BOX",
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
    },
    managed: {
        type: "managed",
        title: "I'm Under Attack Mode™",
        message: "You might need to click on CAPTCHA before you can continue.",
        box: "CAPTCHA_BOX",
    },
    country: {
        type: "country",
        title: "Country Challenge",
        message: "Additional verification is required for visitors from your Country/Region.",
        box: "CAPTCHA_BOX",
    },
    javascript: {
        type: "javascript",
        title: "JavaScript Challenge",
        message: "Please wait a moment while our security system verifies your request.",
        box: "IM_UNDER_ATTACK_BOX",
    },
};
