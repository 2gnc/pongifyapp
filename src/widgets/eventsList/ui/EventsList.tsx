'use client'

import { type FC, useMemo, useState } from 'react';
import { Text, SegmentedRadioGroup, Button, Flex } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export enum EventTabEnum {
    FUTURE = 'future',
    PAST = 'past',
}

type PropsT = {
    canCreateEvent: boolean;
    tab: EventTabEnum;
};

export const EventsList:FC<PropsT> = ({ canCreateEvent, tab }) => {
    const t = useTranslations('i18n');
    const [currentFilter, setCurrentFilter] = useState(tab);
    const { id: clubId } = useParams();
    
    const options = useMemo(() => [
        <SegmentedRadioGroup.Option key={EventTabEnum.FUTURE} value={EventTabEnum.FUTURE}>{t('eventsList.futureTab')}</SegmentedRadioGroup.Option>,
        <SegmentedRadioGroup.Option key={EventTabEnum.PAST} value={EventTabEnum.PAST}>{t('eventsList.pastTab')}</SegmentedRadioGroup.Option>,
    ], [t]);

    return (
        <Flex className='mt-2' gap={2} justifyContent='space-between' direction="column">
            <Flex justifyContent='space-between'>
                <Text color="primary" variant="subheader-3" >{t('eventsList.title')}</Text>
                <SegmentedRadioGroup
                    value={currentFilter}
                    onUpdate={setCurrentFilter}
                    name="filter"
                    defaultValue={EventTabEnum.FUTURE}
                    size="s"
                >
                    {options}
                </SegmentedRadioGroup>
            </Flex>
            {canCreateEvent && (
                <Flex className='mt-2 mb-2'>
                    <Link href={`/clubs/${clubId}/events/create`} className='w-full' prefetch>
                        <Button view="action" width="max">{t('eventsList.createEvent')}</Button>
                    </Link>
                </Flex>
            )}
        </Flex>
    );
};
