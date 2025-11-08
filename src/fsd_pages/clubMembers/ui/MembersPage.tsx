'use client'

import { type FC } from 'react';
import { PageLayout } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { ClubMembersT } from '@/entities/club';
import { MembersList } from '@/widgets/membersList';
import { useParams } from 'next/navigation';
import { useNavigate } from '@/features/navigation';

type Props = {
    tab?: 'admins' | 'members' | 'bans';
    members: ClubMembersT;
};

export const MembersPage: FC<Props> = ({ tab, members }) => {
    const t = useTranslations('i18n.membersList');
    const { id } = useParams();

    if (typeof id !== 'string') return null;

    const { goBack } = useNavigate();

    return (
        <PageLayout title={`${t('title')}`} onBack={goBack}>
            <MembersList clubMembers={members} clubId={id} tab={tab || 'all'} />
        </PageLayout>
    );
};