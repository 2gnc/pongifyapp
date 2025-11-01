'use client'

import { type FC } from 'react';
import { Text, Link } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';

type Props = {
    title: string;
    link?: string;
}

export const NavItem:FC<Props> = ({ title, link }) => {
    const t = useTranslations('i18n');
    
    if (!link) {
        return (
            <>
                <Text variant='body-3' className=''>{title}</Text>
                <Text variant='body-1' className='pl-2'>{`(${t('navigation.soon')})`}</Text>
            </>
        )

    }
    return (
        <Link href={link} className='w-full block pb-2 pt-2'>
            <Text variant='body-3' className=''>{title}</Text>
        </Link>
    )
}
