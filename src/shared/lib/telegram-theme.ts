import type { Theme } from '@gravity-ui/uikit';

/**
 * Converts Telegram theme to Gravity UI theme
 * @param isDark - Whether Telegram is in dark mode
 * @returns Gravity UI theme
 */
export function getGravityTheme(isDark: boolean): Theme {
  return isDark ? 'dark' : 'light';
}

/**
 * Gets CSS variables for Telegram theme
 * @returns Record of CSS variables
 */
export function getTelegramThemeCSS(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const styles = window.getComputedStyle(document.documentElement);
  const telegramVars = [
    '--tg-theme-bg-color',
    '--tg-theme-text-color',
    '--tg-theme-hint-color',
    '--tg-theme-link-color',
    '--tg-theme-button-color',
    '--tg-theme-button-text-color',
  ];
  
  const cssVars: Record<string, string> = {};
  telegramVars.forEach(varName => {
    const value = styles.getPropertyValue(varName);
    if (value) {
      cssVars[varName] = value;
    }
  });
  
  return cssVars;
}
