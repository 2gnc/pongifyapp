import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { AsideBar } from '@/features/navigation';
import { ClientDevTools } from '@/shared/devtools';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/shared/i18n/provider';
import { getUserWithOwnedClub } from '@/entities/user';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
// import '@/shared/css/';
import {Theme, ThemeProvider} from '@gravity-ui/uikit';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const cookie = await cookies();
  const userCookie = cookie.get('user')?.value
  const userData = userCookie ? JSON.parse(userCookie) : null;
  const headersList = headers();

  const user = userData ? await getUserWithOwnedClub(userData.telegramId) : null;
  const url = (await headersList).get('referer');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Root>
            <ThemeProvider theme={"light"}>
              <ClientDevTools />
              {user && <AsideBar user={userData} url={url} />}
              {children}
            </ThemeProvider>
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
