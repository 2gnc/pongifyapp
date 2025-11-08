'use client'

import { type FC } from 'react';
import { PageLayout } from '@/shared/ui';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { EventTabEnum, EventsList} from '@/widgets/eventsList';
import { useNavigate } from '@/features/navigation';

type Props = {
    tab?: EventTabEnum;
    canCreateEvent: boolean;
};

export const ClubEventsPage: FC<Props> = ({ tab = EventTabEnum.FUTURE, canCreateEvent }) => {
    const t = useTranslations('i18n.membersList');
    const { id } = useParams();
    const { goBack } = useNavigate();

    if (typeof id !== 'string') return null;

    return (
        <PageLayout title={`${t('title')}`} onBack={goBack}>
            <EventsList tab={tab} canCreateEvent={canCreateEvent} />
        </PageLayout>
    );
};