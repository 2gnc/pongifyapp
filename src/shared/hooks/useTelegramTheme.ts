import { useEffect, useState } from 'react';
import { miniApp, useSignal } from '@telegram-apps/sdk-react';
import type { Theme } from '@gravity-ui/uikit';

/**
 * Hook to get Telegram theme and convert it to Gravity UI theme
 * @returns Gravity UI theme ('light' | 'dark')
 */
export function useTelegramTheme(): Theme {
  // Get dark mode signal from Telegram
  const isDark = useSignal(miniApp.isDark);
  
  // State for Gravity UI theme
  const [theme, setTheme] = useState<Theme>('light');

  // Update theme when Telegram theme changes
  useEffect(() => {
    if (isDark !== undefined) {
      setTheme(isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  return theme;
}
