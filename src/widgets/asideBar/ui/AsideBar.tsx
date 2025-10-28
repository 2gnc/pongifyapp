'use client';

import { useMemo, useState, type FC, type PropsWithChildren } from 'react';
import {ListUl} from '@gravity-ui/icons';
import {AsideHeader, type MenuItem} from '@gravity-ui/navigation';
import {CrownDiamond} from '@gravity-ui/icons';
import { mapUrlToPage } from '../../../features/navigation/lib/map-url-to-page';
import Icon from './img/icon.svg'
import { PageEnum } from '../../../features/navigation/model/page-enum';
import { useCurrentUser } from '@/features/auth';

type Props = {
    url: string | null;
}

export const AsideBar: FC<PropsWithChildren<Props>> = ({ url, children }) => {
    const page = mapUrlToPage(url);
    const [compact, setCompact] = useState(true);
    const user = useCurrentUser();

    const subheaderItems = useMemo(() => {
        const basic = [];

        if (page !== PageEnum.CLUB_LIST) {
            basic.push({
                item: {
                    id: 'clubs',
                    icon: ListUl,
                    title: 'Все клубы',
                    link: '/clubs',
                },
            })
        }
        
        if (user?.ownedClub) {
         basic.push({
                item: {
                    id: 'club',
                    icon: CrownDiamond,
                    title: `Мой клуб: ${user.ownedClub.clubName}`,
                    link: `/clubs/${user.ownedClub.clubId}`,
                },
            });
        }
        
        
        return basic;
    }, [user?.ownedClub, page]);

    const menuItems = useMemo<MenuItem[]>(() => {
        const basic = [];

        if (page !== PageEnum.CLUB_LIST) {
            basic.push({
                id: 'clubs',
                icon: ListUl,
                title: 'Все клубы',
                link: '/clubs',
            });
        }

        if (user?.ownedClub) {
         basic.push({
                id: 'club',
                icon: CrownDiamond,
                title: `Мой клуб: ${user.ownedClub.clubName}`,
                link: `/clubs/${user.ownedClub.clubId}`,
            });
        }

        return basic;
    }, [user?.ownedClub, page]);
    
    return (
        <AsideHeader
            compact={compact}
            onChangeCompact={setCompact}
            logo={{
                iconSrc: Icon.src,
                iconSize: 30,
                text: 'Pongify community',
                href: '#',
            }}
            renderContent={() => children}
            subheaderItems={subheaderItems}
            menuItems={menuItems}
        />
    )
}
