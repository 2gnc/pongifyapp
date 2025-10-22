'use client';

import { UserFront } from '@/entities/user';
import { useEffect, useState, type FC } from 'react';
import {ListUl} from '@gravity-ui/icons';
import {AsideHeader} from '@gravity-ui/navigation';
import { mapUrlToPage } from '../lib/map-url-to-page';
import Icon from '../img/icon.svg';

type Props = {
    user: UserFront;
    url: string | null;
}

export const AsideBar: FC<Props> = ({ user, url }) => {
    const page = mapUrlToPage(url);
    const [compact, setCompact] = useState(true);
    console.log(url, page, Icon);
    
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
            subheaderItems={[
                {
                    item: {
                        id: 'clubs',
                        icon: ListUl,
                        title: 'Все клубы',
                        link: '/clubs',
                    },
                }
            ]}
        />
    )
}
