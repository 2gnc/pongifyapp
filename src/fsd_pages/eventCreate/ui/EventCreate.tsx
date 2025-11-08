'use client'

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@gravity-ui/uikit';
import { PageLayout } from '@/shared/ui';

import { EventCreateForm } from '@/features/create-event';
import { useNavigate } from '@/features/navigation';

type Props = {}

export const EventCreatePage: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');
    const { goBack } = useNavigate();

    return (
        <PageLayout title={t('event-create.title')} onBack={goBack}>
            <EventCreateForm />
        </PageLayout>
    )
}
