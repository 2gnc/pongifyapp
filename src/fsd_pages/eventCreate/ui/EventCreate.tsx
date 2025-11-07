'use client'

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@gravity-ui/uikit';
import { PageLayout } from '@/shared/ui';

import { EventCreateForm } from '@/features/create-event';

type Props = {}

export const EventCreatePage: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');

    return (
        <PageLayout title={t('event-create.title')}>
            <EventCreateForm />
        </PageLayout>
    )
}
