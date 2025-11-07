'use client'

import { type FC, useMemo, useState } from 'react';
import { Text, TabProvider, TabList, Tab, TabPanel, Flex } from '@gravity-ui/uikit';
import { Lock, Persons, Calendar, ChartLine, ChartLineLabel, PersonPlus } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { ClubFrontT, ClubMembersT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';
import { ClubUserLabel } from '@/widgets/userLabel';
import { MembersList } from '@/widgets/membersList';
import { EventsList } from '@/widgets/eventsList';
import { ClubRole } from '@/generated/prisma';
import { useJudge } from '@/features/judge';
import { JudgeRuling, JudgeRulingRequest } from '@/features/judge/model/rulings';
import { PageLayout } from '@/shared/ui';
import { ClubDetailsSubheader } from './ClubDetailsSubheader';
import { Card } from '@/shared/ui';

type PropsT = {
    club: ClubFrontT;
    currentUser: UserFrontT;
    owner: UserFrontT | null;
    members: ClubMembersT;
};

export const ClubDetails: FC<PropsT> = ({ club, currentUser, owner, members }) => {
    const tabs = useMemo(() => ['first', 'second', 'third', 'fourth', 'fifth'], []);
    const t = useTranslations('i18n.club');

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

    if (!owner) return null;

    return (
        <PageLayout
            title={`${t('club')}: ${club.name}`}
            subtitle={<ClubDetailsSubheader owner={owner} isOpen={club.isOpen} description={club.description} />}
        >
            <div className="grid grid-cols-4 gap-4">
                <Card title={`⭐️ ${t('admins')}`} color='blue-med' className='col-span-2'>
                    <Flex>
                        {members.admins?.map(admin => <ClubUserLabel key={admin.id} user={admin} role={ClubRole.ADMIN} color='dark' clear />)}
                    </Flex>
                </Card>
                <Card title='🧙🏻 Игроки' color='blue-light' className='col-span-2'>
                    <Text variant='subheader-1'>{t('mages', {count: members.members.length })}</Text>
                </Card>
                <Card title={t('nextEvent')} color='blue-light' className='col-span-4'>
                    <Text>Какое то описание события и время</Text>
                </Card>
                <Card title={t('pastEvents')} color='blue-light' className='col-span-2'>
                    8 событий сыграно
                </Card>
                <Card title={t('nextEvents')} color='blue-light' className='col-span-2'>
                    100500 событий запланировано
                </Card>
            </div>
            {/* <TabProvider value={activeTab} onUpdate={setActiveTab}>
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
            </TabProvider> */}
        </PageLayout>
    );
};
