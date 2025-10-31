'use client';

import React, { type PropsWithChildren, useMemo } from 'react';
import { ThemeProvider, type Theme } from '@gravity-ui/uikit';
import { miniApp, useSignal } from '@telegram-apps/sdk-react';

interface TelegramThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
}

/**
 * ThemeProvider that syncs with Telegram theme
 */
export function TelegramThemeProvider({ 
  children, 
  defaultTheme = 'light' 
}: TelegramThemeProviderProps) {
  // Get dark mode signal from Telegram
  const isDark = useSignal(miniApp.isDark);
  
  // Convert Telegram theme to Gravity UI theme
  const theme: Theme = useMemo(() => {
    if (isDark === undefined) return defaultTheme;
    return isDark ? 'dark' : 'light';
  }, [isDark, defaultTheme]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
