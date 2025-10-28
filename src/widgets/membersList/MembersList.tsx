'use client'

import { useMemo, useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text, SegmentedRadioGroup, List, Flex } from '@gravity-ui/uikit';
import { ClubMembersT } from '@/entities/club';
import { ClublistItem } from './MemberListItem';

type Props = {
    clubMembers: ClubMembersT;
    clubId: string;
}

enum TabEnum {
    ALL = 'all',
    ADMINS = 'admins',
    BANNED = 'banned',
}

export const MembersList: FC<Props> = ({ clubMembers, clubId }) => {
    const t = useTranslations('i18n');
    const [currentFilter, setCurrentFilter] = useState(TabEnum.ALL);

    const filteredMembers = useMemo(() => {
        switch (currentFilter) {
            case TabEnum.ALL:
                return clubMembers.admins.concat(clubMembers.members).concat(clubMembers.banned);
            case TabEnum.ADMINS:
                return clubMembers.admins;
            case TabEnum.BANNED:
                return clubMembers.banned
        }
    }, [clubMembers, currentFilter]);

    const options = useMemo(() => {
        return [
            <SegmentedRadioGroup.Option key="all" value={TabEnum.ALL}>{t('membersList.all')}</SegmentedRadioGroup.Option>,
            <SegmentedRadioGroup.Option key="admins" value={TabEnum.ADMINS}>{t('membersList.admins')}</SegmentedRadioGroup.Option>,
            <SegmentedRadioGroup.Option key="banned" value={TabEnum.BANNED}>{t('membersList.banned')}</SegmentedRadioGroup.Option>,
        ]
    }, []);

    return (
        <>
            <Flex className='mt-2' gap={2} justifyContent='space-between'>
                <Text color="primary" variant="subheader-3" >{t('membersList.title')}</Text>
                <SegmentedRadioGroup
                    value={currentFilter}
                    onUpdate={setCurrentFilter}
                    name="filter"
                    defaultValue={TabEnum.ALL}
                    size="s"
                >
                    {options}
                </SegmentedRadioGroup>
            </Flex>
            <List
                className='mt-2 h-100'
                items={filteredMembers}
                renderItem={(item) => <ClublistItem clubId={clubId} member={item} />}
                itemsHeight={300}
                filterItem={(filter) => (item) => Boolean(item.userName?.includes(filter) || item.firstName?.includes(filter))}
            />
        </>
    );
}
