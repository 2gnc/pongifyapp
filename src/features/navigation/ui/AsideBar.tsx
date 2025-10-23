'use client';

import { UserFront } from '@/entities/user';
import { useEffect, useMemo, useState, type FC, type PropsWithChildren } from 'react';
import {ListUl} from '@gravity-ui/icons';
import {AsideHeader, type MenuItem} from '@gravity-ui/navigation';
import {CrownDiamond} from '@gravity-ui/icons';
import { mapUrlToPage } from '../lib/map-url-to-page';
import Icon from '../img/icon.svg';
import { PageEnum } from '../model/page-enum';

type Props = {
    user: UserFront;
    url: string | null;
}

export const AsideBar: FC<PropsWithChildren<Props>> = ({ user, url, children }) => {
    const page = mapUrlToPage(url);
    const [compact, setCompact] = useState(true);

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
        
        if (user.ownedClub) {
         basic.push({
                item: {
                    id: 'club',
                    icon: CrownDiamond,
                    title: `Мой клуб: ${user.ownedClub.name}`,
                    link: `/clubs/${user.ownedClub.id}`,
                },
            });
        }
        
        
        return basic;
    }, [user.ownedClub, page]);

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

        if (user.ownedClub) {
         basic.push({
                id: 'club',
                icon: CrownDiamond,
                title: `Мой клуб: ${user.ownedClub.name}`,
                link: `/clubs/${user.ownedClub.id}`,
            });
        }

        return basic;
    }, [user.ownedClub, page]);
    
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
