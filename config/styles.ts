export type NetworkStatus = "success" | "error" | "challenging";

export const networkStatusStyles = {
  success: {
    base: {
      bg: "bg-green-50/80 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-300",
      ring: "ring-1 ring-green-100 dark:ring-green-900/30",
      icon: "text-green-500 dark:text-green-400",
    },
    line: {
      base: "bg-green-100/50 dark:bg-green-900/30",
      animation: "animate-[flow_3s_cubic-bezier(0.4,0,0.6,1)_infinite]",
      gradient: "bg-gradient-to-r from-transparent via-green-500/60 to-transparent dark:via-green-400/80",
    }
  },
  error: {
    base: {
      bg: "bg-red-50/80 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-300",
      ring: "ring-1 ring-red-100 dark:ring-red-900/30",
      icon: "text-red-500 dark:text-red-400",
    },
    line: {
      base: "bg-red-100/50 dark:bg-red-900/30",
      animation: "animate-[flow_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]",
      gradient: "bg-gradient-to-r from-transparent via-red-500/60 to-transparent dark:via-red-400/80",
    }
  },
  challenging: {
    base: {
      bg: "bg-orange-50/80 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-300",
      ring: "ring-1 ring-orange-100 dark:ring-orange-900/30",
      icon: "text-orange-500 dark:text-orange-400",
    },
    line: {
      base: "bg-orange-100/50 dark:bg-orange-900/30",
      animation: "animate-[network-loading_2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
      gradient: "bg-gradient-to-r from-transparent via-orange-500/60 to-transparent dark:via-orange-400/80",
    }
  },
} as const; 