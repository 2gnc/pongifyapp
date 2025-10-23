'use client'

import { use, type FC } from 'react';
import { FormRow } from '@gravity-ui/components';
import { TextInput, TextArea, Switch } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';

type Props = {}

export const ClubCreateForm: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');

    return (
        <form className='mt-8'>
            <FormRow label={t('club-create.name')} direction="column" required >
                <TextInput name='name' />
            </FormRow>
            <FormRow label={t('club-create.description')} direction="column" required>
                <TextArea name='description' />
            </FormRow>
            <FormRow label={t('club-create.isClosed')} required>
                <Switch size='l' name='isClosed' />
            </FormRow>

        </form>
    )
}
