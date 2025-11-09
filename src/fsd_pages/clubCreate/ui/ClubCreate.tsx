'use client'

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@gravity-ui/uikit';
import { PageLayout } from '@/shared/ui';

import { ClubCreateForm } from '@/features/create-club';

export const ClubCreate: FC = () => {
    const t = useTranslations('i18n');

    return (
        <PageLayout title={t('club-create.title')}>
            <Text className="block mt-4" color="secondary" variant="caption-2">{t('club-create.descriptionText')}</Text>
            <ClubCreateForm />
        </PageLayout>
    )
}
