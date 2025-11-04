'use client'

import { type FC, useCallback } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Text } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';

type Props = {
    title: string;
    link?: string;
    onClose?: () => void;
}

export const NavItem:FC<Props> = ({ title, link, onClose }) => {
    const t = useTranslations('i18n');
    const router = useRouter();
    
    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose?.();
        
        // Немного задержим навигацию, чтобы шторка успела закрыться
        setTimeout(() => {
            if (link) {
                router.push(link);
            }
        }, 100);
    }, [onClose, link, router]);
    
    if (!link) {
        return (
            <>
                <Text variant='body-3' className=''>{title}</Text>
                <Text variant='body-1' className='pl-2'>{`(${t('navigation.soon')})`}</Text>
            </>
        )

    }
    return (
        <Link href={link} className='w-full block pb-2 pt-2' prefetch onClick={handleClick}>
            <Text variant='body-3' className=''>{title}</Text>
        </Link>
    )
}
