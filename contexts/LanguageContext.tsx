"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { autoDetectLanguage, type SupportedLocale } from '@/config/i18n';

/**
 * 语言上下文接口
 */
interface LanguageContextType {
  /** 当前语言 */
  currentLanguage: SupportedLocale;
  /** 是否为自动模式 */
  isAutoMode: boolean;
  /** 检测到的浏览器语言 */
  detectedLanguage: SupportedLocale;
  /** 切换语言函数 */
  switchLanguage: (locale: SupportedLocale | 'auto') => void;
  /** 设置自动模式 */
  setAutoMode: (enabled: boolean) => void;
}

/**
 * 语言上下文
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * 语言上下文提供者属性接口
 */
interface LanguageProviderProps {
  children: ReactNode;
  /** 初始语言（来自路由或默认值） */
  initialLanguage?: SupportedLocale;
}

/**
 * 语言上下文提供者组件
 * 管理应用的语言状态，支持自动检测和手动切换
 */
export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLocale>(initialLanguage);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLocale>('en');

  /**
   * 初始化语言设置
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detected = autoDetectLanguage();
      setDetectedLanguage(detected);
      
      // 检查本地存储的语言模式设置
      const storedMode = localStorage.getItem('language-mode');
      const storedLanguage = localStorage.getItem('selected-language') as SupportedLocale;
      
      // 如果是首次访问（没有存储的语言模式），默认启用auto模式
      if (!storedMode) {
        setIsAutoMode(true);
        setCurrentLanguage(detected);
        localStorage.setItem('language-mode', 'auto');
        localStorage.setItem('selected-language', detected);
      } else {
        // 使用存储的语言模式设置
        const isAuto = storedMode === 'auto';
        setIsAutoMode(isAuto);
        
        if (isAuto) {
          // 自动模式：使用检测到的语言
          setCurrentLanguage(detected);
          localStorage.setItem('selected-language', detected);
        } else {
          // 手动模式：使用存储的语言
          setCurrentLanguage(storedLanguage || initialLanguage);
        }
      }
    }
  }, [initialLanguage]);

  /**
   * 切换语言函数
   * @param locale - 目标语言代码或'auto'
   */
  const switchLanguage = (locale: SupportedLocale | 'auto') => {
    if (locale === 'auto') {
      // 启用自动模式
      setIsAutoMode(true);
      setCurrentLanguage(detectedLanguage);
      localStorage.setItem('language-mode', 'auto');
      localStorage.setItem('selected-language', detectedLanguage);
    } else {
      // 禁用自动模式，切换到指定语言
      setIsAutoMode(false);
      setCurrentLanguage(locale);
      localStorage.setItem('language-mode', 'manual');
      localStorage.setItem('selected-language', locale);
    }
  };

  /**
   * 设置自动模式
   * @param enabled - 是否启用自动模式
   */
  const setAutoMode = (enabled: boolean) => {
    setIsAutoMode(enabled);
    if (enabled) {
      setCurrentLanguage(detectedLanguage);
      localStorage.setItem('language-mode', 'auto');
      localStorage.setItem('selected-language', detectedLanguage);
    } else {
      localStorage.setItem('language-mode', 'manual');
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    isAutoMode,
    detectedLanguage,
    switchLanguage,
    setAutoMode,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 使用语言上下文的Hook
 * @returns 语言上下文对象
 * @throws 如果在LanguageProvider外部使用则抛出错误
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageProvider;