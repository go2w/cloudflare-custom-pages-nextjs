// 支持的语言类型
export type SupportedLocale = "en" | "zh" | "ja" | "ko" | "fr" | "de" | "es";

// 页面翻译接口
export interface PageTranslation {
  title: string;
  message: string;
}

// 界面翻译接口
export interface InterfaceTranslations {
  message: string;
}

// 特定页面类型的翻译接口
export interface BlockPageTranslation extends PageTranslation {}
export interface ErrorPageTranslation extends PageTranslation {
  backHome?: string;
  tryAgain?: string;
}
export interface ChallengePageTranslation extends PageTranslation {}

// 多语言翻译类型
export type LocalizedTranslations<T> = Record<SupportedLocale, T>;

// 多语言Block页面翻译
export const blockPageTranslations: Record<
  string,
  LocalizedTranslations<BlockPageTranslation>
> = {
  ip: {
    en: {
      title: "Your IP is blocked",
      message: "The owner of this website has banned your IP address.",
    },
    zh: {
      title: "您的IP地址已被封禁",
      message: "网站所有者已禁止您的IP地址访问。",
    },
    ja: {
      title: "IPアドレスがブロックされています",
      message: "このウェブサイトの所有者があなたのIPアドレスを禁止しています。",
    },
    ko: {
      title: "IP 주소가 차단되었습니다",
      message: "이 웹사이트 소유자가 귀하의 IP 주소를 차단했습니다.",
    },
    fr: {
      title: "Votre adresse IP est bloquée",
      message: "Le propriétaire de ce site web a banni votre adresse IP.",
    },
    de: {
      title: "Ihre IP-Adresse ist blockiert",
      message: "Der Eigentümer dieser Website hat Ihre IP-Adresse gesperrt.",
    },
    es: {
      title: "Su dirección IP está bloqueada",
      message: "El propietario de este sitio web ha prohibido su dirección IP.",
    },
  },
  waf: {
    en: {
      title: "You're blocked by WAF",
      message:
        "The Cloudflare WAF (Web Application Firewall) has blocked your request.",
    },
    zh: {
      title: "您被WAF拦截",
      message: "Cloudflare WAF（Web应用防火墙）已拦截您的请求。",
    },
    ja: {
      title: "WAFによってブロックされています",
      message:
        "Cloudflare WAF（Webアプリケーションファイアウォール）があなたのリクエストをブロックしました。",
    },
    ko: {
      title: "WAF에 의해 차단되었습니다",
      message:
        "Cloudflare WAF(웹 애플리케이션 방화벽)가 귀하의 요청을 차단했습니다.",
    },
    fr: {
      title: "Vous êtes bloqué par WAF",
      message:
        "Le WAF Cloudflare (Web Application Firewall) a bloqué votre demande.",
    },
    de: {
      title: "Sie werden von WAF blockiert",
      message:
        "Die Cloudflare WAF (Web Application Firewall) hat Ihre Anfrage blockiert.",
    },
    es: {
      title: "Está bloqueado por WAF",
      message:
        "El WAF de Cloudflare (Web Application Firewall) ha bloqueado su solicitud.",
    },
  },
  "rate-limit": {
    en: {
      title: "Rate Limit Block - 429",
      message:
        "You have made too many requests. Please wait a moment before trying again.",
    },
    zh: {
      title: "请求频率限制 - 429",
      message: "您的请求过于频繁，请稍等片刻后再试。",
    },
    ja: {
      title: "レート制限ブロック - 429",
      message: "リクエストが多すぎます。しばらく待ってから再試行してください。",
    },
    ko: {
      title: "요청 제한 차단 - 429",
      message: "너무 많은 요청을 했습니다. 잠시 기다린 후 다시 시도해주세요.",
    },
    fr: {
      title: "Blocage de limite de taux - 429",
      message:
        "Vous avez fait trop de demandes. Veuillez attendre un moment avant de réessayer.",
    },
    de: {
      title: "Rate-Limit-Sperre - 429",
      message:
        "Sie haben zu viele Anfragen gestellt. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.",
    },
    es: {
      title: "Bloqueo por límite de velocidad - 429",
      message:
        "Ha realizado demasiadas solicitudes. Espere un momento antes de intentarlo de nuevo.",
    },
  },
} as const;

// 多语言错误页面翻译
export const errorPageTranslations: Record<
  string,
  LocalizedTranslations<ErrorPageTranslation>
> = {
  "500s": {
    en: {
      title: "Internal Server Error",
      message:
        "Please try again later, there was an unexpected error on the site.",
    },
    zh: {
      title: "内部服务器错误",
      message: "网站发生意外错误，请稍后再试。",
    },
    ja: {
      title: "内部サーバーエラー",
      message:
        "サイトで予期しないエラーが発生しました。後でもう一度お試しください。",
    },
    ko: {
      title: "내부 서버 오류",
      message:
        "사이트에서 예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    },
    fr: {
      title: "Erreur interne du serveur",
      message:
        "Veuillez réessayer plus tard, il y a eu une erreur inattendue sur le site.",
    },
    de: {
      title: "Interner Serverfehler",
      message:
        "Bitte versuchen Sie es später erneut, es gab einen unerwarteten Fehler auf der Website.",
    },
    es: {
      title: "Error interno del servidor",
      message:
        "Inténtelo de nuevo más tarde, hubo un error inesperado en el sitio.",
    },
  },
  "1000s": {
    en: {
      title: "DNS Resolution Error",
      message:
        "The requested hostname could not be resolved. Don't worry, it's not your problem.",
    },
    zh: {
      title: "DNS解析错误",
      message: "无法解析请求的主机名。别担心，这不是您的问题。",
    },
    ja: {
      title: "DNS解決エラー",
      message:
        "要求されたホスト名を解決できませんでした。心配しないでください、これはあなたの問題ではありません。",
    },
    ko: {
      title: "DNS 해결 오류",
      message:
        "요청된 호스트명을 해결할 수 없습니다. 걱정하지 마세요, 이것은 귀하의 문제가 아닙니다.",
    },
    fr: {
      title: "Erreur de résolution DNS",
      message:
        "Le nom d'hôte demandé n'a pas pu être résolu. Ne vous inquiétez pas, ce n'est pas votre problème.",
    },
    de: {
      title: "DNS-Auflösungsfehler",
      message:
        "Der angeforderte Hostname konnte nicht aufgelöst werden. Keine Sorge, das ist nicht Ihr Problem.",
    },
    es: {
      title: "Error de resolución DNS",
      message:
        "No se pudo resolver el nombre de host solicitado. No se preocupe, no es su problema.",
    },
  },
  "404": {
    en: {
      title: "Page Not Found",
      message: "The page you are looking for could not be found.",
      backHome: "Return to Home",
      tryAgain: "Try Again",
    },
    zh: {
      title: "页面未找到",
      message: "您要查找的页面无法找到。",
      backHome: "返回首页",
      tryAgain: "重试",
    },
    ja: {
      title: "ページが見つかりません",
      message: "お探しのページが見つかりませんでした。",
      backHome: "ホームに戻る",
      tryAgain: "再試行",
    },
    ko: {
      title: "페이지를 찾을 수 없습니다",
      message: "찾고 있는 페이지를 찾을 수 없습니다.",
      backHome: "홈으로 돌아가기",
      tryAgain: "다시 시도",
    },
    fr: {
      title: "Page non trouvée",
      message: "La page que vous recherchez est introuvable.",
      backHome: "Retour à l'accueil",
      tryAgain: "Réessayer",
    },
    de: {
      title: "Seite nicht gefunden",
      message: "Die gesuchte Seite konnte nicht gefunden werden.",
      backHome: "Zur Startseite",
      tryAgain: "Erneut versuchen",
    },
    es: {
      title: "Página no encontrada",
      message: "No se pudo encontrar la página que está buscando.",
      backHome: "Volver al inicio",
      tryAgain: "Intentar de nuevo",
    },
  },
} as const;

// 多语言挑战页面翻译
export const challengePageTranslations: Record<
  string,
  LocalizedTranslations<ChallengePageTranslation>
> = {
  interactive: {
    en: {
      title: "Interactive Challenge",
      message: "Please complete this CAPTCHA to access the site.",
    },
    zh: {
      title: "交互式验证",
      message: "请完成此验证码以访问网站。",
    },
    ja: {
      title: "インタラクティブチャレンジ",
      message: "サイトにアクセスするには、このCAPTCHAを完了してください。",
    },
    ko: {
      title: "대화형 챌린지",
      message: "사이트에 액세스하려면 이 CAPTCHA를 완료하세요.",
    },
    fr: {
      title: "Défi interactif",
      message: "Veuillez compléter ce CAPTCHA pour accéder au site.",
    },
    de: {
      title: "Interaktive Herausforderung",
      message:
        "Bitte vervollständigen Sie dieses CAPTCHA, um auf die Website zuzugreifen.",
    },
    es: {
      title: "Desafío interactivo",
      message: "Complete este CAPTCHA para acceder al sitio.",
    },
  },
  managed: {
    en: {
      title: "I'm Under Attack Mode™",
      message: "Complete CAPTCHA to proceed. This is a general security check.",
    },
    zh: {
      title: "攻击防护模式™",
      message: "请完成验证码以继续。这是一般安全检查。",
    },
    ja: {
      title: "攻撃下モード™",
      message:
        "続行するにはCAPTCHAを完了してください。これは一般的なセキュリティチェックです。",
    },
    ko: {
      title: "공격 받는 중 모드™",
      message:
        "계속하려면 CAPTCHA를 완료하세요. 이것은 일반적인 보안 검사입니다.",
    },
    fr: {
      title: "Mode Sous Attaque™",
      message:
        "Complétez le CAPTCHA pour continuer. Il s'agit d'une vérification de sécurité générale.",
    },
    de: {
      title: "Unter-Angriff-Modus™",
      message:
        "Vervollständigen Sie das CAPTCHA, um fortzufahren. Dies ist eine allgemeine Sicherheitsprüfung.",
    },
    es: {
      title: "Modo Bajo Ataque™",
      message:
        "Complete el CAPTCHA para continuar. Esta es una verificación de seguridad general.",
    },
  },
  country: {
    en: {
      title: "Challenge",
      message:
        "Additional verification is required for visitors from your Country/Region.",
    },
    zh: {
      title: "验证挑战",
      message: "来自您所在国家/地区的访客需要额外验证。",
    },
    ja: {
      title: "チャレンジ",
      message: "あなたの国/地域からの訪問者には追加の確認が必要です。",
    },
    ko: {
      title: "챌린지",
      message: "귀하의 국가/지역에서 오는 방문자에게는 추가 확인이 필요합니다.",
    },
    fr: {
      title: "Défi",
      message:
        "Une vérification supplémentaire est requise pour les visiteurs de votre pays/région.",
    },
    de: {
      title: "Herausforderung",
      message:
        "Für Besucher aus Ihrem Land/Ihrer Region ist eine zusätzliche Überprüfung erforderlich.",
    },
    es: {
      title: "Desafío",
      message:
        "Se requiere verificación adicional para visitantes de su país/región.",
    },
  },
  javascript: {
    en: {
      title: "Please wait...",
      message:
        "Please wait a moment while our security system verifies your request.",
    },
    zh: {
      title: "请稍候...",
      message: "请稍等片刻，我们的安全系统正在验证您的请求。",
    },
    ja: {
      title: "お待ちください...",
      message:
        "セキュリティシステムがリクエストを確認している間、しばらくお待ちください。",
    },
    ko: {
      title: "잠시 기다려주세요...",
      message: "보안 시스템이 귀하의 요청을 확인하는 동안 잠시 기다려주세요.",
    },
    fr: {
      title: "Veuillez patienter...",
      message:
        "Veuillez attendre un moment pendant que notre système de sécurité vérifie votre demande.",
    },
    de: {
      title: "Bitte warten...",
      message:
        "Bitte warten Sie einen Moment, während unser Sicherheitssystem Ihre Anfrage überprüft.",
    },
    es: {
      title: "Por favor espere...",
      message:
        "Espere un momento mientras nuestro sistema de seguridad verifica su solicitud.",
    },
  },
} as const;

// 多语言界面翻译
export const interfaceTranslations: Record<
  string,
  LocalizedTranslations<InterfaceTranslations>
> = {
  "error-details": {
    en: { message: "Learn more" },
    zh: { message: "了解更多" },
    ja: { message: "詳細を見る" },
    ko: { message: "자세히 알아보기" },
    fr: { message: "En savoir plus" },
    de: { message: "Mehr erfahren" },
    es: { message: "Saber más" },
  },
  "connection-tracking": {
    en: { message: "Connection Tracking" },
    zh: { message: "连接跟踪" },
    ja: { message: "接続追跡" },
    ko: { message: "연결 추적" },
    fr: { message: "Suivi de connexion" },
    de: { message: "Verbindungsverfolgung" },
    es: { message: "Seguimiento de conexión" },
  },
  "network-status-you": {
    en: { message: "You" },
    zh: { message: "您" },
    ja: { message: "あなた" },
    ko: { message: "당신" },
    fr: { message: "Vous" },
    de: { message: "Sie" },
    es: { message: "Usted" },
  },
  "network-status-cdn": {
    en: { message: "CDN" },
    zh: { message: "CDN" },
    ja: { message: "CDN" },
    ko: { message: "CDN" },
    fr: { message: "CDN" },
    de: { message: "CDN" },
    es: { message: "CDN" },
  },
  "network-status-origin": {
    en: { message: "Origin" },
    zh: { message: "源站" },
    ja: { message: "オリジン" },
    ko: { message: "원본" },
    fr: { message: "Origine" },
    de: { message: "Ursprung" },
    es: { message: "Origen" },
  },
} as const;

// 首页翻译类型定义
export interface HomePageTranslation {
  siteTitle: string;
  siteDescription: string;
  errorPagesTitle: string;
  errorPagesDescription: string;
  blockPagesTitle: string;
  blockPagesDescription: string;
  challengePagesTitle: string;
  challengePagesDescription: string;
  standaloneModeTitle: string;
  standaloneModeDescription: string;
  standaloneSuffix: string;
}

// 首页多语言翻译
export const homePageTranslations: LocalizedTranslations<HomePageTranslation> =
  {
    en: {
      siteTitle: "Cloudflare WAF Custom Pages",
      siteDescription:
        "A beautiful, out-of-the-box Cloudflare WAF custom page template.",
      errorPagesTitle: "Error Pages",
      errorPagesDescription: "Server error pages",
      blockPagesTitle: "Block Pages",
      blockPagesDescription: "Access denied pages",
      challengePagesTitle: "Challenge Pages",
      challengePagesDescription: "Security verification challenges",
      standaloneModeTitle: "Standalone Mode",
      standaloneModeDescription:
        "Pages optimized for Cloudflare single-page deployment",
      standaloneSuffix: "(Standalone)",
    },
    zh: {
      siteTitle: "Cloudflare WAF 自定义页面",
      siteDescription: "一个美观的、开箱即用的 Cloudflare WAF 自定义页面模板。",
      errorPagesTitle: "错误页面",
      errorPagesDescription: "服务器错误页面",
      blockPagesTitle: "阻止页面",
      blockPagesDescription: "访问被拒绝页面",
      challengePagesTitle: "挑战页面",
      challengePagesDescription: "安全验证挑战",
      standaloneModeTitle: "独立模式",
      standaloneModeDescription: "为 Cloudflare 单页部署优化的页面",
      standaloneSuffix: "(独立)",
    },
    ja: {
      siteTitle: "Cloudflare WAF カスタムページ",
      siteDescription:
        "美しく、すぐに使える Cloudflare WAF カスタムページテンプレート。",
      errorPagesTitle: "エラーページ",
      errorPagesDescription: "サーバーエラーページ",
      blockPagesTitle: "ブロックページ",
      blockPagesDescription: "アクセス拒否ページ",
      challengePagesTitle: "チャレンジページ",
      challengePagesDescription: "セキュリティ検証チャレンジ",
      standaloneModeTitle: "スタンドアロンモード",
      standaloneModeDescription:
        "Cloudflare シングルページデプロイメント用に最適化されたページ",
      standaloneSuffix: "(スタンドアロン)",
    },
    ko: {
      siteTitle: "Cloudflare WAF 커스텀 페이지",
      siteDescription:
        "아름답고 즉시 사용 가능한 Cloudflare WAF 커스텀 페이지 템플릿.",
      errorPagesTitle: "오류 페이지",
      errorPagesDescription: "서버 오류 페이지",
      blockPagesTitle: "차단 페이지",
      blockPagesDescription: "액세스 거부 페이지",
      challengePagesTitle: "챌린지 페이지",
      challengePagesDescription: "보안 검증 챌린지",
      standaloneModeTitle: "독립 모드",
      standaloneModeDescription:
        "Cloudflare 단일 페이지 배포에 최적화된 페이지",
      standaloneSuffix: "(독립)",
    },
    fr: {
      siteTitle: "Pages personnalisées Cloudflare WAF",
      siteDescription:
        "Un modèle de page personnalisée Cloudflare WAF beau et prêt à l'emploi.",
      errorPagesTitle: "Pages d'erreur",
      errorPagesDescription: "Pages d'erreur du serveur",
      blockPagesTitle: "Pages de blocage",
      blockPagesDescription: "Pages d'accès refusé",
      challengePagesTitle: "Pages de défi",
      challengePagesDescription: "Défis de vérification de sécurité",
      standaloneModeTitle: "Mode autonome",
      standaloneModeDescription:
        "Pages optimisées pour le déploiement de page unique Cloudflare",
      standaloneSuffix: "(Autonome)",
    },
    de: {
      siteTitle: "Cloudflare WAF Benutzerdefinierte Seiten",
      siteDescription:
        "Eine schöne, sofort einsatzbereite Cloudflare WAF benutzerdefinierte Seitenvorlage.",
      errorPagesTitle: "Fehlerseiten",
      errorPagesDescription: "Server-Fehlerseiten",
      blockPagesTitle: "Sperrseiten",
      blockPagesDescription: "Zugriff verweigert Seiten",
      challengePagesTitle: "Challenge-Seiten",
      challengePagesDescription: "Sicherheitsüberprüfungs-Challenges",
      standaloneModeTitle: "Eigenständiger Modus",
      standaloneModeDescription:
        "Für Cloudflare Single-Page-Deployment optimierte Seiten",
      standaloneSuffix: "(Eigenständig)",
    },
    es: {
      siteTitle: "Páginas personalizadas de Cloudflare WAF",
      siteDescription:
        "Una plantilla de página personalizada de Cloudflare WAF hermosa y lista para usar.",
      errorPagesTitle: "Páginas de error",
      errorPagesDescription: "Páginas de error del servidor",
      blockPagesTitle: "Páginas de bloqueo",
      blockPagesDescription: "Páginas de acceso denegado",
      challengePagesTitle: "Páginas de desafío",
      challengePagesDescription: "Desafíos de verificación de seguridad",
      standaloneModeTitle: "Modo independiente",
      standaloneModeDescription:
        "Páginas optimizadas para implementación de página única de Cloudflare",
      standaloneSuffix: "(Independiente)",
    },
  } as const;

// 工具函数：获取指定语言的翻译
/**
 * 获取指定语言和类型的页面翻译
 * @param type - 页面类型
 * @param locale - 语言代码
 * @param translations - 翻译对象
 * @returns 对应语言的翻译内容
 */
export function getPageTranslation<T>(
  type: string,
  locale: SupportedLocale,
  translations: Record<string, LocalizedTranslations<T>>,
): T {
  const translation = translations[type];
  if (!translation) {
    throw new Error(`Translation not found for type: ${type}`);
  }

  return translation[locale] || translation.en;
}

/**
 * 获取指定语言的界面翻译
 * @param key - 翻译键
 * @param locale - 语言代码
 * @returns 对应语言的翻译内容
 */
export function getInterfaceTranslation(
  key: string,
  locale: SupportedLocale,
): InterfaceTranslations {
  return getPageTranslation(key, locale, interfaceTranslations);
}

/**
 * 获取指定语言的Block页面翻译
 * @param type - Block页面类型
 * @param locale - 语言代码
 * @returns 对应语言的翻译内容
 */
export function getBlockPageTranslation(
  type: string,
  locale: SupportedLocale,
): BlockPageTranslation {
  return getPageTranslation(type, locale, blockPageTranslations);
}

/**
 * 获取指定语言的错误页面翻译
 * @param type - 错误页面类型
 * @param locale - 语言代码
 * @returns 对应语言的翻译内容
 */
export function getErrorPageTranslation(
  type: string,
  locale: SupportedLocale,
): ErrorPageTranslation {
  return getPageTranslation(type, locale, errorPageTranslations);
}

/**
 * 获取指定语言的挑战页面翻译
 * @param type - 挑战页面类型
 * @param locale - 语言代码
 * @returns 对应语言的翻译内容
 */
export function getChallengePageTranslation(
  type: string,
  locale: SupportedLocale,
): ChallengePageTranslation {
  return getPageTranslation(type, locale, challengePageTranslations);
}

/**
 * 获取指定语言的首页翻译
 * @param locale - 语言代码
 * @returns 对应语言的翻译内容
 */
export function getHomePageTranslation(
  locale: SupportedLocale,
): HomePageTranslation {
  return homePageTranslations[locale] || homePageTranslations.en;
}

// 浏览器语言到支持语言的映射表
const languageMapping: Record<string, SupportedLocale> = {
  // 英语系列
  en: "en",
  "en-US": "en",
  "en-GB": "en",
  "en-CA": "en",
  "en-AU": "en",

  // 中文系列
  zh: "zh",
  "zh-CN": "zh",
  "zh-TW": "zh", // 繁体中文映射到简体中文
  "zh-HK": "zh", // 香港中文映射到简体中文
  "zh-SG": "zh", // 新加坡中文映射到简体中文

  // 日语系列
  ja: "ja",
  "ja-JP": "ja",

  // 韩语系列
  ko: "ko",
  "ko-KR": "ko",

  // 法语系列
  fr: "fr",
  "fr-FR": "fr",
  "fr-CA": "fr",
  "fr-BE": "fr",
  "fr-CH": "fr",

  // 德语系列
  de: "de",
  "de-DE": "de",
  "de-AT": "de",
  "de-CH": "de",

  // 西班牙语系列
  es: "es",
  "es-ES": "es",
  "es-MX": "es",
  "es-AR": "es",
  "es-CO": "es",
  "es-CL": "es",
  "es-PE": "es",
  "es-VE": "es",

  // 其他语言映射到最相近的支持语言
  pt: "es", // 葡萄牙语映射到西班牙语
  "pt-BR": "es", // 巴西葡萄牙语映射到西班牙语
  "pt-PT": "es", // 葡萄牙葡萄牙语映射到西班牙语
  it: "en", // 意大利语映射到英语
  "it-IT": "en",
  ru: "en", // 俄语映射到英语
  "ru-RU": "en",
  ar: "en", // 阿拉伯语映射到英语
  hi: "en", // 印地语映射到英语
  th: "en", // 泰语映射到英语
  vi: "en", // 越南语映射到英语
  id: "en", // 印尼语映射到英语
  ms: "en", // 马来语映射到英语
  tr: "en", // 土耳其语映射到英语
  pl: "en", // 波兰语映射到英语
  nl: "en", // 荷兰语映射到英语
  sv: "en", // 瑞典语映射到英语
  da: "en", // 丹麦语映射到英语
  no: "en", // 挪威语映射到英语
  fi: "en", // 芬兰语映射到英语
  he: "en", // 希伯来语映射到英语
  cs: "en", // 捷克语映射到英语
  sk: "en", // 斯洛伐克语映射到英语
  hu: "en", // 匈牙利语映射到英语
  ro: "en", // 罗马尼亚语映射到英语
  bg: "en", // 保加利亚语映射到英语
  hr: "en", // 克罗地亚语映射到英语
  sr: "en", // 塞尔维亚语映射到英语
  sl: "en", // 斯洛文尼亚语映射到英语
  et: "en", // 爱沙尼亚语映射到英语
  lv: "en", // 拉脱维亚语映射到英语
  lt: "en", // 立陶宛语映射到英语
  uk: "en", // 乌克兰语映射到英语
  be: "en", // 白俄罗斯语映射到英语
  mk: "en", // 马其顿语映射到英语
  sq: "en", // 阿尔巴尼亚语映射到英语
  mt: "en", // 马耳他语映射到英语
  is: "en", // 冰岛语映射到英语
  ga: "en", // 爱尔兰语映射到英语
  cy: "en", // 威尔士语映射到英语
  eu: "es", // 巴斯克语映射到西班牙语
  ca: "es", // 加泰罗尼亚语映射到西班牙语
  gl: "es", // 加利西亚语映射到西班牙语
} as const;

/**
 * 根据浏览器语言自动检测最合适的支持语言
 * @param browserLanguages - 浏览器语言列表（按优先级排序）
 * @returns 匹配的支持语言代码
 */
export function detectBestLanguage(
  browserLanguages: readonly string[],
): SupportedLocale {
  // 遍历浏览器语言列表，按优先级查找匹配
  for (const browserLang of browserLanguages) {
    const normalizedLang = browserLang.toLowerCase();

    // 精确匹配
    if (languageMapping[normalizedLang]) {
      return languageMapping[normalizedLang];
    }

    // 尝试匹配语言代码的前缀（如 'zh-Hans-CN' -> 'zh'）
    const langPrefix = normalizedLang.split("-")[0];
    if (languageMapping[langPrefix]) {
      return languageMapping[langPrefix];
    }
  }

  // 如果没有匹配到任何语言，返回默认语言
  return "en";
}

/**
 * 获取客户端浏览器语言偏好
 * @returns 浏览器语言列表
 */
export function getBrowserLanguages(): readonly string[] {
  if (typeof window === "undefined") {
    // 服务端渲染时返回空数组
    return [];
  }

  const languages: string[] = [];

  // 获取 navigator.languages（现代浏览器支持）
  if (navigator.languages && navigator.languages.length > 0) {
    languages.push(...navigator.languages);
  }

  // 获取 navigator.language（所有浏览器支持）
  if (navigator.language) {
    languages.push(navigator.language);
  }

  // 获取 navigator.userLanguage（IE支持）
  const navigatorWithUserLanguage = navigator as Navigator & {
    userLanguage?: string;
  };
  if (navigatorWithUserLanguage.userLanguage) {
    languages.push(navigatorWithUserLanguage.userLanguage);
  }

  // 去重并返回
  return [...new Set(languages)];
}

/**
 * 自动检测并返回最佳语言
 * @returns 检测到的最佳语言代码
 */
export function autoDetectLanguage(): SupportedLocale {
  const browserLanguages = getBrowserLanguages();
  return detectBestLanguage(browserLanguages);
}
