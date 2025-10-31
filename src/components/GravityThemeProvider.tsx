'use client';

import { type PropsWithChildren, useMemo } from 'react';
import { ThemeProvider, type Theme } from '@gravity-ui/uikit';
import { useTelegramTheme } from '@/shared/hooks/useTelegramTheme';

/**
 * Провайдер темы Gravity UI, который синхронизирует тему с Telegram
 */
export function GravityThemeProvider({ children }: PropsWithChildren) {
  // Получаем текущую тему от Telegram
  const telegramTheme = useTelegramTheme();
  
  // Преобразуем тему Telegram в формат Gravity UI
  const gravityTheme: Theme = useMemo(() => {
    return telegramTheme === 'dark' ? 'dark' : 'light';
  }, [telegramTheme]);

  return (
    <ThemeProvider theme={gravityTheme}>
      {children}
    </ThemeProvider>
  );
}
