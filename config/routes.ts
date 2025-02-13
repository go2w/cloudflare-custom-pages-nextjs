export type BlockPageConfig = {
    type: "ip" | "waf" | "rate-limit";
    title: string;
    message: string;
    code: string;
};

export type ErrorPageConfig = {
    code: string;
    title: string;
    message: string;
    box: string;
};

export type ChallengePageConfig = {
    type: "interactive" | "managed" | "country" | "javascript";
    title: string;
    message: string;
    box: string | null;
};

export const blockPages: Record<string, BlockPageConfig> = {
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

export const errorPages: Record<string, ErrorPageConfig> = {
    "500s": {
        code: "500",
        title: "Server Error",
        message: "An unexpected error occurred. Please try again later.",
        box: "::CLOUDFLARE_ERROR_500S_BOX::",
    },
    "1000s": {
        code: "1000",
        title: "DNS Resolution Error",
        message: "The requested hostname could not be resolved.",
        box: "::CLOUDFLARE_ERROR_1000S_BOX::",
    },
};

export const challengePages: Record<string, ChallengePageConfig> = {
    interactive: {
        type: "interactive",
        title: "Security Check",
        message: "Please complete this security check to access the site.",
        box: "::CAPTCHA_BOX::",
    },
    managed: {
        type: "managed",
        title: "Managed Challenge",
        message: "You might need to click on CAPTCHA before you can continue.",
        box: "::CAPTCHA_BOX::",
    },
    country: {
        type: "country",
        title: "Country Challenge",
        message: "Additional verification is required for visitors from [::GEO::].",
        box: "::CAPTCHA_BOX::",
    },
    javascript: {
        type: "javascript",
        title: "JavaScript Challenge",
        message: "Please wait a moment while our security system verifies your request.",
        box: "::IM_UNDER_ATTACK_BOX::",
    },
};
