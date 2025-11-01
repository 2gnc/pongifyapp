'use client'

import { type FC, useState, useCallback } from 'react';
import { NavButton } from './NavButton';
import { Sheet, List, Divider } from '@gravity-ui/uikit';
import {CrownDiamond} from '@gravity-ui/icons';
import { mapUrlToPage } from '../lib/map-url-to-page';
import { useCurrentUser } from '@/features/auth';
import Link from 'next/link';

type Props = {
    url: string | null;
}

export const Navigation: FC<Props> = ({ url }) => {
    const [visible, setVisible] = useState(false);
    const user = useCurrentUser();

    const page = mapUrlToPage(url);

    const handleCloseSheet = useCallback(() => {
        setVisible(false);
    }, []);

    const handleOpenSheet = useCallback(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <NavButton onClick={handleOpenSheet} />
            <Sheet visible={visible} onClose={handleCloseSheet}>
                <Divider align='center'>
                    <CrownDiamond className='mr-2'/>
                    Управление клубом
                </Divider>
                Создать событие
                Управление участниками
                Инвайты
                <Divider align='center'>
                    Мои клубы
                </Divider>
                <Link href={`/clubs`}>Все клубы ()</Link>
                <Link href={`/events`}>Ближайшие события</Link>
            </Sheet>
        </>
    );
}
