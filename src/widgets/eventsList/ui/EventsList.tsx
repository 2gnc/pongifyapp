'use client'

import { type FC, useMemo, useState } from 'react';
import { Text, SegmentedRadioGroup, Button, Flex } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';
import Link from 'next/link'

enum TabEnum {
    FUTURE = 'future',
    PAST = 'past',
}

type PropsT = {
    canCreateEventLoading: boolean;
    canCreateEvent: boolean;
    clubId: string;
};

export const EventsList:FC<PropsT> = ({ canCreateEventLoading, canCreateEvent, clubId }) => {
    const t = useTranslations('i18n');
    const [currentFilter, setCurrentFilter] = useState(TabEnum.FUTURE);
    
    const options = useMemo(() => [
        <SegmentedRadioGroup.Option key={TabEnum.FUTURE} value={TabEnum.FUTURE}>{t('eventsList.futureTab')}</SegmentedRadioGroup.Option>,
        <SegmentedRadioGroup.Option key={TabEnum.PAST} value={TabEnum.PAST}>{t('eventsList.pastTab')}</SegmentedRadioGroup.Option>,
    ], [t]);

    return (
        <Flex className='mt-2' gap={2} justifyContent='space-between' direction="column">
            <Flex justifyContent='space-between'>
                <Text color="primary" variant="subheader-3" >{t('eventsList.title')}</Text>
                <SegmentedRadioGroup
                    value={currentFilter}
                    onUpdate={setCurrentFilter}
                    name="filter"
                    defaultValue={TabEnum.FUTURE}
                    size="s"
                >
                    {options}
                </SegmentedRadioGroup>
            </Flex>
            {(canCreateEvent && !canCreateEventLoading) && (
                <Flex className='mt-2 mb-2'>
                    <Link href={`/clubs/${clubId}/events/create`} className='w-full' prefetch>
                        <Button view="action" width="max">{t('eventsList.createEvent')}</Button>
                    </Link>
                </Flex>
            )}
        </Flex>
    );
};
