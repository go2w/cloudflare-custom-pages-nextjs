import { Icon } from "@/components/ui/icon";
import { Switch } from "@heroui/switch";
import { clsx as cx } from "clsx";
import { useEffect, useState } from "react";

interface StandaloneModeSwitchProps {
  className?: string;
  onModeChange?: (isStandalone: boolean) => void;
}

/**
 * 独立模式切换开关组件
 * @param className - 自定义样式类名
 * @param onModeChange - 模式切换回调函数
 * @returns 独立模式切换开关组件
 */
export function StandaloneModeSwitch({
  className,
  onModeChange,
}: StandaloneModeSwitchProps) {
  const [isStandalone, setIsStandalone] = useState(false);

  /**
   * 处理模式切换
   * @param selected - 是否选中独立模式
   */
  const handleModeChange = (selected: boolean) => {
    setIsStandalone(selected);
    onModeChange?.(selected);

    // 保存到localStorage
    localStorage.setItem("standalone-mode", selected.toString());
  };

  // 从localStorage恢复状态
  useEffect(() => {
    const savedMode = localStorage.getItem("standalone-mode");
    if (savedMode) {
      const isStandaloneMode = savedMode === "true";
      setIsStandalone(isStandaloneMode);
      onModeChange?.(isStandaloneMode);
    }
  }, [onModeChange]);

  return (
    <div
      className={cx(
        "flex items-center justify-center gap-3 p-4 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          name="layers"
          className="h-5 w-5 text-blue-600 dark:text-blue-400"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          独立模式
        </span>
      </div>

      <Switch
        isSelected={isStandalone}
        onValueChange={handleModeChange}
        size="sm"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <Icon name="check" className={className} />
          ) : (
            <Icon name="x" className={className} />
          )
        }
      >
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {isStandalone ? "已启用" : "已禁用"}
        </span>
      </Switch>
    </div>
  );
}
