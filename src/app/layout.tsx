import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';
import { AsideBar } from '@/widgets/asideBar';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/shared/i18n/provider';
import { getUserWithOwnedClub } from '@/entities/user';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const user = await getUserWithOwnedClub();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Root>
            {user && <AsideBar user={user} />}
            {children}
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
