/**
 * Utility functions for working with Telegram and Gravity UI themes
 */

/**
 * Gets the current theme from Telegram and converts it to Gravity UI format
 * @param isDark - Whether Telegram is in dark mode
 * @returns Gravity UI theme
 */
export function telegramToGravityTheme(isDark: boolean | undefined): 'light' | 'dark' | undefined {
  if (isDark === undefined) return undefined;
  return isDark ? 'dark' : 'light';
}

/**
 * Applies Telegram theme CSS variables to the document
 * @param themeParams - Telegram theme parameters
 */
export function applyTelegramThemeVars(themeParams: Record<string, string>): void {
  const root = document.documentElement;
  
  Object.entries(themeParams).forEach(([key, value]) => {
    if (value) {
      root.style.setProperty(key, value);
    }
  });
}

/**
 * Gets CSS variable value from document
 * @param variableName - CSS variable name
 * @returns Variable value or empty string
 */
export function getCSSVariable(variableName: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}
