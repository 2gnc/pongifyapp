'use client'

import { type FC, useMemo } from 'react';
import { Text, Flex } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';

import { ClubFrontT, ClubMembersT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';
import { ClubUserLabel } from '@/widgets/userLabel';
import { EventTabEnum } from '@/widgets/eventsList';
import { ClubRole } from '@/generated/prisma';
import { PageLayout } from '@/shared/ui';
import { ClubDetailsSubheader } from './ClubDetailsSubheader';
import { Card } from '@/shared/ui';
import { JudgeRuling, JudgeRulingRequest, useJudge } from '@/features/judge';
import { useNavigate } from '@/features/navigation';

type PropsT = {
    club: ClubFrontT;
    currentUser: UserFrontT;
    owner: UserFrontT | null;
    members: ClubMembersT;
};

export const ClubDetails: FC<PropsT> = ({ club, owner, members }) => {
    const t = useTranslations('i18n.club');
    const { goToClubMembers, goToClubEvents, goToCreateEvent } = useNavigate();

    const canCreateEventRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_CREATE_EVENT, clubId: club.id }), [club.id]);
    const { permission: canCreateEvent } = useJudge(canCreateEventRequest);
    const canManageMembersRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_MANAGE_MEMBERS, clubId: club.id }), [club.id]);
    const { permission: canManageMembers } = useJudge(canManageMembersRequest);
    const canSeeFinancialInfoRequest = useMemo<JudgeRulingRequest>(() => ({ type: JudgeRuling.CAN_SEE_FINANCIAL_INFO, clubId: club.id }), [club.id]);
    const { permission: canSeeFinancialInfo } = useJudge(canSeeFinancialInfoRequest);

    if (!owner) return null;

    return (
        <PageLayout
            title={`${t('club')}: ${club.name}`}
            subtitle={<ClubDetailsSubheader owner={owner} isOpen={club.isOpen} description={club.description} />}
        >
            <div className="grid grid-cols-6 gap-4">
                <Card
                    title={`⭐️ ${t('admins')}`}
                    color='blue-med'
                    className='col-span-3'
                    onClick={() => goToClubMembers(club.id, 'admins')}
                >
                    <Flex>
                        {members.admins?.map(admin => <ClubUserLabel key={admin.id} user={admin} role={ClubRole.ADMIN} color='dark' clear />)}
                    </Flex>
                </Card>
                <Card
                    title={`🧙🏻 ${t('members')}`}
                    color='blue-light'
                    className='col-span-3'
                    onClick={() => goToClubMembers(club.id, 'members')}
                >
                    <Text variant='subheader-1'>{t('mages', { count: members.members.length })}</Text>
                </Card>
                <Card title={t('nextEvent')} color='blue-light' className='col-span-6'>
                    <Text>Какое то описание события и время</Text>
                </Card>
                <Card
                    title={t('pastEvents')}
                    color='blue-light'
                    className='col-span-3'
                    onClick={() => goToClubEvents(club.id, EventTabEnum.PAST)}
                >
                    8 событий сыграно
                </Card>
                <Card
                    title={t('nextEvents')}
                    color='blue-light'
                    className='col-span-3'
                    onClick={() => goToClubEvents(club.id, EventTabEnum.FUTURE)}
                >
                    100500 событий запланировано
                </Card>
                {canCreateEvent && (
                    <Card
                        title={t('createEvent')}
                        color='accent'
                        className='col-span-2'
                        onClick={() => goToCreateEvent(club.id)}
                    />
                )}
                {canManageMembers && (
                    <Card
                        title={t('invites')}
                        color='accent'
                        className='col-span-2'
                    />
                )}
                {canSeeFinancialInfo && (
                    <Card
                        title={t('fin')}
                        color='accent'
                        className='col-span-2'
                    />
                )}
            </div>
        </PageLayout>
    );
};
