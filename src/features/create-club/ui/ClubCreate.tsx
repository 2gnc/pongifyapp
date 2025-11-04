'use client'

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@gravity-ui/uikit';

import { ClubCreateForm } from './ClubCreateForm';

type Props = {}

export const ClubCreate: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');

    return (
        <>
            <Text color="primary" variant="header-2">{t('club-create.title')}</Text>
            <Text className="block mt-4" color="secondary" variant="caption-2">{t('club-create.descriptionText')}</Text>
            <ClubCreateForm />
        </>
    )
}
