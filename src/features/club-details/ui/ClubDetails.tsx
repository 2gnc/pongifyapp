'use client'

import { type FC, useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Text, Label, TabProvider, TabList, Tab, TabPanel, UserLabel, Flex } from '@gravity-ui/uikit';
import { CrownDiamond, Lock, Persons } from '@gravity-ui/icons';

import { ClubFrontT } from '@/entities/club';
import { timeAgo } from '@/shared/time';
import { UserFrontT } from '@/entities/user';
import { ClubUserLabel } from '@/entities/user/ui'

type PropsT = {
    club: ClubFrontT;
    currentUser: UserFrontT;
    owner: UserFrontT | null;
};

export const ClubDetails: FC<PropsT> = ({ club, currentUser, owner }) => {
    const t = useTranslations('i18n');
    const tabs = useMemo(() => ['first', 'second', 'third', 'fourth'], []);
    const [activeTab, setActiveTab] = useState(tabs[1]);

    const Icon = club.isOpen ? Persons : Lock;
    const iconColor = club.isOpen ? 'rgb(102, 153, 255)' : 'rgb(226, 158, 69)';

    const isUserowner = club.ownerId === currentUser.id;
    return (
        <>
            <Flex alignItems="center">
                <Text color="primary" variant="header-2">{club.name}</Text>
                <Icon width={18} height={18} color={iconColor} className='ml-2' />
            </Flex>
            <div className='pb-2' />
            {owner && <ClubUserLabel user={owner} type="owner" />}
            <Text className="block mt-2" color="secondary" variant="caption-2">{club.description}</Text>
            <TabProvider value={activeTab} onUpdate={setActiveTab}>
            <TabList className='mt-4'>
                <Tab value="first" disabled>События</Tab>
                <Tab value="second">Участники</Tab>
                <Tab value="third" disabled>Статистика</Tab>
                { isUserowner && <Tab value="fourth" disabled>Учет</Tab> }
            </TabList>
            <div>
                <TabPanel value="first">First Panel</TabPanel>
                <TabPanel value="second">Second Panel</TabPanel>
                <TabPanel value="third">Third Panel</TabPanel>
            </div>
        </TabProvider>
        </>
    );
};
