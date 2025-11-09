'use client'

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { PageLayout } from '@/shared/ui';

import { EventCreateForm } from '@/features/create-event';
import { useNavigate } from '@/features/navigation';

export const EventCreatePage: FC = ({ }) => {
    const t = useTranslations('i18n');
    
    const { goBack } = useNavigate();

    return (
        <PageLayout title={t('event-create.title')} onBack={goBack}>
            <EventCreateForm />
        </PageLayout>
    )
}
