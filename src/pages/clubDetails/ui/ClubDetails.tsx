'use client'

import { type FC, useMemo, useState } from 'react';
import { Text, TabProvider, TabList, Tab, TabPanel, Flex } from '@gravity-ui/uikit';
import { Lock, Persons, Calendar, ChartLine, ChartLineLabel, PersonPlus } from '@gravity-ui/icons';

import { ClubFrontT, ClubMembersT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';
import { ClubUserLabel } from '@/widgets/userLabel';
import { MembersList } from '@/widgets/membersList';
import { EventsList } from '@/widgets/eventsList';
import { ClubRole } from '@/generated/prisma';
import { useJudge } from '@/features/judge';
import { JudgeRuling, JudgeRulingRequest } from '@/features/judge/model/rulings';

type PropsT = {
    club: ClubFrontT;
    currentUser: UserFrontT;
    owner: UserFrontT | null;
    members: ClubMembersT;
};

export const ClubDetails: FC<PropsT> = ({ club, currentUser, owner, members }) => {
    const tabs = useMemo(() => ['first', 'second', 'third', 'fourth', 'fifth'], []);
    const canCreateEventRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_CREATE_EVENT, clubId: club.id }), [club.id]);
    const canSeeFinancialInfoRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_SEE_FINANCIAL_INFO, clubId: club.id }), [club.id]);
    const canManageMembersRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_MANAGE_MEMBERS, clubId: club.id }), [club.id]);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    const { loading: canCreateEventLoading, permission: canCreateEvent } = useJudge(canCreateEventRequest);
    const { loading: canSeeFinancialInfoLoading, permission: canSeeFinancialInfo } = useJudge(canSeeFinancialInfoRequest);
    const { loading: canManageMembersLoading, permission: canManageMembers } = useJudge(canManageMembersRequest);

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
                    <Tab value="first"><Calendar width={24} height={24} /></Tab>
                    <Tab value="second"><Persons width={24} height={24} /></Tab>
                    <Tab value="third" disabled><ChartLine width={24} height={24} /></Tab>
                    { canSeeFinancialInfo && <Tab value="fourth" disabled><ChartLineLabel width={24} height={24} /></Tab> }
                    { canManageMembers && <Tab value="fifth"><PersonPlus width={24} height={24} /></Tab> }
                </TabList>
                <div>
                    <TabPanel value="first">
                        <EventsList
                            canCreateEventLoading={canCreateEventLoading}
                            canCreateEvent={canCreateEvent}

                            clubId={club.id}
                        />
                    </TabPanel>
                    <TabPanel value="second">
                        <MembersList clubMembers={members} clubId={club.id} />
                    </TabPanel>
                    <TabPanel value="third">Статистика</TabPanel>
                    { canSeeFinancialInfo && <TabPanel value="fourth">Учет</TabPanel> }
                    { canManageMembers && <TabPanel value="fifth">Инвайты</TabPanel> }
                </div>
        </TabProvider>
        </>
    );
};
