import React from "react";
import { DynamicIcon, IconName, iconNames } from "lucide-react/dynamic";
import { File } from "lucide-react";
import { cn } from "./utils";

interface IconComponentProps {
  className?: string;
  style?: React.CSSProperties;
  iconColor?: string;
  size?: string | number;
}

interface GetIconComponentOptions {
  iconName?: string;
  iconColor?: string;
  defaultClassName?: string;
  defaultSize?: string | number;
}

/**
 * Creates a dynamic icon component based on the provided icon name with enhanced styling options
 * @param options - Configuration options for the icon component
 * @returns A React component that renders the specified icon
 */
export function getIconComponent(options: GetIconComponentOptions = {}): React.ComponentType<IconComponentProps> {
  const { iconName, iconColor, defaultClassName = "h-4 w-4", defaultSize } = options;

  return function DynamicIconComponent({
    className,
    style,
    iconColor: propIconColor,
    size: propSize
  }: IconComponentProps) {
    const trimmedIconName = iconName?.trim() as IconName | undefined;
    const finalIconColor = propIconColor || iconColor;
    const finalSize = propSize || defaultSize;

    // Combine default and custom className
    const combinedClassName = cn(defaultClassName, className);

    // Combine default and custom styles
    const combinedStyle = {
      ...(finalIconColor && { color: finalIconColor }),
      ...(finalSize && {
        width: typeof finalSize === 'number' ? `${finalSize}px` : finalSize,
        height: typeof finalSize === 'number' ? `${finalSize}px` : finalSize
      }),
      ...style
    };

    if (trimmedIconName && (iconNames as readonly string[]).includes(trimmedIconName)) {
      return React.createElement(DynamicIcon, {
        name: trimmedIconName,
        className: combinedClassName,
        style: combinedStyle
      });
    }

    // Fallback to File icon if icon name is not found
    return React.createElement(File, {
      className: combinedClassName,
      style: combinedStyle
    });
  };
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getIconComponent with options instead
 */
export function getIconComponentLegacy(iconName?: string): React.ComponentType<IconComponentProps> {
  return getIconComponent({ iconName });
}
