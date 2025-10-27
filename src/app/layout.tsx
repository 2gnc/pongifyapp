import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { AsideBar } from '@/features/navigation';
import { ClientDevTools } from '@/shared/devtools';
import { PageWrapper } from '@/shared/ui';
import { Toaster } from 'react-hot-toast';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/shared/i18n/provider';
import { getUserFromCookies } from '@/entities/user';

import 'normalize.css/normalize.css';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './_assets/globals.css';

import {Theme, ThemeProvider} from '@gravity-ui/uikit';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const currentUser = await getUserFromCookies();
  const headersList = headers();
  const url = (await headersList).get('referer');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Root>
            <ThemeProvider theme={"light"}>
              <ClientDevTools />
              {currentUser && <AsideBar user={currentUser} url={url}>
                  <PageWrapper>{children}</PageWrapper>
                </AsideBar>}
              {!currentUser && <PageWrapper>{children}</PageWrapper>}
              <Toaster />
            </ThemeProvider>
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
