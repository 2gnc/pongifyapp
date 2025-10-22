'use client';

import { UserFront } from '@/entities/user';
import { useEffect, useState, type FC } from 'react';
import {ListUl} from '@gravity-ui/icons';
import {AsideHeader} from '@gravity-ui/navigation';
import { mapUrlToPage } from '../lib/map-url-to-page';
import Icon from '../img/i.svg';

type Props = {
    user: UserFront;
    url: string | null;
}

export const AsideBar: FC<Props> = ({ user, url }) => {
    const page = mapUrlToPage(url);
    const [compact, setCompact] = useState(true);
    console.log(url, page, Icon);
    return (
        <>
            <AsideHeader
                compact={compact}
                onChangeCompact={setCompact}
                logo={{
                    icon: Icon,
                    iconSize: 30,
                    text: 'Pongify community',
                    href: '#',
                }}
                // headerDecoration
                subheaderItems={[
                    {
                        item: {
                            id: 'clubs',
                            icon: ListUl,
                            title: 'Clubs',
                            link: '/clubs',
                        },
                    }
                ]}
            />
            {/* <h1>aside</h1>
            <p>{JSON.stringify(user)}</p>
            <p>{page}</p> */}
        </>
    )
}
