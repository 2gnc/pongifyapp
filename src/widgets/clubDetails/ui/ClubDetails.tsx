'use client'

import { type FC, useMemo, useState } from 'react';
import { Text, TabProvider, TabList, Tab, TabPanel, Flex } from '@gravity-ui/uikit';
import { Lock, Persons, Calendar, ChartLine, ChartLineLabel, PersonPlus } from '@gravity-ui/icons';

import { ClubFrontT, ClubMembersT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';
import { ClubUserLabel } from '@/widgets/userLabel';
import { MembersList } from '@/widgets/membersList';
import { ClubRole } from '@/generated/prisma';

type PropsT = {
    club: ClubFrontT;
    currentUser: UserFrontT;
    owner: UserFrontT | null;
    members: ClubMembersT;
};

export const ClubDetails: FC<PropsT> = ({ club, currentUser, owner, members }) => {
    const tabs = useMemo(() => ['first', 'second', 'third', 'fourth', 'fifth'], []);
    const [activeTab, setActiveTab] = useState(tabs[1]);

    const Icon = club.isOpen ? Persons : Lock;
    const iconColor = club.isOpen ? 'rgb(102, 153, 255)' : 'rgb(226, 158, 69)';

    const isUserOwner = club.ownerId === currentUser.id;

    return (
        <>
            <Flex alignItems="center">
                <Text color="primary" variant="header-2">{club.name}</Text>
                <Icon width={18} height={18} color={iconColor} className='ml-2' />
            </Flex>
            <div className='pb-2' />
            <Flex gap={2}>
                {owner && <ClubUserLabel user={owner} role={ClubRole.OWNER} />}
                {members.admins.map((admin) => <ClubUserLabel key={admin.id} user={admin} role={ClubRole.ADMIN}  />)}
            </Flex>
            <Text className="block mt-2" color="secondary" variant="caption-2">{club.description}</Text>
            <TabProvider value={activeTab} onUpdate={setActiveTab}>
                <TabList className='mt-2'>
                    <Tab value="first" disabled><Calendar /></Tab>
                    <Tab value="second"><Persons /></Tab>
                    <Tab value="third" disabled><ChartLine /></Tab>
                    { isUserOwner && <Tab value="fourth" disabled><ChartLineLabel /></Tab> }
                    { isUserOwner && <Tab value="fifth"><PersonPlus /></Tab> }
                </TabList>
                <div>
                    <TabPanel value="first">События</TabPanel>
                    <TabPanel value="second">
                        <MembersList clubMembers={members} clubId={club.id} />
                    </TabPanel>
                    <TabPanel value="third">Статистика</TabPanel>
                    <TabPanel value="fourth">Учет</TabPanel>
                    <TabPanel value="fifth">Инвайты</TabPanel>
                </div>
        </TabProvider>
        </>
    );
};
