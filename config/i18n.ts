export interface PageTranslation {
  title: string;
  message: string;
}

export interface InterfaceTranslations {
  message: string;
}

export interface BlockPageTranslation extends PageTranslation {}
export interface ErrorPageTranslation extends PageTranslation {}
export interface ChallengePageTranslation extends PageTranslation {}

export const blockPageTranslations: Record<string, BlockPageTranslation> = {
  ip: {
    title: "您的IP地址已被封禁",
    message: "该网站的所有者已禁止您的IP地址访问。",
  },
  waf: {
    title: "您已被WAF拦截",
    message: "Cloudflare WAF（Web应用防火墙）已拦截您的请求。",
  },
  "rate-limit": {
    title: "访问频率限制 - 429",
    message: "您的请求过于频繁，请稍候再试。",
  },
} as const;

export const errorPageTranslations: Record<string, ErrorPageTranslation> = {
  "500s": {
    title: "服务器内部错误",
    message: "网站发生意外错误，请稍后重试。",
  },
  "1000s": {
    title: "DNS解析错误",
    message: "无法解析请求的主机名，请放心，这不是您的问题。",
  },
} as const;

export const challengePageTranslations: Record<
  string,
  ChallengePageTranslation
> = {
  interactive: {
    title: "交互式验证",
    message: "请完成此验证码以访问网站。",
  },
  managed: {
    title: "攻击防护模式™",
    message: "请完成验证码以继续访问，这是常规安全检查。",
  },
  country: {
    title: "身份验证",
    message: "来自您所在国家/地区的访问者需要进行额外验证。",
  },
  javascript: {
    title: "请稍候...",
    message: "我们的安全系统正在验证您的请求，请稍候。",
  },
} as const;

export const interfaceTranslations: Record<string, InterfaceTranslations> = {
  "error-details": {
    message: "了解更多",
  },
  "connection-tracking": {
    message: "连接跟踪",
  },
  "network-status-you": {
    message: "您",
  },
  "network-status-cdn": {
    message: "CDN",
  },
  "network-status-origin": {
    message: "源站",
  },
} as const;
