"use client";

import { Icon } from "@/components/ui/icon";
import { type SwitchProps, useSwitch } from "@heroui/switch";
import { useIsSSR } from "@react-aria/ssr";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { clsx as cx } from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";

/**
 * 主题切换组件的属性接口
 */
export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

/**
 * 主题切换组件
 * 支持系统偏好自动检测，提供亮色/暗色模式切换功能
 * 在检测失败时自动回退到亮色模式
 */
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const isSSR = useIsSSR();
  const [mounted, setMounted] = useState(false);
  const [hasSystemSupport, setHasSystemSupport] = useState(true);

  /**
   * 检测系统是否支持偏好设置查询
   * 如果不支持则回退到亮色模式
   */
  const detectSystemSupport = useCallback(() => {
    try {
      if (typeof window !== "undefined" && window.matchMedia) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        return mediaQuery.media !== "not all";
      }
      return false;
    } catch (error) {
      console.warn("系统主题检测失败，回退到亮色模式:", error);
      return false;
    }
  }, []);

  /**
   * 初始化主题设置
   */
  useEffect(() => {
    const systemSupport = detectSystemSupport();
    setHasSystemSupport(systemSupport);

    // 如果系统不支持偏好设置或检测失败，回退到亮色模式
    if (!systemSupport && theme === "system") {
      setTheme("light");
    }

    setMounted(true);
  }, [theme, setTheme, detectSystemSupport]);

  /**
   * 监听系统主题变化
   */
  useEffect(() => {
    if (!hasSystemSupport || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      try {
        // 只有在使用系统主题时才自动切换
        if (theme === "system") {
          // 触发重新渲染以应用新的系统主题
          setTheme("system");
        }
      } catch (error) {
        console.warn("主题切换失败，回退到亮色模式:", error);
        setTheme("light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, setTheme, hasSystemSupport]);

  // 获取当前实际显示的主题
  const currentTheme = resolvedTheme || "light";

  /**
   * 处理主题切换
   * 在亮色和暗色模式之间切换，保持系统自动检测功能
   */
  const onChange = () => {
    try {
      // 简化为亮色和暗色两种模式的切换
      if (currentTheme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } catch (error) {
      console.warn("主题切换失败，回退到亮色模式:", error);
      setTheme("light");
    }
  };

  /**
   * 获取切换按钮的标签文本
   */
  const getAriaLabel = () => {
    if (theme === "system") {
      return `当前为系统模式 (${currentTheme === "dark" ? "暗色" : "亮色"}), 点击切换到${currentTheme === "dark" ? "亮色" : "暗色"}模式`;
    }
    return `切换到${currentTheme === "light" ? "暗色" : "亮色"}模式`;
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: currentTheme === "light" || isSSR,
    "aria-label": getAriaLabel(),
    onChange,
  });

  /**
   * 防止水合不匹配
   * 在服务端渲染或组件未挂载时返回null
   */
  if (!mounted || isSSR) {
    return null;
  }

  return (
    <Component
      {...getBaseProps({
        className: cx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: cx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        <motion.div
          key={`${theme}-${currentTheme}`}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTheme === "light" ? (
            <div
              className="relative"
              title={theme === "system" ? "系统模式 (亮色)" : "亮色模式"}
            >
              <Icon name="sun" className="h-6 w-6" />
              <div className="absolute inset-0 flex items-center justify-center bg-default-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {theme === "system" ? "🔄" : "☀️"}
              </div>
            </div>
          ) : (
            <div
              className="relative"
              title={theme === "system" ? "系统模式 (暗色)" : "暗色模式"}
            >
              <Icon name="moon" className="h-6 w-6" />
              <div className="absolute inset-0 flex items-center justify-center bg-default-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {theme === "system" ? "🔄" : "🌙"}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Component>
  );
};
