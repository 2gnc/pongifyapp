'use client';

import { useEffect } from 'react';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';

export function InitDataProvider() {
const initDataRaw = useSignal(_initDataRaw);

  useEffect(() => {
    if (!initDataRaw) return;

    const encoded = encodeURIComponent(initDataRaw);
    const url = `/?initData=${encoded}`;
    if (window.location.href !== url) {
      window.location.replace(url);
    }
  }, [initDataRaw]);

  return null;
}
