import {
  ArrowRight,
  BadgeAlert,
  BookOpen,
  Construction,
  FileQuestion,
  Github,
  Heart,
  Info,
  Loader,
  Lock,
  // 1. 在这里引入图标，注意是 `Copy Component Name` 按钮复制的名称
  type LucideIcon,
  Moon,
  Shield,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  Sun,
  TriangleAlert,
} from "lucide-react";

// 2. 在这里添加你想要的图标到类型列表中
export type IconKey =
  | "shield-ban"
  | "shield"
  | "loader"
  | "badge-alert"
  | "construction"
  | "shield-check"
  | "shield-alert"
  | "shield-ellipsis"
  | "file-question"
  | "sun"
  | "moon"
  | "triangle-alert"
  | "lock"
  | "info"
  | "book-open"
  | "github"
  | "heart"
  | "arrow-right";

// 3. 在这里添加你想要的图标到 `icons` 映射字典中
export const icons: Record<IconKey, LucideIcon> = {
  "shield-ban": ShieldBan,
  shield: Shield,
  loader: Loader,
  "badge-alert": BadgeAlert,
  construction: Construction,
  "shield-check": ShieldCheck,
  "shield-alert": ShieldAlert,
  "shield-ellipsis": ShieldEllipsis,
  "file-question": FileQuestion,
  sun: Sun,
  moon: Moon,
  "triangle-alert": TriangleAlert,
  lock: Lock,
  info: Info,
  "book-open": BookOpen,
  github: Github,
  heart: Heart,
  "arrow-right": ArrowRight,
};
