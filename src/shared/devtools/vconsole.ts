'use client';

import { useEffect } from 'react';
import VConsole from 'vconsole';

export function useVConsole() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // предотвращаем дублирование при hot reload
      if (!(window as any).__VCONSOLE__) {
        (window as any).__VCONSOLE__ = new VConsole();
        console.log('✅ vConsole подключён');
      }
    }
  }, []);
}
